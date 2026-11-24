# مقایسهٔ پوشش مکان‌ها در نشان و بلد

صنف و محدودهٔ مشترک را فیلتر کنید و مکان‌های مشترک، تک‌منبع و مبهم را ببینید.

## اجرای نمونه

Node.js 18 یا جدیدتر کافی است. مخزن را بگیرید و این دستورها را اجرا کنید.

```sh
git clone https://github.com/barchin-net/barchin-mcp.git
cd barchin-mcp/examples/developers/projects/neshan-balad-coverage
node ../../run.mjs --check
node ../../run.mjs
node ../../run.mjs --serve
```

[دموی محلی](http://127.0.0.1:4173) · [صفحهٔ عمومی](https://barchin.net/developers/projects/neshan-balad-coverage)

ورودی نسخه‌دار در `sample.v1.json` و خروجی پیش‌فرض کامل در `expected.v1.json` است. نام‌ها با یکسان‌کردن فاصله، نویسه‌های فارسی و عنوان صنفی «کافی‌شاپ» و «کافه» مقایسه می‌شوند. تطبیق به صنف و محدودهٔ یکسان و یک جفت یکتا در فاصلهٔ حداکثر ۱۵۰ متر نیاز دارد.

## تنظیمات و دادهٔ زنده

کافه‌های عمومی نشان و بلد در یک کادر تهران، از عرض ۳۵٫۶۸ تا ۳۵٫۸۱ و طول ۵۱٫۳۴ تا ۵۱٫۵۱. خط عرض ۳۵٫۷۴۵ کادر را برای فیلتر به شمال و جنوب تقسیم می‌کند. نتیجهٔ جست‌وجو همهٔ کافه‌های محدوده را پوشش نمی‌دهد. 2026-11-24T23:00:38+00:00 زمان تهیهٔ بسته است. برای تغییر نمونه، ردیفی با همان کلیدها به فایل ورودی اضافه کنید. [`neshan-search-scraper`](https://barchin.net/actors/neshan-search-scraper) و [`balad-places-scraper`](https://barchin.net/actors/balad-places-scraper) طرح‌وارهٔ جاری و فرم اجرای احرازهویت‌شده را دارند. اجرای زنده هزینه دارد. در توسعهٔ اتصال اختصاصی، ورودی را محدود کنید، برآورد هزینه را به کاربر نشان دهید و پیش از اجرا تأیید بگیرید. کلید را فقط در متغیر محیطی سرور `BARCHIN_API_KEY` تنظیم کنید. `.env.example` جای‌نگهدار است. نمونهٔ محلی فقط فایل نسخه‌دار را می‌خواند.

## پرامپت قابل کپی

Open barchin-net/barchin-mcp, directory examples/developers/projects/neshan-balad-coverage. Build and customize “مقایسهٔ پوشش مکان‌ها در نشان و بلد” for Persian RTL users. In that directory run node ../../run.mjs --check, then node ../../run.mjs --serve and open the local address. Use sample.v1.json and expected.v1.json. Expected behavior: صنف و محدودهٔ مشترک را فیلتر کنید و مکان‌های مشترک، تک‌منبع و مبهم را ببینید. Interpretation rule: نام‌ها با یکسان‌کردن فاصله، نویسه‌های فارسی و عنوان صنفی «کافی‌شاپ» و «کافه» مقایسه می‌شوند. تطبیق به صنف و محدودهٔ یکسان و یک جفت یکتا در فاصلهٔ حداکثر ۱۵۰ متر نیاز دارد. Expose the distance threshold and let a reviewer resolve ambiguous candidates. Add regression checks against expected.v1.json. Keep units, evidence and observation times visible. For optional live data use neshan-search-scraper + balad-places-scraper. Follow the README and the linked Barchin input schema. Keep BARCHIN_API_KEY in a server-side environment variable. Show credit estimates and require explicit confirmation before any bounded paid run. Never put a key in browser code or commit .env.
