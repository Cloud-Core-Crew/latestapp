# EventMerch App

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

A full-stack, microservices-based event and merchandise platform with a Netflix-inspired UI. Built with React (Vite), Node.js microservices, MongoDB, Docker, Kubernetes, Prometheus, and Grafana. Supports local, Docker, and cloud (AWS) deployment.

---

## Features
- User authentication (JWT, register/login/logout)
- Browse and search live events and merchandise (dynamic, no hardcoded data)
- Add to cart, update quantities, checkout, and order tracking
- Bulk seeding for events and merchandise (with imageUrl and price)
- **Advanced review system:**
  - Add, edit, delete, and star reviews for events and merchandise
  - Sort and vote on reviews (helpful/unhelpful)
  - Review avatars and user info
- **Modern UI/UX:**
  - Responsive, theme-aware design (light/dark mode toggle)
  - Neon/dark red borders, color polish, and Material UI Skeletons for loading
  - Form validation, helper text, and error messages
  - Avatars/icons for users and reviews
- RESTful APIs for all services
- **Observability:**
  - Prometheus metrics endpoints on all backend services (`/metrics`)
  - Custom business metrics (logins, orders, reviews, etc.)
  - Grafana dashboards for business and system metrics
- DevOps ready: Docker Compose, Kubernetes, AWS S3/CloudFront/EC2, GitHub Actions

---

## Quick Start (Kubernetes)

1. **Build and push Docker images to Docker Hub:**
   - Tag images as `rajatsood1/<service>:latest` for each backend service.
   - Example:
     ```sh
     docker build -t rajatsood1/auth-service:latest ./backend/auth-service
     docker push rajatsood1/auth-service:latest
     # Repeat for all backend services
     ```
2. **Apply Kubernetes manifests:**
   ```sh
   kubectl apply -f k8s/
   ```
3. **Install Prometheus and Grafana (if not already):**
   ```sh
   helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
   helm repo update
   helm install prometheus prometheus-community/kube-prometheus-stack
   ```
4. **Access the app:**
   - Frontend: http://localhost:5180 (or NodePort/Ingress)
   - Grafana: http://localhost:3000 (use `kubectl port-forward deployment/grafana 3000:3000`)
   - Prometheus: http://localhost:9090 (use `kubectl port-forward deployment/prometheus-server 9090:9090`)

---

## Monitoring & Metrics

- All backend services expose `/metrics` endpoints for Prometheus scraping.
- Custom business metrics include:
  - `auth_successful_logins_total`
  - `orders_created_total`, `orders_cancelled_total`
  - `reviews_added_total`, `reviews_edited_total`, `reviews_deleted_total`
- Prometheus scrapes these endpoints and stores metrics.
- Grafana dashboards can be created/imported to visualize business and system metrics.

### Example: Importing a Business Metrics Dashboard
1. In Grafana, go to **+ → Import**.
2. Paste the provided dashboard JSON (see docs or ask your devops lead).
3. Select your Prometheus data source (set as default if needed).

---

## Project Structure

- `frontend/` — React (Vite) app with modern UI, theme toggle, review section, and all user features
- `backend/` — Node.js microservices:
  - `auth-service/` — User authentication (JWT)
  - `event-service/` — Event management
  - `merch-service/` — Merchandise management
  - `order-service/` — Orders and cart
  - `payment-service/` — Payment processing
  - `review-service/` — Advanced review system (edit, star, sort, vote)
  - `gateway/` — API gateway (routes all `/api/*` requests, including `/api/reviews`)
- `k8s/` — Kubernetes manifests for all services
- `docker-compose.yml` — Multi-service orchestration

---

## Troubleshooting & FAQ

- **Prometheus target DOWN or 401:** Ensure `/metrics` endpoints are accessible without auth (except order-service, which may require a token).
- **Grafana dashboard empty:** Set Prometheus as the default data source in Grafana, then re-import the dashboard.
- **Pods CrashLoopBackOff:** Check logs with `kubectl logs deployment/<service>` and ensure all required environment variables are set via ConfigMaps.
- **Node Exporter not running:** This is expected on Docker Desktop for Windows/Mac. Ignore for local dev.
- **MongoDB connection errors:** Check your `.env` files and MongoDB instance.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.