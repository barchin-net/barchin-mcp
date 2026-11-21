"""Estimate first. Set BARCHIN_RUN=1 to authorize one new execution."""
import argparse
import json
import os
import re
import sys
import time
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import HTTPRedirectHandler, Request, build_opener


class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        return None


parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("slug", help="Actor slug")
parser.add_argument("input_file", nargs="?", help="JSON object file (optional when resuming)")
args = parser.parse_args()
run_id = os.environ.get("BARCHIN_RUN_ID")
if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", args.slug):
    parser.error("Invalid Actor slug.")
if not run_id and not args.input_file:
    parser.error("Supply an input file or set BARCHIN_RUN_ID.")
base = os.environ.get("BARCHIN_API_BASE", "https://barchin.net/api").rstrip("/")
token = os.environ.get("BARCHIN_API_KEY")
if not token:
    sys.exit("Set BARCHIN_API_KEY in your server environment.")
path = f"/v1/actors/{args.slug}"
opener = build_opener(NoRedirect())


def request(method, target, payload=None):
    headers = {"Authorization": f"Bearer {token}", "Accept": "application/json"}
    body = None
    if payload is not None:
        headers["Content-Type"] = "application/json"
        body = json.dumps(payload).encode()
    try:
        try:
            response = opener.open(Request(base + target, body, headers, method=method), timeout=10)
        except HTTPError as exc:
            response = exc
        with response:
            wait = response.headers.get("Retry-After", "")
            delay = min(30, max(2, int(wait))) if re.fullmatch(r"[0-9]{1,3}", wait) else 3
            status = response.getcode()
            if not 200 <= status < 300:
                return status, {}, delay
            data = json.load(response)
    except (TimeoutError, URLError, OSError):
        sys.exit("Connection failed or timed out. Review before resubmitting.")
    except (ValueError, UnicodeError):
        sys.exit("Invalid JSON response. Review before resubmitting.")
    if not isinstance(data, dict):
        sys.exit("Expected a JSON object. Review before resubmitting.")
    return status, data, delay


def require(status, expected):
    if status != expected:
        sys.exit(f"HTTP {status}. Review before resubmitting.")


first_delay = 0
if not run_id:
    try:
        payload = json.loads(Path(args.input_file).read_text(encoding="utf-8"))
    except (OSError, ValueError, UnicodeError):
        sys.exit("Input must be a readable JSON file.")
    if not isinstance(payload, dict):
        sys.exit("Input must be a JSON object.")
    status, quote, _ = request("POST", path + "/estimate", payload)
    require(status, 200)
    if type(quote.get("auto_hold")) not in (int, float):
        sys.exit("Invalid estimate response.")
    print("Automatic reservation ceiling:", quote["auto_hold"], file=sys.stderr)
    if os.environ.get("BARCHIN_RUN") != "1":
        sys.exit(0)
    status, run, first_delay = request("POST", path + "/runs?wait=0", payload)
    require(status, 202)
    run_id = run.get("run_id")
    if run.get("status_url") != f"{path}/runs/{run_id}":
        sys.exit("Unexpected status_url.")
if not isinstance(run_id, str) or not re.fullmatch(r"[a-fA-F0-9]{8}(?:-[a-fA-F0-9]{4}){3}-[a-fA-F0-9]{12}", run_id):
    sys.exit("Invalid run ID.")
print(f"Run ID: {run_id}", file=sys.stderr)
time.sleep(first_delay)
deadline = time.monotonic() + 90
while time.monotonic() < deadline:
    status, result, delay = request("GET", f"{path}/runs/{run_id}")
    if status == 429 or 500 <= status <= 599:
        time.sleep(delay)
        continue
    require(status, 200)
    if result.get("status") == "succeeded":
        print(json.dumps(result.get("dataset") or [], ensure_ascii=False))
        break
    if result.get("status") == "failed":
        sys.exit("Actor failed. Check the run ID in the dashboard.")
    if result.get("status") not in ("queued", "processing"):
        sys.exit("Unexpected run status.")
    time.sleep(delay)
else:
    sys.exit(f"Still pending. Resume with BARCHIN_RUN_ID={run_id}.")
