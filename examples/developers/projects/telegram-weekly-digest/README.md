# خلاصهٔ هفتگی کانال‌های تلگرام

کانال و هفته را انتخاب کنید و پست‌های همان شماره را با پیش‌نمایش و پیوند اصلی مرور کنید.

## اجرای نمونه

Node.js 18 یا جدیدتر کافی است. مخزن را بگیرید و این دستورها را اجرا کنید.

```sh
git clone https://github.com/barchin-net/barchin-mcp.git
cd barchin-mcp/examples/developers/projects/telegram-weekly-digest
node ../../run.mjs --check
node ../../run.mjs
node ../../run.mjs --serve
```

[دموی محلی](http://127.0.0.1:4173) · [صفحهٔ عمومی](https://barchin.net/developers/projects/telegram-weekly-digest)

ورودی نسخه‌دار در `sample.v1.json` و خروجی پیش‌فرض کامل در `expected.v1.json` است. هفته از دوشنبه به وقت UTC گروه‌بندی شده است. پیش‌نمایش کوتاه از آغاز پست عمومی و پیوند متن اصلی کنار هم نمایش داده می‌شوند.

## تنظیمات و دادهٔ زنده

پست‌های عمومیِ متنی در دو کانال، در پنج صفحهٔ نمای عمومی هر کانال. پیش‌نمایش کوتاه آغاز متن، زمان و پیوند از همان پست‌اند. هفته از دوشنبه به وقت UTC شروع می‌شود. 2026-11-24T23:00:08+00:00 زمان تهیهٔ بسته است. برای تغییر نمونه، ردیفی با همان کلیدها به فایل ورودی اضافه کنید. [`telegram-channel-scraper`](https://barchin.net/actors/telegram-channel-scraper) طرح‌وارهٔ جاری و فرم اجرای احرازهویت‌شده را دارند. اجرای زنده هزینه دارد. در توسعهٔ اتصال اختصاصی، ورودی را محدود کنید، برآورد هزینه را به کاربر نشان دهید و پیش از اجرا تأیید بگیرید. کلید را فقط در متغیر محیطی سرور `BARCHIN_API_KEY` تنظیم کنید. `.env.example` جای‌نگهدار است. نمونهٔ محلی فقط فایل نسخه‌دار را می‌خواند.

## پرامپت قابل کپی

Open barchin-net/barchin-mcp, directory examples/developers/projects/telegram-weekly-digest. Build and customize “خلاصهٔ هفتگی کانال‌های تلگرام” for Persian RTL users. In that directory run node ../../run.mjs --check, then node ../../run.mjs --serve and open the local address. Use sample.v1.json and expected.v1.json. Expected behavior: کانال و هفته را انتخاب کنید و پست‌های همان شماره را با پیش‌نمایش و پیوند اصلی مرور کنید. Interpretation rule: هفته از دوشنبه به وقت UTC گروه‌بندی شده است. پیش‌نمایش کوتاه از آغاز پست عمومی و پیوند متن اصلی کنار هم نمایش داده می‌شوند. Add another channel and calculate weekly coverage by topic while preserving post links. Add regression checks against expected.v1.json. Keep units, evidence and observation times visible. For optional live data use telegram-channel-scraper. Follow the README and the linked Barchin input schema. Keep BARCHIN_API_KEY in a server-side environment variable. Show credit estimates and require explicit confirmation before any bounded paid run. Never put a key in browser code or commit .env.
