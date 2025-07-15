import axios from 'axios';

const API_URL = 'http://aa7d1147bffc04d10a0296b0cd446657-1900129153.us-east-1.elb.amazonaws.com:5000'; // Gateway service handles all API routes

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

// Review API calls
export const fetchReviews = async (itemId, type, sort = 'newest', filter = {}) => {
  // type: 'event' or 'merch', itemId: eventId or merchId
  // sort: 'newest', 'oldest', 'highest', 'lowest', 'mostUpvoted'
  // filter: { minRating, userId, ... }
  let query = `/api/reviews?type=${type}&itemId=${itemId}&sort=${sort}`;
  if (filter.minRating) query += `&minRating=${filter.minRating}`;
  if (filter.userId) query += `&userId=${filter.userId}`;
  const response = await api.get(query);
  return response.data;
};

export const createReview = async (reviewData) => {
  // reviewData: { itemId, type, rating, comment }
  const token = localStorage.getItem('token');
  if (!token) return Promise.reject(new Error('No token found'));
  const response = await api.post('/api/reviews', reviewData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const editReview = async (reviewId, reviewData) => {
  // reviewData: { rating, comment }
  const token = localStorage.getItem('token');
  if (!token) return Promise.reject(new Error('No token found'));
  const response = await api.put(`/api/reviews/${reviewId}`, reviewData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const deleteReview = async (reviewId) => {
  const token = localStorage.getItem('token');
  if (!token) return Promise.reject(new Error('No token found'));
  const response = await api.delete(`/api/reviews/${reviewId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const upvoteReview = async (reviewId) => {
  const token = localStorage.getItem('token');
  if (!token) return Promise.reject(new Error('No token found'));
  const response = await api.post(`/api/reviews/${reviewId}/upvote`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const downvoteReview = async (reviewId) => {
  const token = localStorage.getItem('token');
  if (!token) return Promise.reject(new Error('No token found'));
  const response = await api.post(`/api/reviews/${reviewId}/downvote`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};