import axios from "axios";

const api = axios.create({
  baseURL: "https://task-management-app-64vz.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to add the token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
