// app/lib/axiosServer.ts
import axios from "axios";

const axiosServer = axios.create({
  baseURL: process.env.BASE_URL,
  withCredentials: true,
});

axiosServer.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log or handle errors server-side here
    console.error("SERVER ERROR:", error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosServer;
