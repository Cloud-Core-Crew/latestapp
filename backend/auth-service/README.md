# EventMerch Authentication Service

## Overview
The **auth-service** is a microservice responsible for user authentication and management within the EventMerch application. It handles user registration, login, and JWT token generation and validation.

## Technologies Used
- Node.js
- Express
- MongoDB (via Mongoose)
- JWT (JSON Web Tokens)
- Bcrypt (for password hashing)
- CORS (Cross-Origin Resource Sharing)
- prom-client (Prometheus metrics)

## Prometheus Metrics
- Exposes `/metrics` endpoint for Prometheus scraping
- Custom metric: `auth_successful_logins_total` (total successful logins)

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd EventMerch/backend/auth-service
   ```

2. **Install Dependencies**
   Ensure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root of the auth-service directory and add the following variables:
   ```
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   PORT=<your_preferred_port>
   ```

4. **Run the Service**
   Start the auth service using:
   ```bash
   npm start
   ```

## API Endpoints

### User Registration
- **Endpoint:** `POST /api/users/register`
- **Description:** Registers a new user.
- **Request Body:**
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```

### User Login
- **Endpoint:** `POST /api/users/login`
- **Description:** Authenticates a user and returns a JWT token.
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

### Protected Route Example
- **Endpoint:** `GET /api/auth/protected`
- **Description:** Example of a protected route that requires a valid JWT token.

## Monitoring
- Prometheus will scrape `/metrics` by default (see k8s/auth-service.yaml for annotations)
- Visualize metrics in Grafana (see main README)

## Folder Structure
```
src/
├── controllers/       # Contains authentication logic
├── models/            # Mongoose models for user
├── routes/            # Express routes for authentication
└── middleware/        # JWT verification middleware
```

## Notes
- Ensure MongoDB is running and accessible.
- Use Postman or similar tools to test the API endpoints.
- For production, consider using HTTPS and additional security measures.