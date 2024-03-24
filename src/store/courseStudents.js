import {defineStore} from 'pinia';
import {ref} from "vue";
import {Students} from "@/services/students.js";
import {message} from "ant-design-vue";

export const useCourseStudentsStore = defineStore('CourseStudentsStore', () => {
    const dataSource = ref([]);

    async function fetchCourseStudents(courseId) {
        try {
            dataSource.value = await Students.getCourseStudents(courseId);
        } catch (error) {
            message.error('Failed to fetch students')
        }
    }

    return {
        dataSource,
        fetchCourseStudents
    }
})