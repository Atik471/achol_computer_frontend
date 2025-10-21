import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || 'https://api.acholcomputer.com/api';
// const API_BASE_URL = 'http://localhost:3000/api';

const accessToken = localStorage.getItem("accessToken");

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
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + accessToken
  }
});

// Attach access token before each request
api.interceptors.request.use((config) => {
  const token = loadAccessToken();
  if (token) {
    //  config.headers["Authorization"] = `Bearer ${token}`;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      try {
        const refreshRes = await axios.get(`${API_BASE_URL}/auth/refresh`, {
          withCredentials: true
        });

        const newToken = refreshRes.data.accessToken;
        console.log("Authorized")
        err.config.headers["Authorization"] = `Bearer ${newToken}`;

        // retry original request
        return api(err.config);
      } catch (refreshErr) {
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(err);
  }
);

export default api;
