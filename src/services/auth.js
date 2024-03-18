import api from "@/services/api.js";

export class Auth {
    static async login(email, password, userType) {
        api.interceptors.request.use(config => {
            config.headers.Authorization = null;
            return config;
        })

        const response = await api.post(`/${userType}/login`, {
            email,
            password
        })

        let token = response.data.token

        localStorage.setItem('token', token)

        api.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        })

        return response.data;
    }
}