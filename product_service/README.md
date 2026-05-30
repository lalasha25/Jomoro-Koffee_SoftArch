# Product Service

Port: 3002

## Setup

```bash
npm install
copy .env.example .env
npx prisma db push
npx prisma generate
npm run start:dev
```

Swagger: http://localhost:3002/api

## Endpoints

- GET /products
- GET /products/:id
- GET /categories
- GET /categories/:categoryId/products
- POST /admin/products
- POST /admin/products/:id/update
- POST /admin/products/:id/reduce
- POST /admin/products/:id/delete