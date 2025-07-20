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

## DevOps & Deployment
- **Docker:** All services are containerized with multi-stage builds.
- **Kubernetes:** Manifests for all services in `k8s/` (Deployments, Services, Secrets, PVCs).
- **AWS EKS:** Cluster hosts all workloads, with persistent storage for MongoDB.
- **CI/CD:**
  - GitHub Actions workflow builds and pushes Docker images to Docker Hub on every push to `main`.
  - After a successful build, the workflow automatically applies Kubernetes manifests to EKS using AWS IAM credentials and `kubectl`.
  - Sensitive config (JWT secrets, DB URIs) is managed via Kubernetes Secrets, not in source code.
- **Access Control:**
  - EKS access is managed via the `aws-auth` ConfigMap, mapping IAM roles for GitHub Actions deployment.
- **Public Access:**
  - Frontend and gateway are exposed via Kubernetes Services of type LoadBalancer.

## GitLab CI/CD
This project now supports GitLab CI/CD for automated Docker builds and EKS deployment. See `.gitlab-ci.yml` for pipeline details. Add all required secrets in GitLab project settings under CI/CD > Variables.

## Getting Started
See individual service and frontend READMEs for details on local development, environment variables, and endpoints.

## Monitoring & Logging (Recommended Next Steps)
- Deploy Prometheus and Grafana for metrics and dashboards.
- Deploy EFK (Elasticsearch, Fluentd, Kibana) or Loki for centralized logging.
- Set up Ingress, HTTPS, and custom domains for production.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.