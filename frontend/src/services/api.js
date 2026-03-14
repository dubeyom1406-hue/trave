import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const createBooking = (bookingData) => api.post('/bookings', bookingData);
export const getMyBookings = () => api.get('/bookings');
export const cancelBooking = (id) => api.put(`/bookings/${id}/cancel`);

// Admin
export const getAllBookings = () => api.get('/admin/bookings');
export const getAllUsers = () => api.get('/admin/users');
export const getAdminStats = () => api.get('/admin/stats');
export const updateBookingStatus = (id, status) => api.put(`/admin/bookings/${id}`, { status });

// Auth
export const loginUser = (credentials) => api.post('/auth/login', credentials);
export const registerUser = (userData) => api.post('/auth/register', userData);
export const getProfile = () => api.get('/user/profile');
export const updateProfile = (data) => api.put('/user/profile', data);

// Payments (Mocks for now or real if backend supports)
export const createRazorpayOrder = (data) => api.post('/payments/razorpay/order', data);
export const verifyRazorpayPayment = (data) => api.post('/payments/razorpay/verify', data);

// Packages
export const getPackages = () => api.get('/packages');
export const createPackage = (data) => api.post('/packages', data);
export const deletePackage = (id) => api.delete(`/packages/${id}`);

export default api;
