import { getSession } from "next-auth/react";
import axios from "axios";

const token = await getSession().then((session) => session?.jwt);

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HEADS_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

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
