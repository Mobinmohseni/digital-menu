# Digital Menu Frontend

Frontend حرفه‌ای و mobile-first برای منوی دیجیتال کافه/رستوران با Next.js، TypeScript و Tailwind CSS.

## نیازمندی‌ها

- Node.js 20+ (پیشنهاد: Node.js 22)
- npm 10+
- Backend Django REST Framework در حال اجرا

## 1. نصب

```bash
npm install
```

## 2. Environment

فایل `.env.local` بسازید:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

آدرس Backend در کد hardcode نشده و از این متغیر خوانده می‌شود.

## 3. اتصال به Django

Backend باید این endpointها را در دسترس قرار دهد:

- `/api/categories/`
- `/api/categories/{slug}/`
- `/api/menu-items/`
- `/api/menu-items/{slug}/`
- `/api/menu-items/?category=coffee`

همچنین CORS در Django باید origin فرانت‌اند را مجاز کند؛ برای Development معمولاً `http://localhost:3000`.

## 4. اجرای Development

```bash
npm run dev
```

سپس:

```text
http://localhost:3000
```

## 5. Production

```bash
npm run build
npm run start
```

## 6. Docker اختیاری

```bash
docker compose up --build
```

برای Backend خارج از Docker، مقدار `NEXT_PUBLIC_API_URL` را متناسب با آدرس قابل دسترس Django تنظیم کنید.

## قابلیت‌ها

- RTL و فارسی
- Responsive و Mobile-first
- دریافت داده واقعی از Django REST API
- Category navigation با horizontal scroll
- Featured items
- جستجو در نام و توضیحات
- فیلتر دسته‌بندی با API
- Loading skeleton، Error/Retry و Empty state
- Dark/Light mode با localStorage
- تصاویر با `next/image`
- lazy loading تصاویر خارج از viewport توسط Next Image
- semantic HTML و keyboard accessibility
- metadata و Open Graph
- TypeScript strict بدون `any`
- کامپوننت‌های جدا و قابل توسعه

## نکته Production

برای محیط Production، مقدار `NEXT_PUBLIC_API_URL` باید URL عمومی Backend باشد، مثلاً:

```env
NEXT_PUBLIC_API_URL=https://api.example.com/api
```

و Django باید دامنه فرانت‌اند را در `CORS_ALLOWED_ORIGINS` قرار دهد.
