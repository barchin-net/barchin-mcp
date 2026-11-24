# داشبورد تاریخچهٔ قیمت و موجودی ترب

برای هر کالا ببینید کدام فروشنده را اول بررسی کنید، اختلاف قیمت پیشنهادها چقدر است و در پایش بعدی چه چیزی ثبت شد.

## اجرای نمونه

Node.js 18 یا جدیدتر کافی است. مخزن را بگیرید و این دستورها را اجرا کنید.

```sh
git clone https://github.com/barchin-net/barchin-mcp.git
cd barchin-mcp/examples/developers/projects/torob-price-history
node ../../run.mjs --check
node ../../run.mjs
node ../../run.mjs --serve
```

[دموی محلی](http://127.0.0.1:4173) · [صفحهٔ عمومی](https://barchin.net/developers/projects/torob-price-history)

ورودی نسخه‌دار در `sample.v1.json` و خروجی پیش‌فرض کامل در `expected.v1.json` است. فقط پیشنهادهای موجودِ همان کالا در یک نوبت برداشت با هم مقایسه می‌شوند. اختلاف با کمترین قیمت به تومان است. هزینهٔ ارسال و شرایط ضمانت در داده ثبت نشده‌اند. برای تصمیم خرید، پیشنهاد را در ترب دوباره بررسی کنید.

## تنظیمات و دادهٔ زنده

پیشنهادهای قابل تطبیق از پنج صفحهٔ ثبت‌شدهٔ ترب استخراج شده‌اند. برای دو کالا برداشت مجدد با HTTP 490 ثبت شده است. پوشش هر کالا و زمان آن جداست. برای کالاهای آرشیوی، پیشنهادهای هم‌زمانِ درج‌شده در صفحهٔ کالا در Common Crawl خوانده شد. زمان ثبت هر قیمت، زمان برداشت همان نسخه است. برای فروشندهٔ دارای چند پیشنهاد، کمترین قیمت موجود انتخاب شد. 2026-11-24T23:00:08+00:00 زمان تهیهٔ بسته است. برای تغییر نمونه، ردیفی با همان کلیدها به فایل ورودی اضافه کنید. [`torob-product-sellers`](https://barchin.net/actors/torob-product-sellers) طرح‌وارهٔ جاری و فرم اجرای احرازهویت‌شده را دارند. اجرای زنده هزینه دارد. در توسعهٔ اتصال اختصاصی، ورودی را محدود کنید، برآورد هزینه را به کاربر نشان دهید و پیش از اجرا تأیید بگیرید. کلید را فقط در متغیر محیطی سرور `BARCHIN_API_KEY` تنظیم کنید. `.env.example` جای‌نگهدار است. نمونهٔ محلی فقط فایل نسخه‌دار را می‌خواند.

## پرامپت قابل کپی

Open barchin-net/barchin-mcp, directory examples/developers/projects/torob-price-history. Build and customize “داشبورد تاریخچهٔ قیمت و موجودی ترب” for Persian RTL users. In that directory run node ../../run.mjs --check, then node ../../run.mjs --serve and open the local address. Use sample.v1.json and expected.v1.json. Expected behavior: برای هر کالا ببینید کدام فروشنده را اول بررسی کنید، اختلاف قیمت پیشنهادها چقدر است و در پایش بعدی چه چیزی ثبت شد. Interpretation rule: فقط پیشنهادهای موجودِ همان کالا در یک نوبت برداشت با هم مقایسه می‌شوند. اختلاف با کمترین قیمت به تومان است. هزینهٔ ارسال و شرایط ضمانت در داده ثبت نشده‌اند. برای تصمیم خرید، پیشنهاد را در ترب دوباره بررسی کنید. Start with a product URL and a bounded torob-product-sellers run. Store one capture time per run, product, seller, price in toman, availability and source. Compare available offers within one capture. Only notify a price change after two positive observed prices for the same seller and product. Keep failed checks in the history. Add regression checks against expected.v1.json. Keep units, evidence and observation times visible. For optional live data use torob-product-sellers. Follow the README and the linked Barchin input schema. Keep BARCHIN_API_KEY in a server-side environment variable. Show credit estimates and require explicit confirmation before any bounded paid run. Never put a key in browser code or commit .env.

نشانی WARC، بازهٔ بایت، نشانی اصلی و چکیدهٔ محتوای صفحات ترب در [فهرست برداشت‌های Common Crawl](../torob-price-history/archive-sources.json) آمده است.
