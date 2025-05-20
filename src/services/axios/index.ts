import Axios from "axios";
import { baseURL } from "@/utils/urls";

const axios = Axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axios;
