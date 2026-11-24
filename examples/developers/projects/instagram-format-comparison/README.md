# مقایسهٔ پست و ریل اینستاگرام

مدل‌های لباس مشکات دیزاین را با کاور، پسند، نظر و بازدید ریل مقایسه کنید و ببینید کدام انتشار بیشترین تعامل را گرفته است.

## اجرای نمونه

Node.js 18 یا جدیدتر کافی است. مخزن را بگیرید و این دستورها را اجرا کنید.

```sh
git clone https://github.com/barchin-net/barchin-mcp.git
cd barchin-mcp/examples/developers/projects/instagram-format-comparison
node ../../run.mjs --check
node ../../run.mjs
node ../../run.mjs --serve
```

[دموی محلی](http://127.0.0.1:4173) · [صفحهٔ عمومی](https://barchin.net/developers/projects/instagram-format-comparison)

ورودی نسخه‌دار در `sample.v1.json` و خروجی پیش‌فرض کامل در `expected.v1.json` است. تعامل هر انتشار برابر مجموع پسند و نظر عمومی آن است. هر پست یا ریل جدا سنجیده می‌شود؛ مدل‌های مشترک را می‌توانید با هم انتخاب کنید. بازدید فقط بین ریل‌ها مقایسه می‌شود. زمان انتشارها متفاوت است و این شمارنده‌ها تعداد خریداران یا افراد یکتا را نشان نمی‌دهند.

## تنظیمات و دادهٔ زنده

انتشارهای یکتای عمومی مشکات دیزاین از فهرست پست‌ها و ریل‌ها بررسی شدند. هر کاور و شمارنده به همان انتشار تعلق دارد. نام مدل از کپشن و تاریخ از صفحهٔ اصلی تأیید شده است. فاصلهٔ زمانی انتشارها متفاوت است. 2026-11-24T23:04:16+00:00 زمان تهیهٔ بسته است. برای تغییر نمونه، ردیفی با همان کلیدها به فایل ورودی اضافه کنید. [`instagram-insights`](https://barchin.net/agents/instagram-insights) طرح‌وارهٔ جاری و فرم اجرای احرازهویت‌شده را دارند. اجرای زنده هزینه دارد. در توسعهٔ اتصال اختصاصی، ورودی را محدود کنید، برآورد هزینه را به کاربر نشان دهید و پیش از اجرا تأیید بگیرید. کلید را فقط در متغیر محیطی سرور `BARCHIN_API_KEY` تنظیم کنید. `.env.example` جای‌نگهدار است. نمونهٔ محلی فقط فایل نسخه‌دار را می‌خواند.

## پرامپت قابل کپی

Open barchin-net/barchin-mcp, directory examples/developers/projects/instagram-format-comparison. Build and customize “مقایسهٔ پست و ریل اینستاگرام” for Persian RTL users. In that directory run node ../../run.mjs --check, then node ../../run.mjs --serve and open the local address. Use sample.v1.json and expected.v1.json. Expected behavior: مدل‌های لباس مشکات دیزاین را با کاور، پسند، نظر و بازدید ریل مقایسه کنید و ببینید کدام انتشار بیشترین تعامل را گرفته است. Interpretation rule: تعامل هر انتشار برابر مجموع پسند و نظر عمومی آن است. هر پست یا ریل جدا سنجیده می‌شود؛ مدل‌های مشترک را می‌توانید با هم انتخاب کنید. بازدید فقط بین ریل‌ها مقایسه می‌شود. زمان انتشارها متفاوت است و این شمارنده‌ها تعداد خریداران یا افراد یکتا را نشان نمی‌دهند. Add an observation window and count how many items actually report each metric. Add regression checks against expected.v1.json. Keep units, evidence and observation times visible. For optional live data use instagram-insights. Follow the README and the linked Barchin input schema. Keep BARCHIN_API_KEY in a server-side environment variable. Show credit estimates and require explicit confirmation before any bounded paid run. Never put a key in browser code or commit .env.

تصاویر پوشهٔ `covers/` کاورهای عمومی مشکات دیزاین هستند. لینک انتشار اصلی کنار هر تصویر است. مجوز MIT کد پروژه شامل تصاویر فروشگاه نمی‌شود.
