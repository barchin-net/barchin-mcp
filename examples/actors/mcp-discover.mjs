// Discovery only. This script lists tools without calling them.
const endpoint = process.env.BARCHIN_MCP_URL ?? 'https://barchin.net/mcp';
const supported = ['2025-03-26', '2025-06-18', '2025-11-25'];
const maxBytes = 1024 * 1024;
let protocol;
let session;

function parseMessage(text) {
  try {
    return JSON.parse(text);
  } catch {
    throw new Error('Invalid MCP JSON response.');
  }
}

async function readReply(response, mime, id) {
  const reader = response.body?.getReader();
  if (!reader) throw new Error('Missing MCP response body.');
  const decoder = new TextDecoder();
  let received = 0;
  let buffer = '';
  try {
    while (true) {
      const { value, done } = await reader.read();
      received += value?.byteLength ?? 0;
      if (received > maxBytes) throw new Error('MCP response exceeded 1 MiB.');
      buffer += done ? decoder.decode() : decoder.decode(value, { stream: true });
      if (mime === 'text/event-stream') {
        const delimiter = /(?:\r\n|\r(?!\n)|\n){2}/;
        let boundary;
        while ((boundary = delimiter.exec(buffer))) {
          const data = buffer.slice(0, boundary.index)
            .split(/\r\n|\r|\n/)
            .filter(line => line === 'data' || line.startsWith('data:'))
            .map(line => line.slice(5).replace(/^ /, ''))
            .join('\n');
          buffer = buffer.slice(boundary.index + boundary[0].length);
          if (data) {
            const message = parseMessage(data);
            if (message?.id === id && !message.method) return message;
          }
        }
      }
      if (done) return mime === 'application/json' ? parseMessage(buffer) : undefined;
    }
  } finally {
    void reader.cancel().catch(() => {});
  }
}

async function rpc(method, params, id) {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json, text/event-stream',
  };
  if (protocol) headers['MCP-Protocol-Version'] = protocol;
  if (session) headers['Mcp-Session-Id'] = session;
  const response = await fetch(endpoint, {
    method: 'POST', headers, redirect: 'error', signal: AbortSignal.timeout(10_000),
    body: JSON.stringify({ jsonrpc: '2.0', method, params, ...(id === undefined ? {} : { id }) }),
  });
  if (!response.ok) {
    await response.body?.cancel();
    throw new Error('MCP HTTP ' + response.status + ' during ' + method + '.');
  }
  if (id === undefined) {
    await response.body?.cancel();
    if (response.status !== 202) throw new Error('Expected HTTP 202 for the MCP notification.');
    return;
  }
  const mime = response.headers.get('content-type')?.split(';', 1)[0].trim().toLowerCase();
  if (mime !== 'text/event-stream' && mime !== 'application/json') {
    await response.body?.cancel();
    throw new Error('Unexpected MCP response content type.');
  }
  const payload = await readReply(response, mime, id);
  if (payload?.jsonrpc !== '2.0' || payload.id !== id || 'error' in payload || !payload.result) {
    throw new Error('MCP discovery failed during ' + method + '.');
  }
  if (method === 'initialize') session = response.headers.get('mcp-session-id');
  return payload.result;
}

async function main() {
  const initialized = await rpc('initialize', {
    protocolVersion: supported[0], capabilities: {}, clientInfo: { name: 'barchin-example', version: '1.0' },
  }, 1);
  if (!supported.includes(initialized.protocolVersion)) throw new Error('Unsupported MCP protocol version.');
  protocol = initialized.protocolVersion;
  await rpc('notifications/initialized', {}, undefined);
  const list = await rpc('tools/list', {}, 2);
  if (!Array.isArray(list.tools) || !list.tools.every(tool => typeof tool?.name === 'string')) {
    throw new Error('Invalid MCP tool list.');
  }
  console.log(list.tools.map(tool => tool.name).join('\n'));
}

await main().catch(error => {
  console.error(error.name === 'TimeoutError' || error.name === 'AbortError'
    ? 'MCP discovery timed out.' : error.message);
  process.exitCode = 1;
});
