# Smoke Test Plan

Use this checklist after backend/frontend changes.

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
