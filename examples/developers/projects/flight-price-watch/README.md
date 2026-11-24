# پایش قیمت پرواز یک مسیر

مسیر و روز سفر را انتخاب کنید و نرخ شرکت‌ها را در نوبت‌های برداشت قابل قیاس ببینید.

## اجرای نمونه

Node.js 18 یا جدیدتر کافی است. مخزن را بگیرید و این دستورها را اجرا کنید.

```sh
git clone https://github.com/barchin-net/barchin-mcp.git
cd barchin-mcp/examples/developers/projects/flight-price-watch
node ../../run.mjs --check
node ../../run.mjs
node ../../run.mjs --serve
```

[دموی محلی](http://127.0.0.1:4173) · [صفحهٔ عمومی](https://barchin.net/developers/projects/flight-price-watch)

ورودی نسخه‌دار در `sample.v1.json` و خروجی پیش‌فرض کامل در `expected.v1.json` است. هر پیشنهاد برای یک بزرگسال، سفر یک‌طرفه و کابین اکونومی است. روز سفر و زمان مشاهده دو چیز متفاوت‌اند.

## تنظیمات و دادهٔ زنده

برداشت ثبت‌شدهٔ اکتور پرواز علی‌بابا. روز سفر از زمان پرواز می‌آید. قیمت پیشنهادی بلیت در لحظهٔ برداشت از ریال به تومان تبدیل شده است. 2026-11-24T22:02:07+00:00 زمان تهیهٔ بسته است. برای تغییر نمونه، ردیفی با همان کلیدها به فایل ورودی اضافه کنید. [`alibaba-travel-scraper`](https://barchin.net/actors/alibaba-travel-scraper) طرح‌وارهٔ جاری و فرم اجرای احرازهویت‌شده را دارند. اجرای زنده هزینه دارد. در توسعهٔ اتصال اختصاصی، ورودی را محدود کنید، برآورد هزینه را به کاربر نشان دهید و پیش از اجرا تأیید بگیرید. کلید را فقط در متغیر محیطی سرور `BARCHIN_API_KEY` تنظیم کنید. `.env.example` جای‌نگهدار است. نمونهٔ محلی فقط فایل نسخه‌دار را می‌خواند.

## پرامپت قابل کپی

Open barchin-net/barchin-mcp, directory examples/developers/projects/flight-price-watch. Build and customize “پایش قیمت پرواز یک مسیر” for Persian RTL users. In that directory run node ../../run.mjs --check, then node ../../run.mjs --serve and open the local address. Use sample.v1.json and expected.v1.json. Expected behavior: مسیر و روز سفر را انتخاب کنید و نرخ شرکت‌ها را در نوبت‌های برداشت قابل قیاس ببینید. Interpretation rule: هر پیشنهاد برای یک بزرگسال، سفر یک‌طرفه و کابین اکونومی است. روز سفر و زمان مشاهده دو چیز متفاوت‌اند. Add a departure-time filter and compare only the same route, date and cabin. Add regression checks against expected.v1.json. Keep units, evidence and observation times visible. For optional live data use alibaba-travel-scraper. Follow the README and the linked Barchin input schema. Keep BARCHIN_API_KEY in a server-side environment variable. Show credit estimates and require explicit confirmation before any bounded paid run. Never put a key in browser code or commit .env.
