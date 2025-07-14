# Event/Merch Microservices App

This repository contains a full-stack microservices application for event and merchandise management, deployed on AWS EKS.

## Architecture
- **Frontend:** React (Vite)
- **Backend:** Node.js microservices (auth, event, merch, order, payment, review, gateway)
- **Database:** MongoDB (with persistent storage)
- **DevOps:** Docker, Kubernetes, GitHub Actions CI/CD, AWS EKS

## Key Features
- User authentication (JWT)
- Event and merchandise management
- Order placement and tracking
- Payment processing
- Reviews
- API gateway

## Deployment
- All services are containerized and deployed via Kubernetes manifests in the `k8s/` directory.
- CI/CD pipeline builds and pushes Docker images, then deploys to EKS automatically.
- Sensitive config is managed via Kubernetes Secrets.

## Getting Started
See individual service and frontend READMEs for details.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.