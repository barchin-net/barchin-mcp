<?php
// Run on the server with PHP CLI and the cURL extension.
declare(strict_types=1);

$base = rtrim(getenv('BARCHIN_API_BASE') ?: 'https://barchin.net/api', '/');
$key = getenv('BARCHIN_API_KEY');
$slug = $argv[1] ?? '';
$actor = '/v1/actors/' . $slug;

function fail(string $message): never {
    fwrite(STDERR, $message . PHP_EOL);
    exit(1);
}

function request(string $method, string $path, ?object $payload = null): array {
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
    $curlError = curl_errno($ch);
    unset($ch);
    if ($raw === false) fail('Connection failed or timed out (cURL ' . $curlError . '). Review before resubmitting.');
    $delay = ctype_digit($retryAfter) ? min(30, max(2, (int) $retryAfter)) : 3;
    if ($status < 200 || $status >= 300) return [$status, null, $delay];
    try {
        $data = json_decode($raw, flags: JSON_THROW_ON_ERROR);
    } catch (JsonException) {
        fail('Invalid JSON response. Review before resubmitting.');
    }
    if (!is_object($data)) fail('Expected a JSON object. Review before resubmitting.');
    return [$status, $data, $delay];
}

function requireStatus(int $status, int $expected): void {
    if ($status !== $expected) {
        fail('HTTP ' . $status . '. Review before resubmitting.');
    }
}

$runId = getenv('BARCHIN_RUN_ID');
if ($key === false || $key === '' || !preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/D', $slug)) {
    fail('Set BARCHIN_API_KEY and supply a valid Actor slug.');
}
$firstDelay = 0;
if ($runId === false || $runId === '') {
    if (!isset($argv[2])) fail('Usage: php actor-php.php SLUG INPUT_FILE (or set BARCHIN_RUN_ID).');
    $input = @file_get_contents($argv[2]);
    if ($input === false) fail('Could not read input.');
    try {
        $payload = json_decode($input, flags: JSON_THROW_ON_ERROR);
    } catch (JsonException) {
        fail('Input must be a readable JSON file.');
    }
    if (!is_object($payload)) fail('Input must be a JSON object.');
    [$status, $quote] = request('POST', $actor . '/estimate', $payload);
    requireStatus($status, 200);
    if (!is_int($quote->auto_hold ?? null) && !is_float($quote->auto_hold ?? null)) fail('Invalid estimate response.');
    fwrite(STDERR, 'Automatic reservation ceiling: ' . $quote->auto_hold . PHP_EOL);
    if (getenv('BARCHIN_RUN') !== '1') exit(0);
    [$status, $run, $firstDelay] = request('POST', $actor . '/runs?wait=0', $payload);
    requireStatus($status, 202);
    $runId = $run->run_id ?? null;
    if (!is_string($runId) || ($run->status_url ?? null) !== $actor . '/runs/' . $runId) fail('Unexpected status_url.');
}
if (!preg_match('/^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/iD', $runId)) fail('Invalid run ID.');
fwrite(STDERR, 'Run ID: ' . $runId . PHP_EOL);
sleep($firstDelay);
$deadline = microtime(true) + 90;
while (microtime(true) < $deadline) {
    [$status, $result, $delay] = request('GET', $actor . '/runs/' . $runId);
    if ($status === 429 || ($status >= 500 && $status <= 599)) {
        sleep($delay);
        continue;
    }
    requireStatus($status, 200);
    $runStatus = $result->status ?? null;
    if ($runStatus === 'succeeded') {
        echo json_encode($result->dataset ?? [], JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR), PHP_EOL;
        exit(0);
    }
    if ($runStatus === 'failed') fail('Actor failed. Check the run ID in the dashboard.');
    if (!in_array($runStatus, ['queued', 'processing'], true)) fail('Unexpected run status.');
    sleep($delay);
}
fail('Still pending. Resume with BARCHIN_RUN_ID=' . $runId);
