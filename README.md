# EventMerch App

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

A full-stack, microservices-based event and merchandise platform with a Netflix-inspired UI. Built with React (Vite), Node.js microservices, MongoDB, and Docker. Supports local, Docker, and cloud (AWS) deployment.

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
- DevOps ready: Docker Compose, Kubernetes, AWS S3/CloudFront/EC2, GitHub Actions

---

## Table of Contents
- [Quick Start (Docker Compose)](#quick-start-docker-compose)
- [Manual Local Setup](#manual-local-setup)
- [Seeding Data](#seeding-data)
- [Project Structure](#project-structure)
- [Backend Services](#backend-services)
- [Frontend](#frontend)
- [DevOps & Deployment](#devops--deployment)
  - [AWS S3 + CloudFront (Frontend)](#aws-s3--cloudfront-frontend)
  - [AWS EC2 (Backend)](#aws-ec2-backend)
  - [MongoDB Atlas](#mongodb-atlas)
  - [CI/CD with GitHub Actions](#cicd-with-github-actions)
- [Troubleshooting & FAQ](#troubleshooting--faq)
- [Contributing](#contributing)
- [License](#license)

---

## Quick Start (Docker Compose)

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd mercheventapp
   ```
2. **Copy `.env.example` to `.env` in each backend service and fill in secrets as needed.**
3. **Build and start all services:**
   ```sh
   docker-compose up --build
   ```
4. **Access the app:**
   - Frontend: http://localhost:5180
   - API Gateway: http://localhost:5000
   - All backend services: http://localhost:5001 - 5006
   - MongoDB: localhost:27017

---

## Manual Local Setup

1. **Install dependencies for each service:**
   ```sh
   cd backend/<service>
   npm install --legacy-peer-deps
   # Repeat for all backend services
   cd ../../frontend
   npm install
   ```
2. **Start MongoDB locally** (or use Docker Compose for MongoDB only).
3. **Start each backend service:**
   ```sh
   npm start
   ```
4. **Start the frontend:**
   ```sh
   npm run dev
   ```
5. **Access the app at** http://localhost:5180

---

## Seeding Data

- Use the provided seed scripts in each backend service to populate events and merchandise collections with sample data (including images and prices).
- See each service's README for details.

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

## Backend Services

- Each service is a standalone Node.js app with its own `package.json` and Dockerfile.
- All services connect to MongoDB (local or Atlas).
- **Review-service**: Exposes advanced review APIs, now routed via the gateway at `/api/reviews`.
- **Storage-service**: Removed (no longer part of the project).

---

## Frontend

- Built with React (Vite) and Material UI.
- Fully theme-aware (light/dark mode, neon/dark red borders, color polish).
- All item cards and login page use theme context for consistent appearance.
- Review section with avatars, edit, star, sort, and vote features.
- Material UI Skeletons for loading states.
- Robust form validation and error handling.

---

## DevOps & Deployment

- **Docker Compose**: One command to run all services locally.
- **Kubernetes**: Manifests for deploying to any K8s cluster.
- **AWS S3 + CloudFront**: For static frontend hosting.
- **AWS EC2**: For backend microservices.
- **MongoDB Atlas**: For managed database.
- **CI/CD**: GitHub Actions for automated builds and deploys.

---

## Troubleshooting & FAQ

- **404 on /api/reviews**: Ensure the gateway is running and the review-service is up. The gateway proxies all `/api/reviews` requests.
- **Theme or UI issues**: Try clearing cache or restarting the frontend. All theme logic is handled via `ThemeContext`.
- **MongoDB connection errors**: Check your `.env` files and MongoDB instance.
- **Git/GitHub issues**: Make sure your local branch is up-to-date with remote before pushing.

---

## Contributing

Pull requests and suggestions are welcome! For major changes, please open an issue first.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.