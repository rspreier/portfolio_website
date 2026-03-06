# Ryan Spreier Portfolio Website

Portfolio project with:
- Next.js frontend (`/`)
- Spring Boot REST API backend (`/backend`)
- PostgreSQL database (via Docker)

## Tech Stack

### Frontend
- Next.js 15
- React 19
- Tailwind CSS + DaisyUI
- Framer Motion
- Spline (interactive 3D home experience)

### Backend
- Spring Boot 3
- Java 21
- Spring Data JPA + Hibernate
- Flyway migrations
- PostgreSQL
- Spring Mail
- OpenAPI/Swagger UI

## Local Development (Frontend)

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open:

`http://localhost:3000`

## Frontend Environment Variables

Create a `.env.local` file in the project root with:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

## Frontend Scripts

- `npm run dev` - Start local development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run lint checks
- `npm run check:frontend` - Lint + frontend production build
- `npm run check:backend` - Backend compile check
- `npm run check:all` - Backend compile + frontend lint/build

## Backend Setup (Spring Boot + Postgres)

1. Start Postgres:

```bash
cd backend
docker compose up -d
```

2. Create backend env file:

```bash
cd backend
cp .env.example .env
```

3. Run backend:

```bash
cd backend
./mvnw spring-boot:run
```

On Windows PowerShell:

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

If Maven Wrapper is not present, use local Maven:

```bash
mvn spring-boot:run
```

Backend default URL: `http://localhost:8080`

## Backend API Endpoints

- `GET /api/projects?category=all|web|app`
- `GET /api/experiences`
- `GET /api/health`
- `POST /api/contact`

Swagger UI: `http://localhost:8080/swagger-ui/index.html`

## Production Hardening (Backend)

- Enable strict mail delivery behavior in production:
	- `SPRING_PROFILES_ACTIVE=prod`
	- `CONTACT_MAIL_ENABLED=true`
	- `CONTACT_REQUIRE_EMAIL_DELIVERY=true`
- Contact endpoint rate limiting:
	- `CONTACT_RATE_LIMIT_PER_MINUTE` (default `8` in dev, tighter in prod profile)
- Actuator health/info endpoints enabled:
	- `GET /actuator/health`
	- `GET /actuator/info`

## Smoke Testing

Manual full-stack smoke checklist:
- [SMOKE_TEST_PLAN.md](C:/Users/rspre/dev/updated_website/rspreier_web/docs/SMOKE_TEST_PLAN.md)

## Project Structure

- `src/app` - App Router pages and API routes
	- `page.jsx` - Home page
	- `about/page.jsx` - About page
	- `projects/page.jsx` - Projects page
	- `contact/page.jsx` - Contact page
- `src/components` - Reusable UI components
- `src/styles/global.css` - Global styles
- `public/img` - Static image assets
- `backend` - Spring Boot API and DB migrations

## Notes

- Frontend is ready to consume a separate backend API (`NEXT_PUBLIC_API_BASE_URL`).
- Backend seeds initial `projects` and `experiences` through Flyway migration.
- The site uses animated interactions and transitions heavily, so performance-sensitive assets (especially GIFs) should be optimized when possible.

## Deployment Runbook

- [PRODUCTION_SETUP.md](C:/Users/rspre/dev/updated_website/rspreier_web/docs/PRODUCTION_SETUP.md)

