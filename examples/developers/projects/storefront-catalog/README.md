# ساخت کاتالوگ محصول از لینک فروشگاه

لینک‌های نمونه و ستون‌های موردنیاز را انتخاب کنید و کاتالوگ کالا را به CSV ببرید.

## اجرای نمونه

Node.js 18 یا جدیدتر کافی است. مخزن را بگیرید و این دستورها را اجرا کنید.

```sh
git clone https://github.com/barchin-net/barchin-mcp.git
cd barchin-mcp/examples/developers/projects/storefront-catalog
node ../../run.mjs --check
node ../../run.mjs
node ../../run.mjs --serve
```

[دموی محلی](http://127.0.0.1:4173) · [صفحهٔ عمومی](https://barchin.net/developers/projects/storefront-catalog)

ورودی نسخه‌دار در `sample.v1.json` و خروجی پیش‌فرض کامل در `expected.v1.json` است. ارز هر ردیف مستقل است. ویژگی‌ها از صفحهٔ همان کالا می‌آیند و مقدار نامشخص در خروجی حفظ می‌شود.

## تنظیمات و دادهٔ زنده

نمونهٔ آموزشی تألیفی برچین؛ نام‌ها، اعداد و زمان‌ها برای نمایش رفتار برنامه ساخته شده‌اند. 2026-11-24T21:28+00:00 زمان تهیهٔ بسته است. برای تغییر نمونه، ردیفی با همان کلیدها به فایل ورودی اضافه کنید. [`e-commerce-scraping-tool`](https://barchin.net/actors/e-commerce-scraping-tool) طرح‌وارهٔ جاری و فرم اجرای احرازهویت‌شده را دارند. اجرای زنده هزینه دارد. در توسعهٔ اتصال اختصاصی، ورودی را محدود کنید، برآورد هزینه را به کاربر نشان دهید و پیش از اجرا تأیید بگیرید. کلید را فقط در متغیر محیطی سرور `BARCHIN_API_KEY` تنظیم کنید. `.env.example` جای‌نگهدار است. نمونهٔ محلی فقط فایل نسخه‌دار را می‌خواند.

## پرامپت قابل کپی

Open barchin-net/barchin-mcp, directory examples/developers/projects/storefront-catalog. Build and customize “ساخت کاتالوگ محصول از لینک فروشگاه” for Persian RTL users. In that directory run node ../../run.mjs --check, then node ../../run.mjs --serve and open the local address. Use sample.v1.json and expected.v1.json. Expected behavior: لینک‌های نمونه و ستون‌های موردنیاز را انتخاب کنید و کاتالوگ کالا را به CSV ببرید. Interpretation rule: ارز هر ردیف مستقل است. ویژگی‌ها از صفحهٔ همان کالا می‌آیند و مقدار نامشخص در خروجی حفظ می‌شود. Add SKU and brand as selectable columns and retain the currency on mixed-currency exports. Add regression checks against expected.v1.json. Keep units, evidence and observation times visible. For optional live data use e-commerce-scraping-tool. Follow the README and the linked Barchin input schema. Keep BARCHIN_API_KEY in a server-side environment variable. Show credit estimates and require explicit confirmation before any bounded paid run. Never put a key in browser code or commit .env.

## اتصال اجراشده در سرور محلی

پس از تنظیم BARCHIN_API_KEY فقط در محیط سرور، `node live.mjs HTTPS_PRODUCT_URL` هزینهٔ یک صفحه را برآورد می‌کند. برای شروع اجرای واقعی، `node live.mjs HTTPS_PRODUCT_URL --run` را فراخوانی و تعداد کردیت نمایش‌داده‌شده را وارد کنید. خروجی JSON همان قرارداد ورودی دمو را دارد. گزارش و تأیید هزینه در stderr و داده در stdout است.
