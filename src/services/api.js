import axios from "axios";
import router from "@/router/router.js";

const api = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 1000,
});


api.interceptors.response.use(
    response => response, // Do nothing on success
    error => {
        if (error.response.status === 401) {
            router.push('/login')
        }
        return Promise.reject(error); // Reject to allow error handling in components
    }
);

export default api;