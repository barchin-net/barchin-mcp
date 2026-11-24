# خبرنامهٔ روزانهٔ فارسی

موضوع و روز انتشار را انتخاب کنید، خلاصهٔ پوشش هر موضوع را بخوانید و به خبر اصلی بروید.

## اجرای نمونه

Node.js 18 یا جدیدتر کافی است. مخزن را بگیرید و این دستورها را اجرا کنید.

```sh
git clone https://github.com/barchin-net/barchin-mcp.git
cd barchin-mcp/examples/developers/projects/persian-news-digest
node ../../run.mjs --check
node ../../run.mjs
node ../../run.mjs --serve
```

[دموی محلی](http://127.0.0.1:4173) · [صفحهٔ عمومی](https://barchin.net/developers/projects/persian-news-digest)

ورودی نسخه‌دار در `sample.v1.json` و خروجی پیش‌فرض کامل در `expected.v1.json` است. گروه‌بندی تحریری بر پایهٔ موضوع است. هر جمله به یک خبر مشخص پیوند دارد. زمان هر خبر، زمان انتشار ناشر است.

## تنظیمات و دادهٔ زنده

گزیدهٔ ثبت‌شده از خوراک عمومی زومیت و دیجیاتو؛ تاریخ انتشار از RSS و خلاصه‌ها تألیف برچین‌اند. 2026-11-24T21:28+00:00 زمان تهیهٔ بسته است. برای تغییر نمونه، ردیفی با همان کلیدها به فایل ورودی اضافه کنید. [`persian-news-scraper`](https://barchin.net/actors/persian-news-scraper) طرح‌وارهٔ جاری و فرم اجرای احرازهویت‌شده را دارند. اجرای زنده هزینه دارد. در توسعهٔ اتصال اختصاصی، ورودی را محدود کنید، برآورد هزینه را به کاربر نشان دهید و پیش از اجرا تأیید بگیرید. کلید را فقط در متغیر محیطی سرور `BARCHIN_API_KEY` تنظیم کنید. `.env.example` جای‌نگهدار است. نمونهٔ محلی فقط فایل نسخه‌دار را می‌خواند.

## پرامپت قابل کپی

Open barchin-net/barchin-mcp, directory examples/developers/projects/persian-news-digest. Build and customize “خبرنامهٔ روزانهٔ فارسی” for Persian RTL users. In that directory run node ../../run.mjs --check, then node ../../run.mjs --serve and open the local address. Use sample.v1.json and expected.v1.json. Expected behavior: موضوع و روز انتشار را انتخاب کنید، خلاصهٔ پوشش هر موضوع را بخوانید و به خبر اصلی بروید. Interpretation rule: گروه‌بندی تحریری بر پایهٔ موضوع است. هر جمله به یک خبر مشخص پیوند دارد. زمان هر خبر، زمان انتشار ناشر است. Add a second publisher to a story group and export the digest with its original links. Add regression checks against expected.v1.json. Keep units, evidence and observation times visible. For optional live data use persian-news-scraper. Follow the README and the linked Barchin input schema. Keep BARCHIN_API_KEY in a server-side environment variable. Show credit estimates and require explicit confirmation before any bounded paid run. Never put a key in browser code or commit .env.
