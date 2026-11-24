# تغییر موجودی آگهی‌های نمایشگاه باما

نمایشگاه و دو تاریخ را انتخاب کنید تا آگهی‌های جدید، حذف‌شده و تغییر قیمت را ببینید.

## اجرای نمونه

Node.js 18 یا جدیدتر کافی است. مخزن را بگیرید و این دستورها را اجرا کنید.

```sh
git clone https://github.com/barchin-net/barchin-mcp.git
cd barchin-mcp/examples/developers/projects/bama-dealer-inventory
node ../../run.mjs --check
node ../../run.mjs
node ../../run.mjs --serve
```

[دموی محلی](http://127.0.0.1:4173) · [صفحهٔ عمومی](https://barchin.net/developers/projects/bama-dealer-inventory)

ورودی نسخه‌دار در `sample.v1.json` و خروجی پیش‌فرض کامل در `expected.v1.json` است. مقایسه برای یک نمایشگاه و بر اساس شناسهٔ آگهی است. حذف از نمونه، فروش خودرو را ثابت نمی‌کند.

## تنظیمات و دادهٔ زنده

دو برداشت مستقل از هفت آگهی اول نمایشگاه ۲۸۱۷ در باما. مقایسه بر اساس شناسهٔ ثابت آگهی است. 2026-11-24T22:02:07+00:00 زمان تهیهٔ بسته است. برای تغییر نمونه، ردیفی با همان کلیدها به فایل ورودی اضافه کنید. [`bama-dealer-ads`](https://barchin.net/actors/bama-dealer-ads) طرح‌وارهٔ جاری و فرم اجرای احرازهویت‌شده را دارند. اجرای زنده هزینه دارد. در توسعهٔ اتصال اختصاصی، ورودی را محدود کنید، برآورد هزینه را به کاربر نشان دهید و پیش از اجرا تأیید بگیرید. کلید را فقط در متغیر محیطی سرور `BARCHIN_API_KEY` تنظیم کنید. `.env.example` جای‌نگهدار است. نمونهٔ محلی فقط فایل نسخه‌دار را می‌خواند.

## پرامپت قابل کپی

Open barchin-net/barchin-mcp, directory examples/developers/projects/bama-dealer-inventory. Build and customize “تغییر موجودی آگهی‌های نمایشگاه باما” for Persian RTL users. In that directory run node ../../run.mjs --check, then node ../../run.mjs --serve and open the local address. Use sample.v1.json and expected.v1.json. Expected behavior: نمایشگاه و دو تاریخ را انتخاب کنید تا آگهی‌های جدید، حذف‌شده و تغییر قیمت را ببینید. Interpretation rule: مقایسه برای یک نمایشگاه و بر اساس شناسهٔ آگهی است. حذف از نمونه، فروش خودرو را ثابت نمی‌کند. Add a dealer-level change summary keyed by stable listing IDs. Add regression checks against expected.v1.json. Keep units, evidence and observation times visible. For optional live data use bama-dealer-ads. Follow the README and the linked Barchin input schema. Keep BARCHIN_API_KEY in a server-side environment variable. Show credit estimates and require explicit confirmation before any bounded paid run. Never put a key in browser code or commit .env.
