import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL,
    // withCredentials: true,
});

// 🔐 Request Interceptor: Add token to headers
api.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");
            console.log('token', token);
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`; // Add the token to the header
            }
            else {
                config.headers["Authorization"] = `Bearer `;
            } // Add the token to the header
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// ❌ Response Interceptor: Handle auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            if (typeof window !== "undefined") {
                // Optionally redirect to login
                // window.location.href = "/";
            }
        }
        return Promise.reject(error);
    }
);

export default api;

if (typeof window !== "undefined") {
    const token = localStorage.getItem("token") || "";
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

