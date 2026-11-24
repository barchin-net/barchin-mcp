# مقایسهٔ خودروی کارکرده در دیوار و باما

مدل، سال و کارکرد را محدود کنید و قیمت پیشنهادی دو منبع را کنار هم ببینید.

## اجرای نمونه

Node.js 18 یا جدیدتر کافی است. مخزن را بگیرید و این دستورها را اجرا کنید.

```sh
git clone https://github.com/barchin-net/barchin-mcp.git
cd barchin-mcp/examples/developers/projects/divar-bama-car-comparison
node ../../run.mjs --check
node ../../run.mjs
node ../../run.mjs --serve
```

[دموی محلی](http://127.0.0.1:4173) · [صفحهٔ عمومی](https://barchin.net/developers/projects/divar-bama-car-comparison)

ورودی نسخه‌دار در `sample.v1.json` و خروجی پیش‌فرض کامل در `expected.v1.json` است. مدل یکسان و محدودهٔ سال و کارکرد معیار قیاس‌اند. هر آگهی مستقل است و قیمت پیشنهادی با مبلغ معامله فرق دارد.

## تنظیمات و دادهٔ زنده

نمونهٔ آموزشی تألیفی برچین؛ نام‌ها، اعداد و زمان‌ها برای نمایش رفتار برنامه ساخته شده‌اند. 2026-11-24T21:28+00:00 زمان تهیهٔ بسته است. برای تغییر نمونه، ردیفی با همان کلیدها به فایل ورودی اضافه کنید. [`divar-scraper`](https://barchin.net/actors/divar-scraper) و [`bama-scraper`](https://barchin.net/actors/bama-scraper) طرح‌وارهٔ جاری و فرم اجرای احرازهویت‌شده را دارند. اجرای زنده هزینه دارد. در توسعهٔ اتصال اختصاصی، ورودی را محدود کنید، برآورد هزینه را به کاربر نشان دهید و پیش از اجرا تأیید بگیرید. کلید را فقط در متغیر محیطی سرور `BARCHIN_API_KEY` تنظیم کنید. `.env.example` جای‌نگهدار است. نمونهٔ محلی فقط فایل نسخه‌دار را می‌خواند.

## پرامپت قابل کپی

Open barchin-net/barchin-mcp, directory examples/developers/projects/divar-bama-car-comparison. Build and customize “مقایسهٔ خودروی کارکرده در دیوار و باما” for Persian RTL users. In that directory run node ../../run.mjs --check, then node ../../run.mjs --serve and open the local address. Use sample.v1.json and expected.v1.json. Expected behavior: مدل، سال و کارکرد را محدود کنید و قیمت پیشنهادی دو منبع را کنار هم ببینید. Interpretation rule: مدل یکسان و محدودهٔ سال و کارکرد معیار قیاس‌اند. هر آگهی مستقل است و قیمت پیشنهادی با مبلغ معامله فرق دارد. Add a trim filter and compare medians only within identical model and mileage bands. Add regression checks against expected.v1.json. Keep units, evidence and observation times visible. For optional live data use divar-scraper + bama-scraper. Follow the README and the linked Barchin input schema. Keep BARCHIN_API_KEY in a server-side environment variable. Show credit estimates and require explicit confirmation before any bounded paid run. Never put a key in browser code or commit .env.
