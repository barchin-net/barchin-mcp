# Barchin MCP — web access for AI agents on the Iranian web

Barchin gives AI agents a single MCP tool belt for reading the live web, built around an Iranian residential and datacenter proxy pool — IPs inside Iran that Iranian sites don't meet with the CAPTCHAs and blocks they throw at foreign ones — plus JavaScript rendering, anti-bot handling, and clean Markdown output, including Iranian sites that foreign scraping services cannot reach at all.

## Why Barchin for Iranian sites

- **An Iranian IP pool.** No foreign scraping API offers IPs inside Iran. Iranian sites are highly sensitive to foreign IPs — requests through non-Iranian proxies often trigger CAPTCHAs or get blocked outright, forcing retries that burn solver costs and credits. Iranian IPs mean fewer blocks, fewer retries, and a lower real cost per successful page.
- **Pay in Toman.** No USD card, no currency-exchange intermediary and its fees, no sanctions friction.
- **Priced at or below foreign alternatives.** Per-request pricing is equal to or lower than foreign scraping APIs — even before counting the extra fees Iranian users pay to make a dollar payment through an intermediary.

## Endpoint

```
https://barchin.net/mcp
```

MCP **Streamable HTTP** transport. Remote only — nothing to install.

Try it — anonymous discovery works with no key:

```bash
curl -s -X POST https://barchin.net/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}'
```

## Auth

- `tools/list` needs no key — you can discover the tool belt anonymously.
- Every tool **call** needs an `Authorization: Bearer bk_live_...` header.
- Get a key at **https://barchin.net/dashboard/api-keys**.
- Without a key, tool calls return an error — nothing runs, no credits are spent.

## Tools

| Tool | Description |
|---|---|
| `scrape_url(url, render_js=true, proxy=auto\|datacenter\|residential\|unblocker, country?, format=markdown\|text\|html, max_chars=40000, wait_for?)` | Fetches a URL and returns `{request_id, status, final_url, http_status, content, format, truncated, credits_used, credits_remaining}`. Waits up to 85 s, then returns `status: "processing"` if the page is still not ready. |
| `get_scrape(request_id, format, max_chars)` | Polls/retrieves the result of a previously started scrape. |
| `get_screenshot(url, full_page=false, format=png\|pdf)` | Captures a screenshot or PDF of a page. Long renders return `status: "processing"` with a `run_id` instead. |
| `list_actors()` | Lists all 82 active actors (site-specific scrapers) and each one's input schema. |
| `run_actor(slug, input)` | Runs any active actor by slug — the generic way to call all 82 actors, not just the curated ones below. |
| `get_actor_run(run_id)` | Polls/retrieves the result of a long actor run or screenshot that came back `status: "processing"` with a `run_id`. |
| `actor_<slug>(...)` | Direct tools for a curated set of popular Iranian-web actors, e.g. `actor_torob-product-sellers`. Every other actor is reached via `list_actors` + `run_actor`. |
| `get_balance()` | Returns remaining credits. |

## Connect

### Claude Code

```bash
claude mcp add --transport http barchin https://barchin.net/mcp --header "Authorization: Bearer bk_live_XXXX"
```

### Cursor

`.cursor/mcp.json`:

```json
{"mcpServers":{"barchin":{"url":"https://barchin.net/mcp","headers":{"Authorization":"Bearer bk_live_XXXX"}}}}
```

### OpenAI Responses API (Python)

```python
tools=[{"type":"mcp","server_label":"barchin","server_url":"https://barchin.net/mcp","headers":{"Authorization":"Bearer bk_live_XXXX"},"require_approval":"never"}]
```

### Claude Desktop

Claude Desktop does not speak Streamable HTTP natively yet — bridge it with `mcp-remote`:

```bash
npx mcp-remote https://barchin.net/mcp --header "Authorization: Bearer bk_live_XXXX"
```

## Credits

| Proxy type | Credits |
|---|---|
| Datacenter | 1 |
| Residential | 15 |
| Unblocker | 25 |
| + JS rendering | +5 |
| Actors | priced per actor |

Markdown and text output are free (no extra cost over the proxy/rendering cost above). Failed requests are refunded.

## Links

- https://barchin.net/ai-agents
- https://barchin.net/en/ai-agents
- https://barchin.net/docs
- https://barchin.net/openapi.json
- https://barchin.net/llms.txt
- https://barchin.net/pricing

## License

MIT

---

<div dir="rtl">

# برچین برای ایجنت‌های هوش مصنوعی

برچین یک مجموعه ابزار MCP یکپارچه برای خواندن وب زنده در اختیار ایجنت‌های هوش مصنوعی قرار می‌دهد، بر پایه‌ی استخر پراکسی رزیدنشیال و دیتاسنتر ایرانی — IPهایی داخل ایران که سایت‌های ایرانی آن‌ها را با کپچا یا مسدودسازی مثل IPهای خارجی رد نمی‌کنند — به‌علاوه‌ی رندر جاوااسکریپت، مقابله با anti-bot و خروجی Markdown تمیز؛ حتی برای سایت‌های ایرانی که سرویس‌های اسکرپینگ خارجی اصلاً به آن‌ها دسترسی ندارند.

## چرا برچین برای سایت‌های ایرانی

- **استخر IP ایرانی.** هیچ API اسکرپینگ خارجی‌ای IP داخل ایران ندارد. سایت‌های ایرانی نسبت به IP خارجی بسیار حساس‌اند — درخواست از پروکسی غیرایرانی غالباً با کپچا یا مسدودسازی مواجه می‌شود، یعنی تلاش دوباره، هزینه‌ی حل کپچا و کردیت هدررفته. IP ایرانی یعنی مسدودسازی کمتر، تلاش دوباره کمتر و هزینه‌ی واقعی هر صفحه‌ی موفق پایین‌تر.
- **پرداخت به تومان.** بدون کارت دلاری، بدون واسطه‌ی تبادل ارز و کارمزدش، بدون دردسر تحریم.
- **قیمتی برابر یا پایین‌تر از جایگزین‌های خارجی.** هزینه‌ی هر درخواست با API‌های اسکرپینگ خارجی برابر یا کمتر است، آن هم پیش از کارمزدهایی که کاربر ایرانی برای پرداخت دلاری از طریق واسطه می‌پردازد.

## آدرس سرویس (Endpoint)

```
https://barchin.net/mcp
```

ترنسپورت **MCP Streamable HTTP**. فقط به‌صورت ریموت — نیازی به نصب چیزی نیست.

امتحانش کنید — کشف ابزارها بدون کلید هم کار می‌کند: `curl -s -X POST https://barchin.net/mcp -H "Content-Type: application/json" -H "Accept: application/json, text/event-stream" -d '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}'`

## احراز هویت

- فراخوانی `tools/list` نیاز به کلید ندارد — می‌توانید بدون احراز هویت لیست ابزارها را ببینید.
- هر فراخوانی ابزار (tool call) نیاز به هدر `Authorization: Bearer bk_live_...` دارد.
- کلید را از این آدرس بگیرید: **https://barchin.net/dashboard/api-keys**.
- بدون کلید، فراخوانی ابزار خطا برمی‌گرداند — هیچ اجرایی انجام نمی‌شود و هیچ اعتباری مصرف نمی‌شود.

## ابزارها

| ابزار | توضیح |
|---|---|
| `scrape_url(url, render_js=true, proxy=auto\|datacenter\|residential\|unblocker, country?, format=markdown\|text\|html, max_chars=40000, wait_for?)` | یک URL را واکشی می‌کند و خروجی `{request_id, status, final_url, http_status, content, format, truncated, credits_used, credits_remaining}` برمی‌گرداند. حداکثر ۸۵ ثانیه منتظر می‌ماند و در صورت آماده نبودن صفحه، `status: "processing"` برمی‌گرداند. |
| `get_scrape(request_id, format, max_chars)` | نتیجه یک درخواست اسکرپ قبلی را واکشی یا استعلام می‌کند. |
| `get_screenshot(url, full_page=false, format=png\|pdf)` | از صفحه، اسکرین‌شات یا PDF می‌گیرد. رندر طولانی به‌جای آن `status: "processing"` با یک `run_id` برمی‌گرداند. |
| `list_actors()` | فهرست همه‌ی ۸۲ اکتور فعال (اسکرپرهای مخصوص سایت) و شِمای ورودی هرکدام را برمی‌گرداند. |
| `run_actor(slug, input)` | هر اکتور فعال را با slug اجرا می‌کند؛ راه عمومی برای صدا کردن همه‌ی ۸۲ اکتور، نه‌فقط آن‌هایی که در جدول زیر ابزار مستقیم دارند. |
| `get_actor_run(run_id)` | نتیجه‌ی یک اجرای طولانی اکتور یا اسکرین‌شات را که با `status: "processing"` و یک `run_id` برگشته بود، واکشی یا استعلام می‌کند. |
| `actor_<slug>(...)` | ابزارهای مستقیم برای مجموعه‌ای منتخب از اکتورهای پرکاربرد وب ایران، مثلاً `actor_torob-product-sellers`. هر اکتور دیگری از طریق `list_actors` و `run_actor` در دسترس است. |
| `get_balance()` | اعتبار باقی‌مانده را برمی‌گرداند. |

## اتصال

### Claude Code

```bash
claude mcp add --transport http barchin https://barchin.net/mcp --header "Authorization: Bearer bk_live_XXXX"
```

### Cursor

فایل `.cursor/mcp.json`:

```json
{"mcpServers":{"barchin":{"url":"https://barchin.net/mcp","headers":{"Authorization":"Bearer bk_live_XXXX"}}}}
```

### OpenAI Responses API (پایتون)

```python
tools=[{"type":"mcp","server_label":"barchin","server_url":"https://barchin.net/mcp","headers":{"Authorization":"Bearer bk_live_XXXX"},"require_approval":"never"}]
```

### Claude Desktop

Claude Desktop هنوز به‌صورت مستقیم از Streamable HTTP پشتیبانی نمی‌کند — با `mcp-remote` آن را پل بزنید:

```bash
npx mcp-remote https://barchin.net/mcp --header "Authorization: Bearer bk_live_XXXX"
```

## اعتبارها (Credits)

| نوع پراکسی | اعتبار |
|---|---|
| دیتاسنتر | ۱ |
| رزیدنشیال | ۱۵ |
| آنبلاکر | ۲۵ |
| + رندر جاوااسکریپت | +۵ |
| اکتورها | قیمت‌گذاری به ازای هر اکتور |

خروجی Markdown و متنی رایگان است (بدون هزینه اضافه نسبت به هزینه پراکسی/رندر بالا). درخواست‌های ناموفق اعتبار برگشتی دارند.

## لینک‌ها

- https://barchin.net/ai-agents
- https://barchin.net/en/ai-agents
- https://barchin.net/docs
- https://barchin.net/openapi.json
- https://barchin.net/llms.txt
- https://barchin.net/pricing

## مجوز

MIT

</div>
