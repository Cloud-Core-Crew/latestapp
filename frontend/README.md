# Frontend

React (Vite) frontend for the Event/Merch microservices app.

## Environment Variables
- See `.env` for API URLs and config (use public cloud/gateway URLs in production)

## Build & Run
- `npm install`
- `npm run dev` (local)
- Dockerized, deployed via Kubernetes manifest in `k8s/frontend.yaml`

## Deployment & DevOps
- Docker image built and pushed via GitHub Actions CI/CD.
- Deployed to AWS EKS via Kubernetes manifest.
- Publicly accessible via LoadBalancer service.

## Monitoring & Logging
- (Recommended) Integrate with Prometheus/Grafana and centralized logging for production.

# EventMerch Frontend

EventMerch is a full-stack microservices-based application designed to manage events and merchandise. This document provides an overview of the frontend setup, features, and usage.

## Technologies Used

- **React** (with Vite): Fast, modern UI development
- **Material UI**: Components, Skeletons, and icons
- **Axios**: HTTP client for API requests
- **Prometheus & Grafana**: For monitoring and dashboards

## Key Features

- **Theme toggle**: Light/dark mode with neon/dark red borders and color polish
- **Advanced review section**: Add, edit, delete, star, sort, and vote on reviews for events and merchandise
- **Avatars and icons**: User and review avatars for a modern look
- **Material UI Skeletons**: Loading states for all main pages
- **Form validation**: Helper text and error messages for all forms
- **Responsive design**: Works on all devices
- **Business metrics dashboards**: Visualize logins, orders, reviews, and more in Grafana

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd mercheventapp/frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Running the Application

- For local dev: `npm run dev`
- For Docker/Kubernetes: see main README for deployment and monitoring instructions.

### Monitoring & Dashboards

- All backend services expose `/metrics` endpoints for Prometheus.
- Grafana dashboards can be imported to visualize business metrics (see main README for JSON example).
- Access Grafana at http://localhost:3000 (port-forward if needed).

### Folder Structure

- **src/**: Main application code
  - **components/**: Navbar, ErrorBoundary, PrivateRoute, etc.
  - **pages/**: Home, Events, Merch, Login, Cart, Checkout, Profile, Orders, OrderTracking, OrderConfirmation, Review section
  - **services/**: API integration
  - **contexts/**: Theme and Auth context
  - **store/**: Redux store and slices
- **public/**: Static files (index.html)

### API Integration

The frontend communicates with backend services via the API gateway (`/api/*`). Ensure all backend services and the gateway are running for full functionality.

### Contributing

Contributions are welcome! Please open an issue or submit a pull request for improvements or features.

### License

This project is licensed under the MIT License. See the LICENSE file for details.