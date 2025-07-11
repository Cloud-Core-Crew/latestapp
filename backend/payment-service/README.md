# Payment Service

Handles payment simulation for EventMerch.

## Endpoints
- `POST /api/payments` — Simulate a payment
- `GET /api/payments` — Get all payments
- `/metrics` — Prometheus metrics endpoint

## Env Variables
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — Secret for JWT signing
- `PORT` — Service port

## Monitoring
- Prometheus scrapes `/metrics` endpoint (see k8s/payment-service.yaml)
- Visualize metrics in Grafana (see main README)
