# Review Service

Handles reviews for events and merchandise in the Event/Merch microservices app.

## Environment Variables
- `PORT`: Service port
- `MONGO_URI`: MongoDB connection string (Kubernetes Secret)
- `JWT_SECRET`: JWT signing secret (Kubernetes Secret)

## Endpoints
- `/api/reviews`
- `/api/reviews/:id`

## Deployment
- Dockerized, deployed via Kubernetes manifest in `k8s/review-service.yaml`.
