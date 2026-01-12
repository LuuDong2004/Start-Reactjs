import axios from "axios";
import { getAuthHeader } from "../config/authConfig";

// Base URL for your Jmix backend (update this to match your Jmix server)
const JMIX_BASE_URL = process.env.VITE_JMIX_URL || "http://localhost:8080";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: JMIX_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add Bearer token to all requests
apiClient.interceptors.request.use(
  (config) => {
    const authHeader = getAuthHeader();
    if (authHeader.Authorization) {
      config.headers.Authorization = authHeader.Authorization;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors (token expired)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear token and redirect to login
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default apiClient;

// Example usage:
// import apiClient from "./api/apiClient";
// const response = await apiClient.get("/rest/entities/Mouse");
// const response = await apiClient.post("/rest/entities/Mouse", data);
// const response = await apiClient.put("/rest/entities/Mouse/123", data);
// const response = await apiClient.delete("/rest/entities/Mouse/123");

