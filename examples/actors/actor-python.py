"""Estimate first. Set BARCHIN_RUN=1 to authorize one new execution."""
import json
import os
import re
import sys
import time
from pathlib import Path
from urllib.error import HTTPError
from urllib.request import HTTPRedirectHandler, Request, build_opener


class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        return None


base = os.environ.get("BARCHIN_API_BASE", "https://barchin.net/api").rstrip("/")
token = os.environ.get("BARCHIN_API_KEY")
if not token:
    sys.exit("Set BARCHIN_API_KEY in your server environment.")
slug, input_file = sys.argv[1:3]
if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", slug):
    sys.exit("Invalid Actor slug.")
path = f"/v1/actors/{slug}"
opener = build_opener(NoRedirect())


def request(method, target, payload=None):
    headers = {"Authorization": f"Bearer {token}", "Accept": "application/json"}
    body = None
    if payload is not None:
        headers["Content-Type"] = "application/json"
        body = json.dumps(payload).encode()
    try:
        response = opener.open(Request(base + target, body, headers, method=method), timeout=10)
    except HTTPError as exc:
        response = exc
    with response:
        wait = response.headers.get("Retry-After", "")
        delay = min(30, max(2, int(wait))) if wait.isdecimal() else 3
        try:
            data = json.load(response)
        except (ValueError, UnicodeError):
            data = {}
        return response.getcode(), data, delay


def require(status, data, expected):
    if status != expected:
        code = (data.get("error") or {}).get("code", "unknown")
        sys.exit(f"HTTP {status} ({code}). Do not automatically repeat a submission.")


run_id = os.environ.get("BARCHIN_RUN_ID")
first_delay = 0
if not run_id:
    payload = json.loads(Path(input_file).read_text(encoding="utf-8"))
    status, quote, _ = request("POST", path + "/estimate", payload)
    require(status, quote, 200)
    print("Automatic reservation ceiling:", quote["auto_hold"], file=sys.stderr)
    if os.environ.get("BARCHIN_RUN") != "1":
        sys.exit(0)
    status, run, first_delay = request("POST", path + "/runs?wait=0", payload)
    require(status, run, 202)
    run_id = run["run_id"]
    if run["status_url"] != f"{path}/runs/{run_id}":
        sys.exit("Unexpected status_url.")
if not re.fullmatch(r"[0-9a-fA-F-]{36}", run_id):
    sys.exit("Invalid run ID.")
print(f"Run ID: {run_id}", file=sys.stderr)
time.sleep(first_delay)
deadline = time.monotonic() + 90
while time.monotonic() < deadline:
    status, result, delay = request("GET", f"{path}/runs/{run_id}")
    if status == 429 or 500 <= status <= 599:
        time.sleep(delay)
        continue
    require(status, result, 200)
    if result["status"] == "succeeded":
        print(json.dumps(result.get("dataset") or [], ensure_ascii=False))
        break
    if result["status"] == "failed":
        sys.exit(f"Actor failed: {(result.get('error') or {}).get('code', 'unknown')}")
    if result["status"] not in ("queued", "processing"):
        sys.exit("Unexpected run status.")
    time.sleep(delay)
else:
    sys.exit(f"Still pending. Resume with BARCHIN_RUN_ID={run_id}.")
