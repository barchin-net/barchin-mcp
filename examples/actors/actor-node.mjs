// Node.js with global fetch. Estimate unless BARCHIN_RUN=1 is set.
import { readFile } from 'node:fs/promises';
import { setTimeout as wait } from 'node:timers/promises';

const base = (process.env.BARCHIN_API_BASE ?? 'https://barchin.net/api').replace(/\/$/, '');
const key = process.env.BARCHIN_API_KEY;
const [slug, inputFile] = process.argv.slice(2);
const actor = '/v1/actors/' + slug;

async function request(method, path, input) {
  const headers = { Authorization: 'Bearer ' + key, Accept: 'application/json' };
  if (input !== undefined) headers['Content-Type'] = 'application/json';
  let reply;
  try {
    reply = await fetch(base + path, {
      method, headers, body: input === undefined ? undefined : JSON.stringify(input),
      redirect: 'manual', signal: AbortSignal.timeout(10_000),
    });
  } catch {
    throw new Error('Connection failed or timed out. Review before resubmitting.');
  }
  const retry = reply.headers.get('retry-after') ?? '';
  const delay = /^\d+$/.test(retry) ? Math.max(2, Math.min(30, Number(retry))) : 3;
  if (!reply.ok) {
    await reply.body?.cancel();
    return { status: reply.status, delay };
  }
  const data = await reply.json().catch(() => {
    throw new Error('Invalid or incomplete JSON response. Review before resubmitting.');
  });
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('Expected a JSON object. Review before resubmitting.');
  }
  return { status: reply.status, data, delay };
}

function requireStatus({ status }, expected) {
  if (status !== expected) {
    throw new Error('HTTP ' + status + '. Review before resubmitting.');
  }
}

async function main() {
  let runId = process.env.BARCHIN_RUN_ID;
  if (!slug || (!runId && !inputFile)) {
    throw new Error('Use: node actor-node.mjs SLUG INPUT_FILE (or set BARCHIN_RUN_ID).');
  }
  if (slug !== slug.trim() || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error('Invalid Actor slug.');
  if (!key) throw new Error('Set BARCHIN_API_KEY in your server environment.');
  let firstDelay = 0;
  if (!runId) {
    let input;
    try {
      input = JSON.parse(await readFile(inputFile, 'utf8'));
    } catch {
      throw new Error('Input must be a readable JSON file.');
    }
    if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Input must be a JSON object.');
    const quote = await request('POST', actor + '/estimate', input);
    requireStatus(quote, 200);
    if (typeof quote.data.auto_hold !== 'number') throw new Error('Invalid estimate response.');
    console.error('Automatic reservation ceiling:', quote.data.auto_hold);
    if (process.env.BARCHIN_RUN !== '1') return;
    const submission = await request('POST', actor + '/runs?wait=0', input);
    requireStatus(submission, 202);
    runId = submission.data.run_id;
    firstDelay = submission.delay;
    if (submission.data.status_url !== actor + '/runs/' + runId) throw new Error('Unexpected status_url.');
  }
  if (typeof runId !== 'string' || runId.length !== 36 || !/^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i.test(runId)) {
    throw new Error('Invalid run ID.');
  }
  console.error('Run ID:', runId);
  await wait(firstDelay * 1000);
  const deadline = Date.now() + 90_000;
  while (Date.now() < deadline) {
    const result = await request('GET', actor + '/runs/' + runId);
    if (result.status === 429 || result.status >= 500) {
      await wait(result.delay * 1000);
      continue;
    }
    requireStatus(result, 200);
    const { status, dataset } = result.data;
    if (status === 'succeeded') {
      console.log(JSON.stringify(dataset ?? []));
      return;
    }
    if (status === 'failed') throw new Error('Actor failed. Check the run ID in the dashboard.');
    if (status !== 'queued' && status !== 'processing') throw new Error('Unexpected run status.');
    await wait(result.delay * 1000);
  }
  throw new Error('Still pending. Resume with BARCHIN_RUN_ID=' + runId);
}
await main().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
