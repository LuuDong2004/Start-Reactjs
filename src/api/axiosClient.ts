import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080",
});

axiosClient.interceptors.request.use((config) => {

  const accessToken = localStorage.getItem("ACCESS_TOKEN");

  if (accessToken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export default axiosClient;