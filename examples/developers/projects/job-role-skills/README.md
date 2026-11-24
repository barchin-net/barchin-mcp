# مهارت‌های پرتکرار یک نقش شغلی

نقش را انتخاب کنید و تعداد آگهی‌های حاوی هر مهارت را همراه شواهد ببینید.

## اجرای نمونه

Node.js 18 یا جدیدتر کافی است. مخزن را بگیرید و این دستورها را اجرا کنید.

```sh
git clone https://github.com/barchin-net/barchin-mcp.git
cd barchin-mcp/examples/developers/projects/job-role-skills
node ../../run.mjs --check
node ../../run.mjs
node ../../run.mjs --serve
```

[دموی محلی](http://127.0.0.1:4173) · [صفحهٔ عمومی](https://barchin.net/developers/projects/job-role-skills)

ورودی نسخه‌دار در `sample.v1.json` و خروجی پیش‌فرض کامل در `expected.v1.json` است. هر مهارت در هر آگهی یک بار شمرده می‌شود. مخرج، تعداد آگهی‌های همان نقش در همین نمونه است. مهارت‌ها از فیلدهای منتشرشده یا ذکر صریح در شرح آگهی استخراج شده‌اند. خلاصه به همین چند آگهی محدود است.

## تنظیمات و دادهٔ زنده

مهارت‌ها از شرح یا فهرست نرم‌افزارهای آگهی‌های واقعی جاب‌ویژن استخراج شدند. تعداد آگهی هر نقش کنار شواهد آن دیده می‌شود. 2026-11-24T22:08:06+00:00 زمان تهیهٔ بسته است. برای تغییر نمونه، ردیفی با همان کلیدها به فایل ورودی اضافه کنید. [`jobvision-scraper`](https://barchin.net/actors/jobvision-scraper) طرح‌وارهٔ جاری و فرم اجرای احرازهویت‌شده را دارند. اجرای زنده هزینه دارد. در توسعهٔ اتصال اختصاصی، ورودی را محدود کنید، برآورد هزینه را به کاربر نشان دهید و پیش از اجرا تأیید بگیرید. کلید را فقط در متغیر محیطی سرور `BARCHIN_API_KEY` تنظیم کنید. `.env.example` جای‌نگهدار است. نمونهٔ محلی فقط فایل نسخه‌دار را می‌خواند.

## پرامپت قابل کپی

Open barchin-net/barchin-mcp, directory examples/developers/projects/job-role-skills. Build and customize “مهارت‌های پرتکرار یک نقش شغلی” for Persian RTL users. In that directory run node ../../run.mjs --check, then node ../../run.mjs --serve and open the local address. Use sample.v1.json and expected.v1.json. Expected behavior: نقش را انتخاب کنید و تعداد آگهی‌های حاوی هر مهارت را همراه شواهد ببینید. Interpretation rule: هر مهارت در هر آگهی یک بار شمرده می‌شود. مخرج، تعداد آگهی‌های همان نقش در همین نمونه است. مهارت‌ها از فیلدهای منتشرشده یا ذکر صریح در شرح آگهی استخراج شده‌اند. خلاصه به همین چند آگهی محدود است. Add skill aliases and show a link to every listing counted for an alias. Add regression checks against expected.v1.json. Keep units, evidence and observation times visible. For optional live data use jobvision-scraper. Follow the README and the linked Barchin input schema. Keep BARCHIN_API_KEY in a server-side environment variable. Show credit estimates and require explicit confirmation before any bounded paid run. Never put a key in browser code or commit .env.
