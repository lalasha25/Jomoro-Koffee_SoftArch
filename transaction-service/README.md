# Transaction Service

Port: 3003

## Setup

```bash
npm install
copy .env.example .env
npx prisma db push
npx prisma generate
npm run start:dev
```

Swagger: http://localhost:3003/api

## Endpoints

- GET /cart
- POST /cart
- POST /cart/:product_id/update
- POST /cart/:product_id/delete
- POST /cart/clear
- GET /orders
- POST /orders/:id
- POST /orders
- GET /profiles
