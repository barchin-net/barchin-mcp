# تاریخچهٔ قیمت منتشرشدهٔ خودروی صفر

مدل و بازهٔ زمانی را انتخاب کنید و قیمت بازار و نمایندگی را در تاریخ‌های یکسان بخوانید.

## اجرای نمونه

Node.js 18 یا جدیدتر کافی است. مخزن را بگیرید و این دستورها را اجرا کنید.

```sh
git clone https://github.com/barchin-net/barchin-mcp.git
cd barchin-mcp/examples/developers/projects/new-car-price-history
node ../../run.mjs --check
node ../../run.mjs
node ../../run.mjs --serve
```

[دموی محلی](http://127.0.0.1:4173) · [صفحهٔ عمومی](https://barchin.net/developers/projects/new-car-price-history)

ورودی نسخه‌دار در `sample.v1.json` و خروجی پیش‌فرض کامل در `expected.v1.json` است. تاریخ هر ردیف، روز قیمت‌گذاری باماست؛ زمان مشاهده، زمان خواندن نمودار است. مقایسه فقط برای مدل و سال ساخت یکسان و قیمت از همان نوع است. روزهای بدون قیمت و مبلغ اعلام‌نشدهٔ نمایندگی خالی می‌مانند.

## تنظیمات و دادهٔ زنده

سری روزانهٔ منتشرشده در نمودار عمومی همان مدل، تیپ و سال ساخت در باما. تا ۶۰ روز تقویمی آخر بررسی شده و هر مدل دست‌کم ۱۵ روز دارای قیمت دارد. روز فارسی نمودار از آخرین نقطهٔ نزدیک به برداشت تطبیق داده شده است. برای سال ساخت و عرضه‌کنندهٔ دارای چند سری مبهم، رقمی وارد نشده است. 2026-11-24T23:09:07+00:00 زمان تهیهٔ بسته است. برای تغییر نمونه، ردیفی با همان کلیدها به فایل ورودی اضافه کنید. [`bama-scraper`](https://barchin.net/actors/bama-scraper) طرح‌وارهٔ جاری و فرم اجرای احرازهویت‌شده را دارند. اجرای زنده هزینه دارد. در توسعهٔ اتصال اختصاصی، ورودی را محدود کنید، برآورد هزینه را به کاربر نشان دهید و پیش از اجرا تأیید بگیرید. کلید را فقط در متغیر محیطی سرور `BARCHIN_API_KEY` تنظیم کنید. `.env.example` جای‌نگهدار است. نمونهٔ محلی فقط فایل نسخه‌دار را می‌خواند.

## پرامپت قابل کپی

Open barchin-net/barchin-mcp, directory examples/developers/projects/new-car-price-history. Build and customize “تاریخچهٔ قیمت منتشرشدهٔ خودروی صفر” for Persian RTL users. In that directory run node ../../run.mjs --check, then node ../../run.mjs --serve and open the local address. Use sample.v1.json and expected.v1.json. Expected behavior: مدل و بازهٔ زمانی را انتخاب کنید و قیمت بازار و نمایندگی را در تاریخ‌های یکسان بخوانید. Interpretation rule: تاریخ هر ردیف، روز قیمت‌گذاری باماست؛ زمان مشاهده، زمان خواندن نمودار است. مقایسه فقط برای مدل و سال ساخت یکسان و قیمت از همان نوع است. روزهای بدون قیمت و مبلغ اعلام‌نشدهٔ نمایندگی خالی می‌مانند. Chart the gap between market and dealership prices, leaving missing quotes as gaps. Add regression checks against expected.v1.json. Keep units, evidence and observation times visible. For optional live data use bama-scraper. Follow the README and the linked Barchin input schema. Keep BARCHIN_API_KEY in a server-side environment variable. Show credit estimates and require explicit confirmation before any bounded paid run. Never put a key in browser code or commit .env.
