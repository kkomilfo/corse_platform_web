import {createRouter, createWebHistory} from 'vue-router';
import AdminPage from '../views/AdminPage.vue';
import HomePage from "../views/HomePage.vue";
import LoginPage from "@/views/LoginPage.vue";
import TeacherPage from "@/views/TeacherPage.vue";
import {useAuthStore} from "@/store/auth.js";
import TeacherCourseOverviewPage from "@/views/TeacherCourseOverviewPage.vue";
import CourseStudents from "@/views/CourseStudents.vue";
import StudentWorkPage from "@/views/StudentWorkPage.vue";
import StudentPage from "@/views/StudentPage.vue";
import StudentCourseOverviewPage from "@/views/StudentCourseOverviewPage.vue";

const routes = [
  { path: '/', component: HomePage, meta: { requiresAuth: true }},
  { path: '/login', component: LoginPage },
  { path: '/admin', component: AdminPage, meta: { requiresAuth: true } },
  { path: '/teacher', component: TeacherPage, meta: { requiresAuth: true } },
  { path: '/teacher/course/:id', name: 'teacherCourseOverview',  component: TeacherCourseOverviewPage, meta: { requiresAuth: true } },
  { path: '/teacher/course/:id/students', name: 'teacherCourseStudents',  component: CourseStudents, meta: { requiresAuth: true } },
  { path: '/teacher/subject/:subjectID/student/:studentID', name: 'teacherStudentWork', component: StudentWorkPage, meta: { requiresAuth: true } },
  { path: '/student', component: StudentPage, meta: { requiresAuth: true } },
  { path: '/student/course/:id', name: 'studentCourseOverview', component: StudentCourseOverviewPage, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const { requiresAuth } = to.meta;
  const store = useAuthStore()

  console.log(to.path, from.path, store.isAuthenticated, store.role, store.token)
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