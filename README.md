# EventMerch App

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

A full-stack microservices-based event and merchandise platform with a Netflix-inspired UI. Built with React (Vite), Node.js microservices, MongoDB, and Docker. Supports local, Docker, and cloud (AWS) deployment.

---

## Features
- User authentication (JWT, register/login/logout)
- Browse and search live events and merchandise (no hardcoded data)
- Add to cart, update quantities, checkout, and order tracking
- Bulk seeding for events and merchandise (with imageUrl and price)
- Responsive, modern UI (dark theme, grid layout, featured items)
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
   - All backend services: http://localhost:5001 - 5007
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

Bulk seed events and merchandise with all required fields (including `imageUrl` and `price`).

- **Events:**
  ```sh
  curl -X POST http://localhost:5002/api/events/seed \
    -H "Content-Type: application/json" \
    -d '{"events": [{"name": "Cricket Match", "imageUrl": "https://...", "price": 20}, ...]}'
  ```
- **Merchandise:**
  ```sh
  curl -X POST http://localhost:5003/api/merch/seed \
    -H "Content-Type: application/json" \
    -d '{"merch": [{"name": "T-Shirt", "imageUrl": "https://...", "price": 15}, ...]}'
  ```

Or use PowerShell:
```powershell
Invoke-WebRequest -Uri http://localhost:5002/api/events/seed -Method POST -Body '{"events": [...]}' -ContentType 'application/json'
Invoke-WebRequest -Uri http://localhost:5003/api/merch/seed -Method POST -Body '{"merch": [...]}' -ContentType 'application/json'
```

---

## Project Structure
```
event-merch-app/
├── backend/
│   ├── auth-service/
│   ├── event-service/
│   ├── merch-service/
│   ├── order-service/
│   ├── payment-service/
│   ├── review-service/
│   └── storage-service/
├── frontend/  (React + Vite)
├── docker-compose.yml
├── .env.example
└── README.md
```

## Backend Services
Each service has its own README with endpoints and environment variables.
- **auth-service:** User registration/login, JWT
- **event-service:** Event CRUD, seeding
- **merch-service:** Merch CRUD, image upload, seeding
- **order-service:** Orders
- **payment-service:** Payments
- **review-service:** Reviews
- **storage-service:** AWS S3 uploads

## Frontend
- Netflix-style dark theme, carousels, and animations
- Pages: Home, Events, Merchandise, Cart, Checkout, Login
- Uses Framer Motion for smooth UI

---

## DevOps & Deployment

### AWS S3 + CloudFront (Frontend)
1. **Build the frontend:**
   ```sh
   cd frontend
   npm run build
   ```
2. **Upload `frontend/dist` to your S3 bucket.**
   - Enable static website hosting in S3.
   - Set index and error documents to `index.html`.
3. **(Optional) Set up CloudFront:**
   - Create a CloudFront distribution with your S3 bucket as the origin.
   - Set default root object to `index.html`.
   - (Optional) Add a custom domain and SSL via ACM.

### AWS EC2 (Backend)
1. **Launch an EC2 instance (Ubuntu recommended).**
2. **Install Docker and Docker Compose:**
   ```sh
   sudo apt update && sudo apt install -y docker.io docker-compose
   ```
3. **Clone your repo and set up `.env` files.**
4. **Run all backend services:**
   ```sh
   docker-compose up --build -d
   ```
5. **Open required ports in your EC2 security group (5000-5007, 27017, etc).**

### MongoDB Atlas
- Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- Update all backend `.env` files to use your Atlas connection string.

### CI/CD with GitHub Actions
- Add a `.github/workflows/deploy.yml` for automated build/test/deploy.
- Example steps:
  - Build and test frontend/backend
  - Deploy frontend to S3
  - Deploy backend to EC2 (via SSH or ECS)

---

## Troubleshooting & FAQ
- **Port already in use?** Stop other apps or change ports in `.env`/`docker-compose.yml`.
- **MongoDB connection errors?** Check your connection string and network/firewall settings.
- **CORS issues?** The gateway handles CORS; check its config if you see errors.
- **Frontend not updating?** Rebuild with `npm run build` and re-upload to S3.
- **Seeding not working?** Ensure backend services are running and use correct endpoint/payload.

---

## Contributing
- Fork the repo and create a feature branch.
- Open a pull request with a clear description.
- For major changes, open an issue first to discuss.
- Please update tests as appropriate.

---

## License
MIT