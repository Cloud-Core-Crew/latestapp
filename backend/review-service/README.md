# Review Service

Handles reviews for EventMerch.

## Endpoints
- `POST /api/reviews` — Add a review
- `GET /api/reviews` — Get all reviews
- `/metrics` — Prometheus metrics endpoint (reviews_added_total, reviews_edited_total, reviews_deleted_total)

## Env Variables
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — Secret for JWT signing
- `PORT` — Service port

## Monitoring
- Prometheus scrapes `/metrics` endpoint (see k8s/review-service.yaml)
- Visualize metrics in Grafana (see main README)
