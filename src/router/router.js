import {createRouter, createWebHistory} from 'vue-router';
import AdminPage from '../views/AdminPage.vue';
import HomePage from "../views/HomePage.vue";
import {jwtDecode} from "jwt-decode";
import LoginPage from "@/views/LoginPage.vue";
import {useAuthStore} from "@/store/auth.js";

const routes = [
  { path: '/', component: HomePage, meta: { requiresAuth: true }},
  { path: '/login', component: LoginPage },
  { path: '/admin', component: AdminPage, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const { requiresAuth } = to.meta;
  const store = useAuthStore()

  if (requiresAuth) {
    if (!store.isAuthenticated) {
      return next({ path: "/login" });
    }

    if (to.path === '/') {
      if (!store.role) {
        return next({ path: "/login" });
      }
      return next({ path: `/${store.role}` });
    }

    return next()
  }

  next();
});

export default router;