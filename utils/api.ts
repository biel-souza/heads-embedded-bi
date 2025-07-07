import { getSession } from "next-auth/react";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HEADS_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar o token dinamicamente
api.interceptors.request.use(async (config) => {
  try {
    const session = await getSession();
    if (session?.jwt) {
      config.headers.Authorization = `Bearer ${session.jwt}`;
    }
  } catch (error) {
    console.log("Erro ao obter session para token:", error);
  }
  return config;
});

export default api;
