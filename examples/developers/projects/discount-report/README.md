# گزارش تخفیف لینک‌های محصول

لینک‌های کالا را انتخاب کنید و تخفیف قابل محاسبه را مرتب ببینید.

## اجرای نمونه

Node.js 18 یا جدیدتر کافی است. مخزن را بگیرید و این دستورها را اجرا کنید.

```sh
git clone https://github.com/barchin-net/barchin-mcp.git
cd barchin-mcp/examples/developers/projects/discount-report
node ../../run.mjs --check
node ../../run.mjs
node ../../run.mjs --serve
```

[دموی محلی](http://127.0.0.1:4173) · [صفحهٔ عمومی](https://barchin.net/developers/projects/discount-report)

ورودی نسخه‌دار در `sample.v1.json` و خروجی پیش‌فرض کامل در `expected.v1.json` است. درصد برابر است با صد ضربدر اختلاف دو قیمت تقسیم بر قیمت اصلی. نبود یکی از دو مقدار، تخفیف نامشخص می‌دهد.

## تنظیمات و دادهٔ زنده

قیمت مرجع و قیمت فروش از یک گونهٔ کالا در پاسخ عمومی دیجی‌کالا استخراج و از ریال به تومان تبدیل شدند. درصد نسبت به قیمت مرجع اعلامی فروشگاه محاسبه می‌شود. 2026-11-24T22:02:07+00:00 زمان تهیهٔ بسته است. برای تغییر نمونه، ردیفی با همان کلیدها به فایل ورودی اضافه کنید. [`price-check`](https://barchin.net/agents/price-check) طرح‌وارهٔ جاری و فرم اجرای احرازهویت‌شده را دارند. اجرای زنده هزینه دارد. در توسعهٔ اتصال اختصاصی، ورودی را محدود کنید، برآورد هزینه را به کاربر نشان دهید و پیش از اجرا تأیید بگیرید. کلید را فقط در متغیر محیطی سرور `BARCHIN_API_KEY` تنظیم کنید. `.env.example` جای‌نگهدار است. نمونهٔ محلی فقط فایل نسخه‌دار را می‌خواند.

## پرامپت قابل کپی

Open barchin-net/barchin-mcp, directory examples/developers/projects/discount-report. Build and customize “گزارش تخفیف لینک‌های محصول” for Persian RTL users. In that directory run node ../../run.mjs --check, then node ../../run.mjs --serve and open the local address. Use sample.v1.json and expected.v1.json. Expected behavior: لینک‌های کالا را انتخاب کنید و تخفیف قابل محاسبه را مرتب ببینید. Interpretation rule: درصد برابر است با صد ضربدر اختلاف دو قیمت تقسیم بر قیمت اصلی. نبود یکی از دو مقدار، تخفیف نامشخص می‌دهد. Add a minimum discount filter and keep unknown original prices outside the ranking. Add regression checks against expected.v1.json. Keep units, evidence and observation times visible. For optional live data use price-check. Follow the README and the linked Barchin input schema. Keep BARCHIN_API_KEY in a server-side environment variable. Show credit estimates and require explicit confirmation before any bounded paid run. Never put a key in browser code or commit .env.
