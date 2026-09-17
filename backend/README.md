# Digital Menu Backend

Production-oriented backend for a cafe/restaurant digital menu using Django, Django REST Framework and PostgreSQL.

## Features

- Category and MenuItem models
- PostgreSQL database
- Django Admin with search, filters, inline editing and slug generation
- Public read-only REST API
- Only active categories and available items are exposed publicly
- Nested category data in MenuItem responses
- Absolute `image_url` values when a request context is available
- Image uploads through Django Admin
- `.env` based secrets/database/CORS configuration
- Seed command
- API and model tests
- Optional Docker + PostgreSQL setup

## 1. Local installation

Python 3.12+ is recommended.

```bash
python -m venv .venv
# Windows PowerShell
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Copy `.env.example` to `.env` and set a real `SECRET_KEY` and PostgreSQL credentials.

## 2. PostgreSQL

Create a database and user, for example:

```sql
CREATE USER menu_user WITH PASSWORD 'menu_password';
CREATE DATABASE digital_menu OWNER menu_user;
```

Then set:

```env
DATABASE_URL=postgresql://menu_user:menu_password@127.0.0.1:5432/digital_menu
```

For production, use a strong password and a managed/secured PostgreSQL instance.

## 3. Migrate and create admin user

```bash
python manage.py migrate
python manage.py createsuperuser
python manage.py collectstatic --noinput
```

## 4. Seed sample data

```bash
python manage.py seed_menu
```

## 5. Run

```bash
python manage.py runserver
```

Admin: `http://127.0.0.1:8000/admin/`

API: `http://127.0.0.1:8000/api/`

## API endpoints

- `GET /api/categories/`
- `GET /api/categories/{slug}/`
- `GET /api/menu-items/`
- `GET /api/menu-items/{slug}/`
- `GET /api/menu-items/?category=coffee`

The public API is read-only. It does not expose admin write endpoints.

## Example response

```json
{
  "id": 1,
  "category": {
    "id": 1,
    "name": "Coffee",
    "slug": "coffee",
    "description": "Hot and cold coffee drinks.",
    "image": "/media/categories/2026/09/coffee.jpg",
    "image_url": "http://127.0.0.1:8000/media/categories/2026/09/coffee.jpg",
    "sort_order": 1,
    "is_active": true,
    "created_at": "2026-09-17T09:00:00Z",
    "updated_at": "2026-09-17T09:00:00Z"
  },
  "name": "Espresso",
  "slug": "espresso",
  "description": "Classic single espresso.",
  "price": "120000.00",
  "image": null,
  "image_url": null,
  "is_available": true,
  "is_featured": true,
  "sort_order": 1,
  "created_at": "2026-09-17T09:00:00Z",
  "updated_at": "2026-09-17T09:00:00Z"
}
```

## Tests

```bash
python manage.py test
```

## Docker

Docker is optional.

```bash
cp .env.example .env
# Set SECRET_KEY and CORS_ALLOWED_ORIGINS in .env
docker compose up --build
```

The backend will be available at `http://127.0.0.1:8000`.

## Production notes

- Set `DEBUG=False`.
- Use a long random `SECRET_KEY` and never commit `.env`.
- Set `ALLOWED_HOSTS` to the real backend domains.
- Set `CORS_ALLOWED_ORIGINS` only to trusted frontend origins.
- Serve media from durable object storage/CDN in a multi-instance deployment; local `MEDIA_ROOT` is suitable for development/single-server deployments.
- Put Django behind HTTPS and a reverse proxy/load balancer.
- Run migrations and `collectstatic` during deployment.
- Use a managed PostgreSQL database with backups.
