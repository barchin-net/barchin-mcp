<?php
// Run on the server with PHP CLI and the cURL extension.
declare(strict_types=1);

$base = rtrim(getenv('BARCHIN_API_BASE') ?: 'https://barchin.net/api', '/');
$key = getenv('BARCHIN_API_KEY');
$slug = $argv[1] ?? '';
if ($key === false || $key === '' || !preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/D', $slug)) {
    throw new RuntimeException('Set BARCHIN_API_KEY and supply an Actor slug and input file.');
}
$actor = '/v1/actors/' . $slug;

function request(string $method, string $path, ?array $payload = null): array {
    global $base, $key;
    $retryAfter = '';
    $ch = curl_init($base . $path);
    $headers = ['Authorization: Bearer ' . $key, 'Accept: application/json'];
    if ($payload !== null) {
        $headers[] = 'Content-Type: application/json';
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload, JSON_THROW_ON_ERROR));
    }
    curl_setopt_array($ch, [
        CURLOPT_CUSTOMREQUEST => $method, CURLOPT_HTTPHEADER => $headers,
        CURLOPT_RETURNTRANSFER => true, CURLOPT_FOLLOWLOCATION => false,
        CURLOPT_CONNECTTIMEOUT => 5, CURLOPT_TIMEOUT => 10,
        CURLOPT_HEADERFUNCTION => function ($handle, string $header) use (&$retryAfter): int {
            if (stripos($header, 'Retry-After:') === 0) $retryAfter = trim(substr($header, 12));
            return strlen($header);
        },
    ]);
    $raw = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    curl_close($ch);
    if ($raw === false) throw new RuntimeException('Connection failed. Review before repeating a submission.');
    $delay = ctype_digit($retryAfter) ? min(30, max(2, (int) $retryAfter)) : 3;
    return [$status, json_decode($raw, true) ?? [], $delay];
}

function requireStatus(int $status, array $data, int $expected): void {
    if ($status !== $expected) {
        throw new RuntimeException('HTTP ' . $status . ' (' . ($data['error']['code'] ?? 'unknown') . '). Review before resubmitting.');
    }
}

$runId = getenv('BARCHIN_RUN_ID');
$firstDelay = 0;
if ($runId === false || $runId === '') {
    $input = file_get_contents($argv[2] ?? 'input.json');
    if ($input === false) throw new RuntimeException('Could not read input.');
    $payload = json_decode($input, true, flags: JSON_THROW_ON_ERROR);
    [$status, $quote] = request('POST', $actor . '/estimate', $payload);
    requireStatus($status, $quote, 200);
    fwrite(STDERR, 'Automatic reservation ceiling: ' . $quote['auto_hold'] . PHP_EOL);
    if (getenv('BARCHIN_RUN') !== '1') exit(0);
    [$status, $run, $firstDelay] = request('POST', $actor . '/runs?wait=0', $payload);
    requireStatus($status, $run, 202);
    $runId = $run['run_id'];
    if ($run['status_url'] !== $actor . '/runs/' . $runId) throw new RuntimeException('Unexpected status_url.');
}
if (!preg_match('/^[a-f0-9-]{36}$/iD', $runId)) throw new RuntimeException('Invalid run ID.');
fwrite(STDERR, 'Run ID: ' . $runId . PHP_EOL);
sleep($firstDelay);
$deadline = microtime(true) + 90;
while (microtime(true) < $deadline) {
    [$status, $result, $delay] = request('GET', $actor . '/runs/' . $runId);
    if ($status === 429 || $status >= 500) {
        sleep($delay);
        continue;
    }
    requireStatus($status, $result, 200);
    if ($result['status'] === 'succeeded') {
        echo json_encode($result['dataset'] ?? [], JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR), PHP_EOL;
        exit(0);
    }
    if ($result['status'] === 'failed') throw new RuntimeException('Actor failed: ' . ($result['error']['code'] ?? 'unknown'));
    if (!in_array($result['status'], ['queued', 'processing'], true)) throw new RuntimeException('Unexpected run status.');
    sleep($delay);
}
throw new RuntimeException('Still pending. Resume with BARCHIN_RUN_ID=' . $runId);
