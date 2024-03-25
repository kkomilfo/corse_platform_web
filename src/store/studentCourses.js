import {defineStore} from 'pinia';
import {ref} from "vue";
import {Courses} from "@/services/courses.js";
import {message} from "ant-design-vue";

export const useStudentCoursesStore = defineStore('useStudentCoursesStore', () => {
    const courses = ref([])
    const isLoading = ref(false)

    async function fetchCourses() {
        try {
            isLoading.value = true
            courses.value = await Courses.getStudentCourses()
            isLoading.value = false
        } catch (e) {
            message.error(e.response.data)
            isLoading.value = false
        }
    }

    return {
        courses,
        isLoading,
        fetchCourses
    }
})