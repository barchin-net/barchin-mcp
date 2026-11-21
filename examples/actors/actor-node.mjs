// Node.js with global fetch. Estimate unless BARCHIN_RUN=1 is set.
import { readFile } from 'node:fs/promises';
import { setTimeout as wait } from 'node:timers/promises';

const base = (process.env.BARCHIN_API_BASE ?? 'https://barchin.net/api').replace(/\/$/, '');
const key = process.env.BARCHIN_API_KEY;
const [slug, inputFile] = process.argv.slice(2);
if (!key || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug ?? '')) {
  throw new Error('Set BARCHIN_API_KEY and supply a valid Actor slug and JSON input file.');
}
const actor = '/v1/actors/' + slug;

async function request(method, path, input) {
  const headers = { Authorization: 'Bearer ' + key, Accept: 'application/json' };
  if (input !== undefined) headers['Content-Type'] = 'application/json';
  const reply = await fetch(base + path, {
    method, headers, body: input === undefined ? undefined : JSON.stringify(input),
    redirect: 'error', signal: AbortSignal.timeout(10_000),
  });
  const retry = reply.headers.get('retry-after') ?? '';
  const delay = /^\d+$/.test(retry) ? Math.max(2, Math.min(30, Number(retry))) : 3;
  return { status: reply.status, data: await reply.json().catch(() => ({})), delay };
}

function requireStatus({ status, data }, expected) {
  if (status !== expected) {
    throw new Error('HTTP ' + status + ' (' + (data.error?.code ?? 'unknown') + '). Review before resubmitting.');
  }
}

async function main() {
  let runId = process.env.BARCHIN_RUN_ID;
  let firstDelay = 0;
  if (!runId) {
    const input = JSON.parse(await readFile(inputFile, 'utf8'));
    const quote = await request('POST', actor + '/estimate', input);
    requireStatus(quote, 200);
    console.error('Automatic reservation ceiling:', quote.data.auto_hold);
    if (process.env.BARCHIN_RUN !== '1') return;
    const submission = await request('POST', actor + '/runs?wait=0', input);
    requireStatus(submission, 202);
    runId = submission.data.run_id;
    firstDelay = submission.delay;
    if (submission.data.status_url !== actor + '/runs/' + runId) throw new Error('Unexpected status_url.');
  }
  if (!/^[a-f0-9-]{36}$/i.test(runId ?? '')) throw new Error('Invalid run ID.');
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
    const { status, error, dataset } = result.data;
    if (status === 'succeeded') {
      console.log(JSON.stringify(dataset ?? []));
      return;
    }
    if (status === 'failed') throw new Error('Actor failed: ' + (error?.code ?? 'unknown'));
    if (status !== 'queued' && status !== 'processing') throw new Error('Unexpected run status.');
    await wait(result.delay * 1000);
  }
  throw new Error('Still pending. Resume with BARCHIN_RUN_ID=' + runId);
}
await main();
