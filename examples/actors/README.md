# Actor REST examples

These examples use Python 3.10+, Node.js 20+, or PHP CLI 8.1+ with cURL. They use the Barchin REST API directly. Create an API key in the [Barchin dashboard](https://barchin.net/dashboard/api-keys) and supply `BARCHIN_API_KEY` through your service's secret store or shell environment.

| Example | Actor | Input file |
|---|---|---|
| `python3 actor-python.py taaghche-scraper taaghche.json` | [Taaghche publisher catalogue](https://barchin.net/guides/taaghche-publisher-catalog) | `taaghche.json` |
| `node actor-node.mjs digikala-scraper digikala.json` | [Digikala product lookup](https://barchin.net/guides/digikala-price-tracking) | `digikala.json` |
| `php actor-php.php divar-scraper divar.json` | [Divar listing feed](https://barchin.net/guides/divar-listing-feed) | `divar.json` |

The examples first print `auto_hold`, the estimated automatic credit reservation. Review the estimate and set `BARCHIN_RUN=1` for one intentional submission that can consume credits. Store the returned run ID with your own job. To resume polling, set `BARCHIN_RUN_ID` to that ID and run the example with the same slug. The input file is optional when resuming. Polling retries HTTP 429 and 5xx with a bounded delay. Check dashboard history before retrying a submission whose outcome is ambiguous.

Use `node mcp-discover.mjs` for the [MCP handshake and tool discovery](https://barchin.net/guides/mcp-actor-workflow). This example lists tools and needs no key.

- [Actor estimates and the execution contract](https://barchin.net/docs#actor-estimate)
- [Public OpenAPI](https://barchin.net/openapi.json)
- [Actor catalogue](https://barchin.net/actors)

Run `python3 examples/actors/check-secrets.py` from the repository before opening a pull request. Run [GitHub secret scanning and push protection](https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning) through the repository's approved workflow if available.
