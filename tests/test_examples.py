"""Exercise public examples against a loopback-only REST and MCP fixture."""
import argparse
import concurrent.futures
import json
import os
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import subprocess
import tempfile
import threading
import time

ROOT = Path(__file__).resolve().parents[1] / "examples" / "actors"
RUN = "00000000-0000-4000-8000-000000000042"
KEY = "fixture-only"
LEAK = "PRIVATE_FIXTURE_VALUE"
ACTOR = "/v1/actors/fixture-actor"
commands = {
    "python": ["python3", "-B", str(ROOT / "actor-python.py")],
    "node": ["node", str(ROOT / "actor-node.mjs")],
    "php": ["php", str(ROOT / "actor-php.php")],
    "mcp": ["node", str(ROOT / "mcp-discover.mjs")],
}


class Handler(BaseHTTPRequestHandler):
    def log_message(self, *_args):
        pass

    def respond(self, status, payload=None, mime="application/json", retry=False, linger=False):
        raw = payload if isinstance(payload, bytes) else json.dumps(payload).encode()
        self.send_response(status)
        self.send_header("Content-Type", mime)
        if not linger:
            self.send_header("Content-Length", str(len(raw)))
        if retry:
            self.send_header("Retry-After", "2")
        if getattr(self, "issue_session", False):
            self.send_header("Mcp-Session-Id", "test-session")
        self.end_headers()
        try:
            self.wfile.write(raw)
            self.wfile.flush()
            if linger:
                self.connection.settimeout(3)
                try:
                    self.connection.recv(1)
                except TimeoutError:
                    pass
        except (BrokenPipeError, ConnectionResetError):
            pass

    def do_GET(self):
        self.run_fixture(None)

    def do_POST(self):
        body = json.loads(self.rfile.read(int(self.headers["Content-Length"])))
        self.run_fixture(body)

    def run_fixture(self, body):
        mode, target = self.path[1:].split("/", 1)
        target = "/" + target
        history = self.server.calls.setdefault(mode, [])
        history.append((self.command, target))
        if target == "/mcp":
            self.mcp(mode, body)
            return
        assert self.headers["Authorization"] == "Bearer " + KEY
        if self.command == "POST":
            assert body == {"x": LEAK}
        if mode.endswith("timeout"):
            time.sleep(12)
            self.respond(200, {"auto_hold": 7})
        elif target == "/api" + ACTOR + "/estimate":
            if mode.endswith("estimate429"):
                self.respond(429, {"error": {"code": LEAK}}, retry=True)
            elif mode.endswith("estimate500"):
                self.respond(503, {"error": {"code": LEAK}})
            elif mode.endswith("malformed"):
                self.respond(200, ("<html>" + LEAK).encode())
            else:
                self.respond(200, {"auto_hold": 7})
        elif target == "/api" + ACTOR + "/runs?wait=0":
            if mode.endswith("submit500"):
                self.respond(503, {"error": {"code": LEAK}})
            else:
                self.respond(202, {"run_id": RUN, "status_url": f"{ACTOR}/runs/{RUN}"}, retry=True)
        elif target == "/api" + ACTOR + "/runs/" + RUN:
            reads = sum(method == "GET" for method, _ in history)
            if mode.endswith("failed"):
                self.respond(200, {"status": "failed", "error": {"code": LEAK}})
            elif mode.endswith("full") and reads <= 3:
                status = {1: 429, 2: 503, 3: 200}[reads]
                self.respond(status, {"status": "processing"}, retry=True)
            else:
                self.respond(200, {"status": "succeeded", "dataset": [{"value": 42}]})
        else:
            self.respond(404, {"error": {"code": LEAK}})

    def mcp(self, mode, body):
        assert self.headers.get("Authorization") is None
        assert self.headers["Accept"] == "application/json, text/event-stream"
        method = body["method"]
        if method == "initialize":
            assert body["params"]["protocolVersion"] == "2025-03-26"
            self.issue_session = mode == "mcp-sse"
            selected = "fixture-unsupported" if mode == "mcp-version" else "2025-06-18"
            result = {"protocolVersion": selected}
        else:
            assert self.headers["Mcp-Protocol-Version"] == "2025-06-18"
            assert self.headers.get("Mcp-Session-Id") == ("test-session" if mode == "mcp-sse" else None)
            if method == "notifications/initialized":
                assert "id" not in body
                self.respond(202, b"")
                return
            assert method == "tools/list"
            result = {"tools": [{"name": "fixture_tool"}]}
        message = {"jsonrpc": "2.0", "id": body["id"], "result": result}
        if mode == "mcp-error" and method == "tools/list":
            self.respond(200, {"jsonrpc": "2.0", "id": body["id"], "error": {"message": LEAK}})
        elif mode == "mcp-size":
            self.respond(200, b" " * (1024 * 1024 + 1))
        elif mode == "mcp-timeout":
            time.sleep(12)
            self.respond(200, message)
        elif mode == "mcp-sse":
            lines = json.dumps(message, indent=1).splitlines()
            events = [
                ": server comment\r\n\r\n",
                "id: priming\r\ndata:\r\n\r\n",
                'data: {"jsonrpc":"2.0","method":"notifications/message"}\r\n\r\n',
                'data: {"jsonrpc":"2.0","id":999,"result":{}}\r\n\r\n',
                "".join("data: " + line + "\r\n" for line in lines) + "\r\n",
            ]
            self.respond(200, "".join(events).encode(), mime="text/event-stream", linger=True)
        else:
            self.respond(200, message)


def execute(run):
    name, case, cli, expected, outcome, run_mode = run
    mode = case if name == "mcp" else f"{name}-{case}"
    env = {
        "PATH": os.environ["PATH"],
        "NO_PROXY": "*",
        "BARCHIN_API_KEY": KEY,
        "BARCHIN_API_BASE": f"{base}/{mode}/api",
        "BARCHIN_MCP_URL": f"{base}/{mode}/mcp",
        **run_mode,
    }
    started = time.monotonic()
    process = subprocess.run(commands[name] + cli, env=env, capture_output=True, text=True, timeout=16)
    took = time.monotonic() - started
    assert process.returncode == expected, (name, case, process.returncode, process.stderr[:100])
    assert outcome in (process.stdout + process.stderr), (name, case)
    assert KEY not in process.stdout + process.stderr and LEAK not in process.stdout + process.stderr, (name, case)
    history = server.calls.get(mode, [])
    posts = [target for method, target in history if method == "POST"]
    if name != "mcp":
        assert len([target for target in posts if "/runs?" in target]) == (1 if case in {"full", "submit500"} else 0)
        if case in {"invalid-input", "invalid-shape", "missing", "bad-slug", "invalid-run-id"}:
            assert not history, (name, case)
        if case == "full":
            assert len(history) == 6 and took >= 7.5, (name, case, took, len(history))
        if case in {"resume", "failed"}:
            assert history == [("GET", "/api" + ACTOR + "/runs/" + RUN)]
        if case in {"estimate", "estimate429", "estimate500", "malformed", "timeout"}:
            assert posts == ["/api" + ACTOR + "/estimate"]
    if case == "mcp-sse":
        assert took < 3, took
        assert len(history) == 3
    return {"runtime": name, "case": case, "requests": len(history), "seconds": round(took, 2)}


parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("--without-php", action="store_true", help="Run locally on hosts without PHP cURL")
options = parser.parse_args()

with tempfile.TemporaryDirectory(prefix="barchin-fixtures-") as temporary:
    valid = Path(temporary) / "valid.json"
    valid.write_text(json.dumps({"x": LEAK}))
    invalid = Path(temporary) / "bad.json"
    invalid.write_text('{"x":' + LEAK)
    shape = Path(temporary) / "list.json"
    shape.write_text("[]")
    server = ThreadingHTTPServer(("127.0.0.1", 0), Handler)
    server.calls = {}
    base = f"http://127.0.0.1:{server.server_port}"
    threading.Thread(target=server.serve_forever, daemon=True).start()
    runs = []
    languages = ("python", "node") if options.without_php else ("python", "node", "php")
    for language in languages:
        args = ["fixture-actor", str(valid)]
        error = 2 if language == "python" else 1
        missing_cli, usage = {
            "python": ([], "usage"),
            "node": ([], "Use:"),
            "php": (["fixture-actor"], "Usage:"),
        }[language]
        resume = {"BARCHIN_RUN_ID": RUN, "BARCHIN_RUN": "1"}
        submit = {"BARCHIN_RUN": "1"}
        runs.extend((language, *case) for case in (
            ("estimate", args, 0, "ceiling: 7", {}),
            ("full", args, 0, "42", submit),
            ("estimate429", args, 1, "HTTP 429", {}),
            ("estimate500", args, 1, "HTTP 503", {}),
            ("submit500", args, 1, "HTTP 503", submit),
            ("timeout", args, 1, "timed out", {}),
            ("invalid-input", ["fixture-actor", str(invalid)], 1, "JSON file", {}),
            ("invalid-shape", ["fixture-actor", str(shape)], 1, "JSON object", {}),
            ("missing", missing_cli, error, usage, {}),
            ("bad-slug", ["bad/slug", str(valid)], error, "slug", {}),
            ("invalid-run-id", ["fixture-actor"], 1, "Invalid run ID", {"BARCHIN_RUN_ID": "-" * 36}),
            ("resume", ["fixture-actor"], 0, "42", resume),
            ("failed", ["fixture-actor"], 1, "Actor failed", resume),
            ("malformed", args, 1, "JSON response", {}),
        ))
    runs.extend(("mcp", case, [], expected, message, {}) for case, expected, message in (
        ("mcp-json", 0, "fixture_tool"),
        ("mcp-sse", 0, "fixture_tool"),
        ("mcp-error", 1, "failed during tools/list"),
        ("mcp-size", 1, "exceeded 1 MiB"),
        ("mcp-timeout", 1, "timed out"),
        ("mcp-version", 1, "Unsupported MCP protocol version"),
    ))
    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
        report = list(pool.map(execute, runs))
    server.shutdown()
print(json.dumps({"cases_passed": len(report), "loopback_only": True, "results": report}, indent=2))
