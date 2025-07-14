# Gateway Service

Acts as the API gateway and reverse proxy for the Event/Merch microservices app.

## Environment Variables
- `PORT`: Service port
- Other config as needed (see `.env` and ConfigMap)

## Deployment & DevOps
- Dockerized, deployed via Kubernetes manifest in `k8s/gateway.yaml`.
- Docker image built and pushed via GitHub Actions CI/CD.
- Deployed to AWS EKS and exposed via LoadBalancer service.
- Uses Kubernetes service names for backend routing.

## Monitoring & Logging
- (Recommended) Integrate with Prometheus/Grafana and centralized logging for production.

## Notes
- Proxies requests to backend services using Kubernetes service names.

## Overview

The EventMerch gateway service is built using Node.js and Express. It serves as a single entry point for clients to interact with the different microservices, including authentication, event management, merchandise management, and storage services.

## Features

- **Routing**: The gateway routes requests to the appropriate backend services based on the API endpoints.
- **Middleware**: It can implement middleware for logging, error handling, and authentication.
- **Scalability**: The microservices architecture allows for easy scaling of individual services as needed.
- **Prometheus metrics**: Exposes `/metrics` endpoint for monitoring gateway traffic.

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd EventMerch/backend/gateway
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Environment Variables**: Create a `.env` file in the root of the gateway directory and add the necessary environment variables. Refer to the `.env.example` file for required variables.

4. **Start the service**:
   ```
   npm start
   ```

## API Endpoints

The gateway service routes requests to the following services:

- **Auth Service**: Handles user registration and login.
- **Event Service**: Manages events, including adding and retrieving events.
- **Merch Service**: Manages merchandise items.
- **Order Service**: Handles order creation and retrieval.
- **Payment Service**: Simulates payments.
- **Review Service**: Handles reviews.

## Monitoring
- Prometheus scrapes `/metrics` endpoint (see k8s/gateway.yaml)
- Visualize metrics in Grafana (see main README)

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.