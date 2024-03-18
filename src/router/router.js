import {createRouter, createWebHistory} from 'vue-router';
import AdminPage from '../views/AdminPage.vue';
import HomePage from "../views/HomePage.vue";
import {jwtDecode} from "jwt-decode";
import LoginPage from "@/views/LoginPage.vue";

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

  if (requiresAuth) {
    const currentUser = localStorage.getItem('token');

    if (!currentUser) {
      return next({ path: "/login" });
    }

    if (to.path === '/') {
      let role = jwtDecode(currentUser).role;
      if (!role) {
        return next({ path: "/login" });
      }
      return next({ path: `/${role}` });
    }

    return next()
  }

  next();
});

export default router;