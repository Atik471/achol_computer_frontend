import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || 'https://api.acholcomputer.com/api';
// const API_BASE_URL = 'http://localhost:3000/api';

export const setAccessToken = (token) => {
  localStorage.setItem("accessToken", token);
};

export const loadAccessToken = () => {
  return localStorage.getItem("accessToken");
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
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (err.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise(async (resolve, reject) => {
        try {
          const { data } = await api.get('/auth/refresh');
          const { accessToken } = data;
          setAccessToken(accessToken);
          api.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
          originalRequest.headers['Authorization'] = 'Bearer ' + accessToken;
          processQueue(null, accessToken);
          resolve(api(originalRequest));
        } catch (refreshErr) {
          processQueue(refreshErr, null);
          // TODO: Handle logout on refresh failure
          console.error('Session expired. Please log in again.');
          reject(refreshErr);
        } finally {
          isRefreshing = false;
        }
      });
    }
    return Promise.reject(err);
  }
);

export default api;
