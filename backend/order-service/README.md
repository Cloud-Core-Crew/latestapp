# Order Service

Handles order creation and retrieval for EventMerch.

## Endpoints
- `POST /api/orders` — Add a new order
- `GET /api/orders` — Get all orders
- `/metrics` — Prometheus metrics endpoint (orders_created_total, orders_cancelled_total)

## Env Variables
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — Secret for JWT signing
- `PORT` — Service port

## Monitoring
- Prometheus scrapes `/metrics` endpoint (see k8s/order-service.yaml)
- Visualize metrics in Grafana (see main README)
