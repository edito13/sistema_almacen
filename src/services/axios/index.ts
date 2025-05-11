import Axios from "axios";
import { baseURL } from "@/utils/urls";

const axios = Axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const token = localStorage.getItem("token");

axios.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axios;
