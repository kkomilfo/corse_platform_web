import {defineStore} from 'pinia';
import {jwtDecode} from "jwt-decode";
import {computed, ref} from "vue";
import {Auth} from "@/services/auth.js";
import {message} from "ant-design-vue"; // Assuming you're using Pinia

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('token'))
    const isLoading = ref(false)

    const isAuthenticated = computed(() => token.value !== null)
    const role = computed(() => token.value !== null ? jwtDecode(token.value).role : null)

    async function login(email, password, userType) {
        try {
            isLoading.value = true
            let response = await Auth.login(email, password, userType)
            token.value = response.token
            isLoading.value = false
        } catch (e) {
            message.error(e.response.data)
            isLoading.value = false
        }
    }

    return {token, isLoading, error, isAuthenticated, role, login}
})