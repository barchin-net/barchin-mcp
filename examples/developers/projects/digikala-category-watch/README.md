# پایش دسته‌بندی دیجی‌کالا

شاخه و زیرشاخه را انتخاب و دو برداشت را برای ورود، خروج و تغییر قیمت کالا مقایسه کنید.

## اجرای نمونه

Node.js 18 یا جدیدتر کافی است. مخزن را بگیرید و این دستورها را اجرا کنید.

```sh
git clone https://github.com/barchin-net/barchin-mcp.git
cd barchin-mcp/examples/developers/projects/digikala-category-watch
node ../../run.mjs --check
node ../../run.mjs
node ../../run.mjs --serve
```

[دموی محلی](http://127.0.0.1:4173) · [صفحهٔ عمومی](https://barchin.net/developers/projects/digikala-category-watch)

ورودی نسخه‌دار در `sample.v1.json` و خروجی پیش‌فرض کامل در `expected.v1.json` است. شناسهٔ کالا در همان زیرشاخه مبنای تطبیق است. خروج از نمونه فقط به معنی دیده‌نشدن در برداشت دوم است.

## تنظیمات و دادهٔ زنده

سه صفحهٔ اول جست‌وجوهای گوشی موبایل و کتاب در دو نوبت از دیجی‌کالا خوانده شد. فقط کالاهای دارای قیمت همان دسته وارد شدند. تاریخ مقایسه زمان شروع برداشت دسته است. 2026-11-24T23:00:08+00:00 زمان تهیهٔ بسته است. برای تغییر نمونه، ردیفی با همان کلیدها به فایل ورودی اضافه کنید. [`digikala-category-tree`](https://barchin.net/actors/digikala-category-tree) و [`digikala-scraper`](https://barchin.net/actors/digikala-scraper) طرح‌وارهٔ جاری و فرم اجرای احرازهویت‌شده را دارند. اجرای زنده هزینه دارد. در توسعهٔ اتصال اختصاصی، ورودی را محدود کنید، برآورد هزینه را به کاربر نشان دهید و پیش از اجرا تأیید بگیرید. کلید را فقط در متغیر محیطی سرور `BARCHIN_API_KEY` تنظیم کنید. `.env.example` جای‌نگهدار است. نمونهٔ محلی فقط فایل نسخه‌دار را می‌خواند.

## پرامپت قابل کپی

Open barchin-net/barchin-mcp, directory examples/developers/projects/digikala-category-watch. Build and customize “پایش دسته‌بندی دیجی‌کالا” for Persian RTL users. In that directory run node ../../run.mjs --check, then node ../../run.mjs --serve and open the local address. Use sample.v1.json and expected.v1.json. Expected behavior: شاخه و زیرشاخه را انتخاب و دو برداشت را برای ورود، خروج و تغییر قیمت کالا مقایسه کنید. Interpretation rule: شناسهٔ کالا در همان زیرشاخه مبنای تطبیق است. خروج از نمونه فقط به معنی دیده‌نشدن در برداشت دوم است. Add a third dated category snapshot and an export of added and removed product IDs. Add regression checks against expected.v1.json. Keep units, evidence and observation times visible. For optional live data use digikala-category-tree + digikala-scraper. Follow the README and the linked Barchin input schema. Keep BARCHIN_API_KEY in a server-side environment variable. Show credit estimates and require explicit confirmation before any bounded paid run. Never put a key in browser code or commit .env.
