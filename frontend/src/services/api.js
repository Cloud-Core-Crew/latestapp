import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Gateway service handles all API routes

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add a request interceptor to always attach token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const registerUser = async (userData) => {
  const response = await api.post('/api/auth/register', userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post('/api/auth/login', credentials); // <-- corrected
  return response.data;
};

export const fetchProfile = async () => {
  const token = localStorage.getItem('token');
  if (!token) return Promise.reject(new Error('No token found'));
  
  const response = await api.get('/api/auth/me', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const logoutUser = async () => {
  try {
    const response = await api.post('/api/auth/logout', {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Event API calls
export const fetchEvents = async () => {
  const response = await api.get('/api/events');
  return response.data;
};

export const createEvent = async (eventData) => {
  const response = await api.post('/api/events', eventData);
  return response.data;
};

// Merch API calls
export const fetchMerch = async () => {
  const response = await api.get('/api/merch');
  return response.data;
};

export const createMerch = async (merchData) => {
  const response = await api.post('/api/merch', merchData);
  return response.data;
};

// Storage API calls
export const uploadImage = async (formData) => {
  const response = await api.post('/storage/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Order API calls
export const createOrder = async (order) => {
  const token = localStorage.getItem('token');
  if (!token) return Promise.reject(new Error('No token found'));
  
  const response = await api.post('/api/orders', order, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const fetchOrders = async () => {
  const response = await api.get('/api/orders');
  return response.data;
};

export const cancelOrder = async (orderId) => {
  const response = await api.patch(`/api/orders/${orderId}/cancel`, {});
  return response.data;
};

export const fetchOrdersFiltered = async (token, status) => {
  const response = await api.get(`/api/orders${status ? `?status=${status}` : ''}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};