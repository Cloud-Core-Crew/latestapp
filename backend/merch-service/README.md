# EventMerch Merch Service Documentation

## Overview

The Merch Service is a microservice responsible for managing merchandise related to events. It allows users to add, retrieve, and manage merchandise items.

## Features

- Add new merchandise items
- Retrieve a list of merchandise items
- Integration with MongoDB for data storage
- Prometheus `/metrics` endpoint for monitoring

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd EventMerch/backend/merch-service
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root of the `merch-service` directory and add the following variables:
   ```
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   AWS_ACCESS_KEY_ID=<your_aws_access_key_id>
   AWS_SECRET_ACCESS_KEY=<your_aws_secret_access_key>
   S3_BUCKET_NAME=<your_s3_bucket_name>
   S3_REGION=<your_s3_region>
   PORT=<service_port>
   ```

4. **Start the Service**
   ```bash
   npm start
   ```

## Monitoring
- Prometheus scrapes `/metrics` endpoint (see k8s/merch-service.yaml)
- Visualize metrics in Grafana (see main README)

## API Endpoints

### Add Merchandise
- **Endpoint:** `POST /api/merch`
- **Description:** Adds a new merchandise item.
- **Request Body:**
  ```json
  {
    "name": "Merch Item Name",
    "price": 19.99,
    "imageUrl": "http://example.com/image.jpg"
  }
  ```

### Get Merchandise
- **Endpoint:** `GET /api/merch`
- **Description:** Retrieves a list of all merchandise items.

### Seed Merchandise
- **Endpoint:** `POST /api/merch/seed`
- **Description:** Seeds the database with sample merchandise items.

### Upload Image
- **Endpoint:** `POST /api/merch/upload`
- **Description:** Uploads an image to AWS S3.

## Technologies Used

- Node.js
- Express
- MongoDB (Mongoose)
- JWT for authentication
- AWS SDK for image uploads

## License

This project is licensed under the MIT License.

# Merch Service

Handles merchandise management for the Event/Merch microservices app.

## Environment Variables
- `PORT`: Service port
- `MONGO_URI`: MongoDB connection string (Kubernetes Secret)
- `JWT_SECRET`: JWT signing secret (Kubernetes Secret)

## Endpoints
- `/api/merch`
- `/api/merch/:id`

## Deployment
- Dockerized, deployed via Kubernetes manifest in `k8s/merch-service.yaml`.