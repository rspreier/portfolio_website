# Smoke Test Plan

Use this checklist after backend/frontend changes.

Production target stack:
- Frontend: Vercel
- Backend: AWS App Runner
- Database: Supabase Postgres

## 1. Start Services

1. Start Postgres:

```bash
cd backend
docker compose up -d
```

2. Start backend:

```bash
cd backend
mvn spring-boot:run
```

3. Start frontend:

```bash
npm run dev
```

Note:
- Local DB testing uses `backend/docker-compose.yml`.
- Production uses Supabase, not the local Postgres container.

## 2. API Health

1. Open `http://localhost:8080/api/health`
2. Expected: JSON response with `"ok"`

## 3. Content API

1. Open `http://localhost:8080/api/projects`
2. Verify at least 1 project record is returned.
3. Open `http://localhost:8080/api/experiences`
4. Verify at least 1 experience record is returned.

## 4. Frontend Integration

1. Open `http://localhost:3000/projects`
2. Verify project cards load and image scroll transitions work.
3. Open `http://localhost:3000/about`
4. Verify experience timeline renders from API data.

## 5. Contact Form

1. Open `http://localhost:3000/contact`
2. Submit a valid message.
3. Expected:
- API returns 200.
- UI shows success message.
- If email is disabled/unavailable, success message should mention message saved.

## 6. Build/Lint Gates

Run:

```bash
npm run check:all
```

Expected:
- Backend compile passes.
- Frontend lint passes.
- Frontend production build passes.

## 7. Production Smoke

1. Open frontend production URL (Vercel).
2. Verify `/about` and `/projects` load backend-backed data.
3. Submit `/contact` form and verify email delivery.
4. Check backend health endpoints:
- `https://<app-runner-url>/api/health`
- `https://<app-runner-url>/actuator/health`
5. Confirm frontend is pointing to backend API:
- `NEXT_PUBLIC_API_BASE_URL=https://<app-runner-url>`
