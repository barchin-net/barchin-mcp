# دیده‌بان آگهی‌های دیوار

شهر، دسته و سقف قیمت را تعیین کنید و آگهی‌ها را برای مراجعهٔ بعدی ذخیره کنید.

## اجرای نمونه

Node.js 18 یا جدیدتر کافی است. مخزن را بگیرید و این دستورها را اجرا کنید.

```sh
git clone https://github.com/barchin-net/barchin-mcp.git
cd barchin-mcp/examples/developers/projects/divar-listing-watch
node ../../run.mjs --check
node ../../run.mjs
node ../../run.mjs --serve
```

[دموی محلی](http://127.0.0.1:4173) · [صفحهٔ عمومی](https://barchin.net/developers/projects/divar-listing-watch)

ورودی نسخه‌دار در `sample.v1.json` و خروجی پیش‌فرض کامل در `expected.v1.json` است. نشان‌کردن فقط در همین مرورگر ذخیره می‌شود. قیمت توافقی از فیلتر عددی خارج است.

## تنظیمات و دادهٔ زنده

آگهی‌های عمومی تهران و شیراز را اکتور دیوار خوانده است. قیمت‌ها مبلغ درخواستی آگهی‌دهنده به تومان‌اند. 2026-11-24T23:00:08+00:00 زمان تهیهٔ بسته است. برای تغییر نمونه، ردیفی با همان کلیدها به فایل ورودی اضافه کنید. [`divar-scraper`](https://barchin.net/actors/divar-scraper) طرح‌وارهٔ جاری و فرم اجرای احرازهویت‌شده را دارند. اجرای زنده هزینه دارد. در توسعهٔ اتصال اختصاصی، ورودی را محدود کنید، برآورد هزینه را به کاربر نشان دهید و پیش از اجرا تأیید بگیرید. کلید را فقط در متغیر محیطی سرور `BARCHIN_API_KEY` تنظیم کنید. `.env.example` جای‌نگهدار است. نمونهٔ محلی فقط فایل نسخه‌دار را می‌خواند.

## پرامپت قابل کپی

Open barchin-net/barchin-mcp, directory examples/developers/projects/divar-listing-watch. Build and customize “دیده‌بان آگهی‌های دیوار” for Persian RTL users. In that directory run node ../../run.mjs --check, then node ../../run.mjs --serve and open the local address. Use sample.v1.json and expected.v1.json. Expected behavior: شهر، دسته و سقف قیمت را تعیین کنید و آگهی‌ها را برای مراجعهٔ بعدی ذخیره کنید. Interpretation rule: نشان‌کردن فقط در همین مرورگر ذخیره می‌شود. قیمت توافقی از فیلتر عددی خارج است. Add notes to saved listings and export the shortlist without contact information. Add regression checks against expected.v1.json. Keep units, evidence and observation times visible. For optional live data use divar-scraper. Follow the README and the linked Barchin input schema. Keep BARCHIN_API_KEY in a server-side environment variable. Show credit estimates and require explicit confirmation before any bounded paid run. Never put a key in browser code or commit .env.
