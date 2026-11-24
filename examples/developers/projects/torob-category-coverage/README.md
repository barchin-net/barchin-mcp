# پوشش فروشندگان در دسته‌های ترب

دسته را انتخاب و کالاها را با تعداد فروشنده و کمترین قیمت مشاهده‌شده بررسی کنید.

## اجرای نمونه

Node.js 18 یا جدیدتر کافی است. مخزن را بگیرید و این دستورها را اجرا کنید.

```sh
git clone https://github.com/barchin-net/barchin-mcp.git
cd barchin-mcp/examples/developers/projects/torob-category-coverage
node ../../run.mjs --check
node ../../run.mjs
node ../../run.mjs --serve
```

[دموی محلی](http://127.0.0.1:4173) · [صفحهٔ عمومی](https://barchin.net/developers/projects/torob-category-coverage)

ورودی نسخه‌دار در `sample.v1.json` و خروجی پیش‌فرض کامل در `expected.v1.json` است. کف قیمت و شمار فروشنده مربوط به همان کالا و تاریخ برداشت‌اند. زمان برداشت کالاهای یک دسته می‌تواند متفاوت باشد و شمارش محدود به پیشنهادهای قابل مشاهده است.

## تنظیمات و دادهٔ زنده

سه کارت دستهٔ اره از آرشیو عمومی ترب و پنج صفحهٔ کالای ابزار از برداشت برچین. در صفحات کالا تعداد نام‌های متمایز فروشنده در پیشنهادهای منتشرشده و کف قیمت اعلامی صفحه گزارش شده است. پوشش دسته محدود است. برای کالاهای آرشیو Common Crawl، ستون دسته همان شاخهٔ اصلی ترب است و زیردسته در ستون جدا آمده است. تعداد، فقط فروشندگان متمایز با قیمت موجود در صفحهٔ ثبت‌شده است. 2026-11-24T23:00:08+00:00 زمان تهیهٔ بسته است. برای تغییر نمونه، ردیفی با همان کلیدها به فایل ورودی اضافه کنید. [`torob-category-browser`](https://barchin.net/actors/torob-category-browser) طرح‌وارهٔ جاری و فرم اجرای احرازهویت‌شده را دارند. اجرای زنده هزینه دارد. در توسعهٔ اتصال اختصاصی، ورودی را محدود کنید، برآورد هزینه را به کاربر نشان دهید و پیش از اجرا تأیید بگیرید. کلید را فقط در متغیر محیطی سرور `BARCHIN_API_KEY` تنظیم کنید. `.env.example` جای‌نگهدار است. نمونهٔ محلی فقط فایل نسخه‌دار را می‌خواند.

## پرامپت قابل کپی

Open barchin-net/barchin-mcp, directory examples/developers/projects/torob-category-coverage. Build and customize “پوشش فروشندگان در دسته‌های ترب” for Persian RTL users. In that directory run node ../../run.mjs --check, then node ../../run.mjs --serve and open the local address. Use sample.v1.json and expected.v1.json. Expected behavior: دسته را انتخاب و کالاها را با تعداد فروشنده و کمترین قیمت مشاهده‌شده بررسی کنید. Interpretation rule: کف قیمت و شمار فروشنده مربوط به همان کالا و تاریخ برداشت‌اند. زمان برداشت کالاهای یک دسته می‌تواند متفاوت باشد و شمارش محدود به پیشنهادهای قابل مشاهده است. Add a seller-count threshold and let the user drill into the selected product. Add regression checks against expected.v1.json. Keep units, evidence and observation times visible. For optional live data use torob-category-browser. Follow the README and the linked Barchin input schema. Keep BARCHIN_API_KEY in a server-side environment variable. Show credit estimates and require explicit confirmation before any bounded paid run. Never put a key in browser code or commit .env.

نشانی WARC، بازهٔ بایت، نشانی اصلی و چکیدهٔ محتوای صفحات ترب در [فهرست برداشت‌های Common Crawl](../torob-price-history/archive-sources.json) آمده است.
