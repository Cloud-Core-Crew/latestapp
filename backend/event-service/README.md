# EventMerch - Event Service Documentation

## Overview
The Event Service is a microservice responsible for managing events within the EventMerch application. It allows users to add new events and retrieve existing ones.

## Features
- Add new events
- Retrieve a list of events
- Prometheus `/metrics` endpoint for monitoring

## Technologies Used
- Node.js
- Express
- MongoDB (via Mongoose)
- prom-client (Prometheus metrics)

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   cd EventMerch/backend/event-service
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root of the `event-service` directory and add the following variables:
   ```
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   PORT=5000
   ```

4. Start the service:
   ```
   npm start
   ```

## API Endpoints

### Add Event
- **Endpoint:** `POST /api/events`
- **Request Body:**
  ```json
  {
    "title": "Event Title",
    "date": "2023-10-01T00:00:00Z",
    "description": "Event Description"
  }
  ```
- **Response:**
  - **201 Created**: Returns the created event object.
  - **400 Bad Request**: If the request body is invalid.

### Get Events
- **Endpoint:** `GET /api/events`
- **Response:**
  - **200 OK**: Returns an array of event objects.

## Monitoring
- Prometheus scrapes `/metrics` endpoint (see k8s/event-service.yaml)
- Visualize metrics in Grafana (see main README)

## Testing
To run tests, use the following command:
```
npm test
```

## License
This project is licensed under the MIT License.