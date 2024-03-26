import {defineStore} from 'pinia';
import {ref} from "vue";
import {Teachers} from "@/services/teachers.js";
import {message} from "ant-design-vue";

export const useTeacherCoursesStore = defineStore('teacherCoursesStore', () => {
    const courses = ref([]);
    const isLoading = ref(false);

    async function fetchCourses() {
        isLoading.value = true;
        try {
            courses.value = await Teachers.teacherCourses();
            isLoading.value = false;
        } catch (e) {
            message.error(e.response.data)
            isLoading.value = false;
        }
    }

    return {
        courses,
        isLoading,
        fetchCourses
    }
})