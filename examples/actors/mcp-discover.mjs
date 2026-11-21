// Discovery only. This script does not call an Actor tool.
const endpoint = process.env.BARCHIN_MCP_URL ?? 'https://barchin.net/mcp';
let protocol = '2025-03-26';

async function rpc(method, params, id) {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json, text/event-stream',
    'MCP-Protocol-Version': protocol,
  };
  const response = await fetch(endpoint, {
    method: 'POST', headers, redirect: 'error', signal: AbortSignal.timeout(10_000),
    body: JSON.stringify({ jsonrpc: '2.0', method, params, ...(id === undefined ? {} : { id }) }),
  });
  if (!response.ok) throw new Error('MCP HTTP ' + response.status);
  if (id === undefined) return;
  const mime = response.headers.get('content-type') ?? '';
  const payload = mime.includes('text/event-stream')
    ? (await response.text()).split(/\r?\n/).filter(line => line.startsWith('data:'))
        .map(line => JSON.parse(line.slice(5))).find(event => event.id === id)
    : await response.json();
  if (payload?.id !== id || payload.error) throw new Error('MCP discovery failed: ' + method);
  return payload.result;
}

const initialized = await rpc('initialize', {
  protocolVersion: protocol, capabilities: {}, clientInfo: { name: 'barchin-example', version: '1.0' },
}, 1);
protocol = initialized.protocolVersion;
await rpc('notifications/initialized', {}, undefined);
const list = await rpc('tools/list', {}, 2);
console.log(list.tools.map(tool => tool.name).join('\n'));
