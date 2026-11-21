"""Reject key-like material in the tracked Actor examples. Reports paths only."""
from pathlib import Path
import re
import subprocess
import sys

directory = Path(__file__).resolve().parent
root = subprocess.run(
    ["git", "rev-parse", "--show-toplevel"], cwd=directory, capture_output=True, text=True,
)
if root.returncode == 0:
    names = subprocess.check_output(["git", "ls-files", "-z", "--cached", "--others", "--exclude-standard", "."],
                                    cwd=directory).decode().split("\0")
    files = [directory / name for name in names if name]
else:
    files = [file for file in directory.iterdir() if file.is_file()]

credential = re.compile(r"\b(?:bk_live_|bko_|ghp_|github_pat_|sk-proj-)[A-Za-z0-9_-]{20,}\b|"
                        r"-----BEGIN [A-Z ]*PRIVATE KEY-----")
bad = []
for file in files:
    if file.is_symlink() or ((file.name == ".env" or file.name.startswith(".env.")) and file.name != ".env.example"):
        bad.append(file.name)
    elif file.is_file() and credential.search(file.read_text()):
        bad.append(file.name)
    elif file.name == ".env.example" and not all(line in ("BARCHIN_API_KEY=", "BARCHIN_RUN_ID=", "BARCHIN_RUN=0")
                                                  for line in file.read_text().splitlines()):
        bad.append(file.name)
if bad:
    sys.exit("Review these files for credential material: " + ", ".join(bad))
print("Actor example credential checks passed.")
