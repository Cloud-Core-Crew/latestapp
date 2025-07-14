# Payment Service

Handles payment processing for the Event/Merch microservices app.

## Environment Variables
- `PORT`: Service port
- `MONGO_URI`: MongoDB connection string (Kubernetes Secret)
- `JWT_SECRET`: JWT signing secret (Kubernetes Secret)

## Endpoints
- `/api/payments`

## Deployment
- Dockerized, deployed via Kubernetes manifest in `k8s/payment-service.yaml`.
