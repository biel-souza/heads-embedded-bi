import axios from "axios";

const api_login = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HEADS_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api_login;
