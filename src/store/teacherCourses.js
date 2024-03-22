import {defineStore} from 'pinia';
import {ref} from "vue";
import {Teachers} from "@/services/teachers.js";

export const useTeacherCoursesStore = defineStore('teacherCoursesStore', () => {
    const courses = ref([]);
    const isLoading = ref(false);

    async function fetchCourses() {
        isLoading.value = true;
        courses.value = await Teachers.teacherCourses();
        isLoading.value = false;
    }

    return {
        courses,
        isLoading,
        fetchCourses
    }
})