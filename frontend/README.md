# EventMerch Frontend

EventMerch is a full-stack microservices-based application designed to manage events and merchandise. This document provides an overview of the frontend setup, features, and usage.

## Technologies Used

- **React** (with Vite): Fast, modern UI development
- **Material UI**: Components, Skeletons, and icons
- **Axios**: HTTP client for API requests

## Key Features

- **Theme toggle**: Light/dark mode with neon/dark red borders and color polish
- **Advanced review section**: Add, edit, delete, star, sort, and vote on reviews for events and merchandise
- **Avatars and icons**: User and review avatars for a modern look
- **Material UI Skeletons**: Loading states for all main pages
- **Form validation**: Helper text and error messages for all forms
- **Responsive design**: Works on all devices

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

To start the development server:

```sh
npm run dev
```

The app will be available at `http://localhost:5180` (or another port if 5180 is in use).

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