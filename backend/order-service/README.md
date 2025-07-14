# Order Service

Handles order placement and tracking for the Event/Merch microservices app.

## Environment Variables
- `PORT`: Service port
- `MONGO_URI`: MongoDB connection string (Kubernetes Secret)
- `JWT_SECRET`: JWT signing secret (Kubernetes Secret)

## Endpoints
- `/api/orders`
- `/api/orders/:id`

## Deployment
- Dockerized, deployed via Kubernetes manifest in `k8s/order-service.yaml`.
