# انتخاب اقامتگاه با امکانات و بودجه

شهر، امکانات و سقف بودجه را تعیین کنید و قیمت‌های نامعلوم و تاریخ‌های تأییدنشده را ببینید.

## اجرای نمونه

Node.js 18 یا جدیدتر کافی است. مخزن را بگیرید و این دستورها را اجرا کنید.

```sh
git clone https://github.com/barchin-net/barchin-mcp.git
cd barchin-mcp/examples/developers/projects/stay-by-amenity
node ../../run.mjs --check
node ../../run.mjs
node ../../run.mjs --serve
```

[دموی محلی](http://127.0.0.1:4173) · [صفحهٔ عمومی](https://barchin.net/developers/projects/stay-by-amenity)

ورودی نسخه‌دار در `sample.v1.json` و خروجی پیش‌فرض کامل در `expected.v1.json` است. قیمت به تومان برای یک شب است. وجود قیمت در نمونه تأیید ظرفیت در تاریخ سفر نیست.

## تنظیمات و دادهٔ زنده

اطلاعات از صفحات عمومی اقامتگاه‌ها استخراج شده است. مبلغ هر شب به تومان نمایش داده می‌شود. برای این برداشت تاریخ ورود و خروج انتخاب نشده است. برای ردیف جاجیگا، حیاط و محل از شرح اقامتگاه آمده‌اند. قیمت در HTML دریافتی در دسترس نبود. 2026-11-24T22:02:07+00:00 زمان تهیهٔ بسته است. برای تغییر نمونه، ردیفی با همان کلیدها به فایل ورودی اضافه کنید. [`jabama-scraper`](https://barchin.net/actors/jabama-scraper) و [`jajiga-scraper`](https://barchin.net/actors/jajiga-scraper) طرح‌وارهٔ جاری و فرم اجرای احرازهویت‌شده را دارند. اجرای زنده هزینه دارد. در توسعهٔ اتصال اختصاصی، ورودی را محدود کنید، برآورد هزینه را به کاربر نشان دهید و پیش از اجرا تأیید بگیرید. کلید را فقط در متغیر محیطی سرور `BARCHIN_API_KEY` تنظیم کنید. `.env.example` جای‌نگهدار است. نمونهٔ محلی فقط فایل نسخه‌دار را می‌خواند.

## پرامپت قابل کپی

Open barchin-net/barchin-mcp, directory examples/developers/projects/stay-by-amenity. Build and customize “انتخاب اقامتگاه با امکانات و بودجه” for Persian RTL users. In that directory run node ../../run.mjs --check, then node ../../run.mjs --serve and open the local address. Use sample.v1.json and expected.v1.json. Expected behavior: شهر، امکانات و سقف بودجه را تعیین کنید و قیمت‌های نامعلوم و تاریخ‌های تأییدنشده را ببینید. Interpretation rule: قیمت به تومان برای یک شب است. وجود قیمت در نمونه تأیید ظرفیت در تاریخ سفر نیست. Add a required-amenities checklist and a separate view for unconfirmed availability. Add regression checks against expected.v1.json. Keep units, evidence and observation times visible. For optional live data use jabama-scraper + jajiga-scraper. Follow the README and the linked Barchin input schema. Keep BARCHIN_API_KEY in a server-side environment variable. Show credit estimates and require explicit confirmation before any bounded paid run. Never put a key in browser code or commit .env.
