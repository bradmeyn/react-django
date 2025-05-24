// services/api.ts
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor - only handle unauthorized errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is due to an unauthorized request (401) and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token by hitting the refresh endpoint
        // The cookies will be sent automatically
        await axios.post(
          `${API_URL}/token/refresh/`,
          {},
          { withCredentials: true }
        );

        // If successful, retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login
        localStorage.removeItem("user");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
