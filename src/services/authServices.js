import api from './api.js';

export const authService = {
  // Register user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    // console.log("Login response:", response.data);
    return response.data;
  },

  // Logout user
  logout: async () => {
    const response = await api.get('/auth/logout');
    return response.data;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Get all users (admin)
  getAllUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },

  // Update user role (admin)
  updateUserRole: async (userId, role) => {
    const response = await api.put(`/users/${userId}/role`, { role });
    return response.data;
  },

};