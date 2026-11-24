# خبرنامهٔ روزانهٔ فارسی

تیترهای یک روز و موضوع را کنار هم ببینید و خبرهای مناسب شمارهٔ بعدی را از روی منبع انتخاب کنید.

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

ورودی نسخه‌دار در `sample.v1.json` و خروجی پیش‌فرض کامل در `expected.v1.json` است. در هر دسته تعداد تیترهای مستقل شمرده می‌شود. تاریخ، زمان انتشار ناشر است؛ جدول به خبر اصلی می‌رسد.

## تنظیمات و دادهٔ زنده

تیتر، دسته، پیوند و زمان انتشار از RSS عمومی زومیت و دیجیاتو آمده است. هر خبر با پیوند یکتا شمرده می‌شود. زمان برداشت خوراک جداست. 2026-11-24T23:00:08+00:00 زمان تهیهٔ بسته است. برای تغییر نمونه، ردیفی با همان کلیدها به فایل ورودی اضافه کنید. [`persian-news-scraper`](https://barchin.net/actors/persian-news-scraper) طرح‌وارهٔ جاری و فرم اجرای احرازهویت‌شده را دارند. اجرای زنده هزینه دارد. در توسعهٔ اتصال اختصاصی، ورودی را محدود کنید، برآورد هزینه را به کاربر نشان دهید و پیش از اجرا تأیید بگیرید. کلید را فقط در متغیر محیطی سرور `BARCHIN_API_KEY` تنظیم کنید. `.env.example` جای‌نگهدار است. نمونهٔ محلی فقط فایل نسخه‌دار را می‌خواند.

## پرامپت قابل کپی

Open barchin-net/barchin-mcp, directory examples/developers/projects/persian-news-digest. Build and customize “خبرنامهٔ روزانهٔ فارسی” for Persian RTL users. In that directory run node ../../run.mjs --check, then node ../../run.mjs --serve and open the local address. Use sample.v1.json and expected.v1.json. Expected behavior: تیترهای یک روز و موضوع را کنار هم ببینید و خبرهای مناسب شمارهٔ بعدی را از روی منبع انتخاب کنید. Interpretation rule: در هر دسته تعداد تیترهای مستقل شمرده می‌شود. تاریخ، زمان انتشار ناشر است؛ جدول به خبر اصلی می‌رسد. Add a second publisher to a story group and export the digest with its original links. Add regression checks against expected.v1.json. Keep units, evidence and observation times visible. For optional live data use persian-news-scraper. Follow the README and the linked Barchin input schema. Keep BARCHIN_API_KEY in a server-side environment variable. Show credit estimates and require explicit confirmation before any bounded paid run. Never put a key in browser code or commit .env.
