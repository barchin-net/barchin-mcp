# فهرست کوتاه هتل‌های یک شهر

شهر را تعیین کنید، هتل‌ها را مرتب کنید و گزینه‌های مناسب را برای بعد نگه دارید.

## اجرای نمونه

Node.js 18 یا جدیدتر کافی است. مخزن را بگیرید و این دستورها را اجرا کنید.

```sh
git clone https://github.com/barchin-net/barchin-mcp.git
cd barchin-mcp/examples/developers/projects/city-hotel-shortlist
node ../../run.mjs --check
node ../../run.mjs
node ../../run.mjs --serve
```

[دموی محلی](http://127.0.0.1:4173) · [صفحهٔ عمومی](https://barchin.net/developers/projects/city-hotel-shortlist)

ورودی نسخه‌دار در `sample.v1.json` و خروجی پیش‌فرض کامل در `expected.v1.json` است. نرخ نمایش‌داده‌شده برای بازهٔ جست‌وجوی درج‌شده و یک اتاق است. در منبع زنده ممکن است فقط بازهٔ پیش‌فرض سایت در دسترس باشد.

## تنظیمات و دادهٔ زنده

هتل‌ها از اسنپ‌تریپ خوانده شده‌اند. «امشب» بازهٔ پیش‌فرض اعلام‌شدهٔ منبع است و تاریخ آن به وقت تهران نمایش داده می‌شود. 2026-11-24T23:00:08+00:00 زمان تهیهٔ بسته است. برای تغییر نمونه، ردیفی با همان کلیدها به فایل ورودی اضافه کنید. [`snapptrip-hotel-scraper`](https://barchin.net/actors/snapptrip-hotel-scraper) طرح‌وارهٔ جاری و فرم اجرای احرازهویت‌شده را دارند. اجرای زنده هزینه دارد. در توسعهٔ اتصال اختصاصی، ورودی را محدود کنید، برآورد هزینه را به کاربر نشان دهید و پیش از اجرا تأیید بگیرید. کلید را فقط در متغیر محیطی سرور `BARCHIN_API_KEY` تنظیم کنید. `.env.example` جای‌نگهدار است. نمونهٔ محلی فقط فایل نسخه‌دار را می‌خواند.

## پرامپت قابل کپی

Open barchin-net/barchin-mcp, directory examples/developers/projects/city-hotel-shortlist. Build and customize “فهرست کوتاه هتل‌های یک شهر” for Persian RTL users. In that directory run node ../../run.mjs --check, then node ../../run.mjs --serve and open the local address. Use sample.v1.json and expected.v1.json. Expected behavior: شهر را تعیین کنید، هتل‌ها را مرتب کنید و گزینه‌های مناسب را برای بعد نگه دارید. Interpretation rule: نرخ نمایش‌داده‌شده برای بازهٔ جست‌وجوی درج‌شده و یک اتاق است. در منبع زنده ممکن است فقط بازهٔ پیش‌فرض سایت در دسترس باشد. Add notes to the shortlist and attach the original rate window to each saved hotel. Add regression checks against expected.v1.json. Keep units, evidence and observation times visible. For optional live data use snapptrip-hotel-scraper. Follow the README and the linked Barchin input schema. Keep BARCHIN_API_KEY in a server-side environment variable. Show credit estimates and require explicit confirmation before any bounded paid run. Never put a key in browser code or commit .env.
