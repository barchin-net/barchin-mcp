# مقایسهٔ ودیعه و اجاره بر اساس محله و متراژ

محله و متراژ را محدود کنید و ودیعه و اجارهٔ ماهانهٔ هر آگهی را کنار هم ببینید.

## اجرای نمونه

Node.js 18 یا جدیدتر کافی است. مخزن را بگیرید و این دستورها را اجرا کنید.

```sh
git clone https://github.com/barchin-net/barchin-mcp.git
cd barchin-mcp/examples/developers/projects/neighborhood-rent
node ../../run.mjs --check
node ../../run.mjs
node ../../run.mjs --serve
```

[دموی محلی](http://127.0.0.1:4173) · [صفحهٔ عمومی](https://barchin.net/developers/projects/neighborhood-rent)

ورودی نسخه‌دار در `sample.v1.json` و خروجی پیش‌فرض کامل در `expected.v1.json` است. ودیعه و اجارهٔ ماهانه دو مبلغ جداگانه به تومان‌اند. تبدیل عرفی بین آن‌ها انجام نمی‌شود.

## تنظیمات و دادهٔ زنده

صفحه‌های عمومی ملک در تهران با اکتور کیلید خوانده شدند. مساحت به مترمربع و مبالغ پس از تبدیل ریال به تومان نمایش داده می‌شوند. 2026-11-24T22:02:07+00:00 زمان تهیهٔ بسته است. برای تغییر نمونه، ردیفی با همان کلیدها به فایل ورودی اضافه کنید. [`kilid-scraper`](https://barchin.net/actors/kilid-scraper) طرح‌وارهٔ جاری و فرم اجرای احرازهویت‌شده را دارند. اجرای زنده هزینه دارد. در توسعهٔ اتصال اختصاصی، ورودی را محدود کنید، برآورد هزینه را به کاربر نشان دهید و پیش از اجرا تأیید بگیرید. کلید را فقط در متغیر محیطی سرور `BARCHIN_API_KEY` تنظیم کنید. `.env.example` جای‌نگهدار است. نمونهٔ محلی فقط فایل نسخه‌دار را می‌خواند.

## پرامپت قابل کپی

Open barchin-net/barchin-mcp, directory examples/developers/projects/neighborhood-rent. Build and customize “مقایسهٔ ودیعه و اجاره بر اساس محله و متراژ” for Persian RTL users. In that directory run node ../../run.mjs --check, then node ../../run.mjs --serve and open the local address. Use sample.v1.json and expected.v1.json. Expected behavior: محله و متراژ را محدود کنید و ودیعه و اجارهٔ ماهانهٔ هر آگهی را کنار هم ببینید. Interpretation rule: ودیعه و اجارهٔ ماهانه دو مبلغ جداگانه به تومان‌اند. تبدیل عرفی بین آن‌ها انجام نمی‌شود. Add an elevator filter and show deposit and monthly rent in separate ranges. Add regression checks against expected.v1.json. Keep units, evidence and observation times visible. For optional live data use kilid-scraper. Follow the README and the linked Barchin input schema. Keep BARCHIN_API_KEY in a server-side environment variable. Show credit estimates and require explicit confirmation before any bounded paid run. Never put a key in browser code or commit .env.
