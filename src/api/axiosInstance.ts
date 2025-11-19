import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE || "https://services.preprodcxr.co/puntored/api/v1";
// Crear instancia de Axios
const axiosInstance = axios.create({
  baseURL: "https://services.preprodcxr.co/puntored/api/v1",
});

// Configurar estancia del token
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem("puntored_token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
