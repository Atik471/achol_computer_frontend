import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:3000/api';


export const setAccessToken = (token) => {
  localStorage.setItem("accessToken", token);
};

export const loadAccessToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken;
};

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // send refresh token cookie automatically
});

// Attach access token before each request
api.interceptors.request.use((config) => {
  const token = loadAccessToken();
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only retry once
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call refresh endpoint using refresh token cookie
        const res = await axios.get(`${API_BASE_URL}/auth/me`, {
          withCredentials: true,
        });

        const newAccessToken = res.data.accessToken;
        setAccessToken(newAccessToken);

        // Retry original request with new token
        originalRequest.headers.authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh failed", refreshError);
        // Only now redirect to login
        // window.location.href = '/auth/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
