# Auth Service

Port: 3001

## Setup

```bash
npm install
copy .env.example .env
npx prisma db push
npx prisma generate
npm run start:dev
```

Swagger: http://localhost:3001/api

## Endpoints

- POST /auth/register
- POST /auth/login
- GET /auth/profiles
