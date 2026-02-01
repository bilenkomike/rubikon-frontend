import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  if (config.withAuth) {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  console.log(config);
  return config;
});

export default api;
