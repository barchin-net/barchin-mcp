# Barchin MCP — web access for AI agents on the Iranian web

Barchin gives AI agents a single MCP tool belt for reading the live web: JavaScript rendering, rotating Iranian residential and datacenter proxies, anti-bot handling, and clean Markdown output — including Iranian sites that foreign scraping services cannot reach at all.

> Status: the endpoint goes live with the next Barchin deploy (October 2026).

## Endpoint

```
https://barchin.net/mcp
```

MCP **Streamable HTTP** transport. Remote only — nothing to install.

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
| `get_screenshot(url, full_page=false, format=png\|pdf)` | Captures a screenshot or PDF of a page. |
| `list_actors()` | Lists available actors (site-specific scrapers). |
| `actor_<slug>(...)` | One tool per active actor, e.g. `actor_torob-product-sellers`. |
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

برچین یک مجموعه ابزار MCP یکپارچه برای خواندن وب زنده در اختیار ایجنت‌های هوش مصنوعی قرار می‌دهد: رندر جاوااسکریپت، پراکسی‌های رزیدنشیال و دیتاسنتر ایرانی چرخشی، مقابله با anti-bot، و خروجی Markdown تمیز؛ حتی برای سایت‌های ایرانی که سرویس‌های اسکرپینگ خارجی اصلاً به آن‌ها دسترسی ندارند.

> وضعیت: این endpoint با دیپلوی بعدی برچین (مهر ۱۴۰۵ / اکتبر ۲۰۲۶) فعال می‌شود.

## آدرس سرویس (Endpoint)

```
https://barchin.net/mcp
```

ترنسپورت **MCP Streamable HTTP**. فقط به‌صورت ریموت — نیازی به نصب چیزی نیست.

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
| `get_screenshot(url, full_page=false, format=png\|pdf)` | از صفحه، اسکرین‌شات یا PDF می‌گیرد. |
| `list_actors()` | فهرست اکتورهای فعال (اسکرپرهای مخصوص سایت) را برمی‌گرداند. |
| `actor_<slug>(...)` | به ازای هر اکتور فعال یک ابزار، مثلاً `actor_torob-product-sellers`. |
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
