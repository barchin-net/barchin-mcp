# ساخت پیش‌نویس پرسش‌های متداول

پرسش‌های هم‌موضوع را مرور کنید، پاسخ پیشنهادی را ویرایش کنید و FAQ را دریافت کنید.

## اجرای نمونه

Node.js 18 یا جدیدتر کافی است. مخزن را بگیرید و این دستورها را اجرا کنید.

```sh
git clone https://github.com/barchin-net/barchin-mcp.git
cd barchin-mcp/examples/developers/projects/instagram-comment-faq
node ../../run.mjs --check
node ../../run.mjs
node ../../run.mjs --serve
```

[دموی محلی](http://127.0.0.1:4173) · [صفحهٔ عمومی](https://barchin.net/developers/projects/instagram-comment-faq)

ورودی نسخه‌دار در `sample.v1.json` و خروجی پیش‌فرض کامل در `expected.v1.json` است. شمارش بر اساس شناسهٔ یکتای کامنت‌های عمومیِ سطح اول است. درخواست‌های کوتاه مانند «قیمت» هم در گروه قیمت شمرده شده‌اند. ذکر سایز فقط وقتی شمرده شده که دربارهٔ بازهٔ سایز یا موجودی آن سؤال شده باشد. یک کامنت می‌تواند در دو موضوع بیاید. لینک‌های هر ردیف سهم همان پست را نشان می‌دهند. پاسخ‌های پیشنهادی از کپشن فروشگاه آمده‌اند؛ پاسخِ تأییدنشده را می‌توانید خودتان بنویسید.

## تنظیمات و دادهٔ زنده

۸۲۸ کامنت یکتای سطح اول از یازده انتشار عمومی مشکات دیزاین بررسی شد. شمار هر درخواست به تفکیک پست گزارش شده است. پاسخ‌ها پیش‌نویس‌اند و موارد بدون شاهد در کپشن برای فروشگاه خالی مانده‌اند. 2026-11-24T23:02:13+00:00 زمان تهیهٔ بسته است. برای تغییر نمونه، ردیفی با همان کلیدها به فایل ورودی اضافه کنید. [`instagram-comments`](https://barchin.net/actors/instagram-comments) طرح‌وارهٔ جاری و فرم اجرای احرازهویت‌شده را دارند. اجرای زنده هزینه دارد. در توسعهٔ اتصال اختصاصی، ورودی را محدود کنید، برآورد هزینه را به کاربر نشان دهید و پیش از اجرا تأیید بگیرید. کلید را فقط در متغیر محیطی سرور `BARCHIN_API_KEY` تنظیم کنید. `.env.example` جای‌نگهدار است. نمونهٔ محلی فقط فایل نسخه‌دار را می‌خواند.

## پرامپت قابل کپی

Open barchin-net/barchin-mcp, directory examples/developers/projects/instagram-comment-faq. Build and customize “ساخت پیش‌نویس پرسش‌های متداول” for Persian RTL users. In that directory run node ../../run.mjs --check, then node ../../run.mjs --serve and open the local address. Use sample.v1.json and expected.v1.json. Expected behavior: پرسش‌های هم‌موضوع را مرور کنید، پاسخ پیشنهادی را ویرایش کنید و FAQ را دریافت کنید. Interpretation rule: شمارش بر اساس شناسهٔ یکتای کامنت‌های عمومیِ سطح اول است. درخواست‌های کوتاه مانند «قیمت» هم در گروه قیمت شمرده شده‌اند. ذکر سایز فقط وقتی شمرده شده که دربارهٔ بازهٔ سایز یا موجودی آن سؤال شده باشد. یک کامنت می‌تواند در دو موضوع بیاید. لینک‌های هر ردیف سهم همان پست را نشان می‌دهند. پاسخ‌های پیشنهادی از کپشن فروشگاه آمده‌اند؛ پاسخِ تأییدنشده را می‌توانید خودتان بنویسید. Add approval status to each edited answer and export approved questions only. Add regression checks against expected.v1.json. Keep units, evidence and observation times visible. For optional live data use instagram-comments. Follow the README and the linked Barchin input schema. Keep BARCHIN_API_KEY in a server-side environment variable. Show credit estimates and require explicit confirmation before any bounded paid run. Never put a key in browser code or commit .env.
