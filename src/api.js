// src/api.js
import axios from "axios";
import { BaseUrl } from "./App";

const api = axios.create({
  baseURL: "http://192.168.100.139:3000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log(token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {   
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;