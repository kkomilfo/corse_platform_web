import {defineStore} from 'pinia';
import {ref} from "vue";
import {Courses} from "@/services/courses.js";

export const useCoursesStore = defineStore('courses', () => {
    const course = ref({
        title: "",
        description: "",
        image_url: "",
        teacher_id: -1
    })

    const isLoading = ref(false)
    const error = ref(null)

    async function createCourse() {
        try {
            isLoading.value = true
            await Courses.createCourse(course.value)
            course.value = {
                title: "",
                description: "",
                image_url: "",
                teacher_id: -1
            }
            isLoading.value = false
        } catch (e) {
            error.value = e
            isLoading.value = false
        }
    }

    return {
        course,
        isLoading,
        error,
        createCourse
    }
})