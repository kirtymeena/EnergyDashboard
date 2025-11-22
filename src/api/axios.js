import axios from "axios";

const api = axios.create({
    baseURL: "/sems/api", // Vite proxy maps /sems -> https://vcind.in
    // timeout: 15000,
});

// Set token from localStorage automatically in request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Optional: attach response interceptor that calls a provided logout callback on 401
export function attachInterceptors({ onUnauthorized }) {
    api.interceptors.response.use(
        (res) => res,
        (error) => {
            const status = error?.response?.status;
            const data = error?.response?.data;
            if (status === 401 || (data && (data.error === "Invalid or expired token" || data.error === "Invalid or expired token"))) {
                if (typeof onUnauthorized === "function") onUnauthorized();
            }
            return Promise.reject(error);
        }
    );
}

export default api;