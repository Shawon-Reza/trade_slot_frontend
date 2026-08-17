import axios from "axios";

const clientBaseUrl = process.env.NEXT_PUBLIC_BASE_URL?.trim();

export const axiosApi = axios.create({
  baseURL: clientBaseUrl || undefined,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});


