# جست‌وجوی مشترک آگهی شغلی فارسی

عنوان، شهر و شیوهٔ همکاری را در نمونهٔ ترکیبی جست‌وجو کنید و آگهی اصلی را باز کنید.

## اجرای نمونه

Node.js 18 یا جدیدتر کافی است. مخزن را بگیرید و این دستورها را اجرا کنید.

```sh
git clone https://github.com/barchin-net/barchin-mcp.git
cd barchin-mcp/examples/developers/projects/persian-job-watch
node ../../run.mjs --check
node ../../run.mjs
node ../../run.mjs --serve
```

[دموی محلی](http://127.0.0.1:4173) · [صفحهٔ عمومی](https://barchin.net/developers/projects/persian-job-watch)

ورودی نسخه‌دار در `sample.v1.json` و خروجی پیش‌فرض کامل در `expected.v1.json` است. برچسب منبع هر آگهی حفظ می‌شود. نامشخص یعنی اطلاعات کافی در ردیف نمونه وجود ندارد.

## تنظیمات و دادهٔ زنده

گزیدهٔ دادهٔ عمومی آگهی‌ها از نمونه‌های ثبت‌شدهٔ اکتورهای برچین؛ فقط عنوان، فیلدهای لازم و لینک اصلی حفظ شده‌اند. آگهی ممکن است منقضی شود. 2026-11-24T21:28+00:00 زمان تهیهٔ بسته است. برای تغییر نمونه، ردیفی با همان کلیدها به فایل ورودی اضافه کنید. [`jobvision-scraper`](https://barchin.net/actors/jobvision-scraper) و [`jobinja-scraper`](https://barchin.net/actors/jobinja-scraper) طرح‌وارهٔ جاری و فرم اجرای احرازهویت‌شده را دارند. اجرای زنده هزینه دارد. در توسعهٔ اتصال اختصاصی، ورودی را محدود کنید، برآورد هزینه را به کاربر نشان دهید و پیش از اجرا تأیید بگیرید. کلید را فقط در متغیر محیطی سرور `BARCHIN_API_KEY` تنظیم کنید. `.env.example` جای‌نگهدار است. نمونهٔ محلی فقط فایل نسخه‌دار را می‌خواند.

## پرامپت قابل کپی

Open barchin-net/barchin-mcp, directory examples/developers/projects/persian-job-watch. Build and customize “جست‌وجوی مشترک آگهی شغلی فارسی” for Persian RTL users. In that directory run node ../../run.mjs --check, then node ../../run.mjs --serve and open the local address. Use sample.v1.json and expected.v1.json. Expected behavior: عنوان، شهر و شیوهٔ همکاری را در نمونهٔ ترکیبی جست‌وجو کنید و آگهی اصلی را باز کنید. Interpretation rule: برچسب منبع هر آگهی حفظ می‌شود. نامشخص یعنی اطلاعات کافی در ردیف نمونه وجود ندارد. Add a remote-work filter preset and retain the source URL when merging listings. Add regression checks against expected.v1.json. Keep units, evidence and observation times visible. For optional live data use jobvision-scraper + jobinja-scraper. Follow the README and the linked Barchin input schema. Keep BARCHIN_API_KEY in a server-side environment variable. Show credit estimates and require explicit confirmation before any bounded paid run. Never put a key in browser code or commit .env.
