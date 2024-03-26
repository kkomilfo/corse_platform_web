import {defineStore} from 'pinia';
import {ref, watch} from "vue";
import {Students} from "@/services/students.js";
import {message} from "ant-design-vue";
import {useAuthStore} from "@/store/auth.js";
import {useStudentCoursesStore} from "@/store/studentCourses.js";
import {Courses} from "@/services/courses.js";

export const useStudentPerformanceStore = defineStore('useStudentPerformanceStore', () => {
    const dataSource = ref([]);
    const value = ref({});
    const options = ref([])

    watch(value,async  (newValue) => {
        await fetchCourseStudents(newValue)
    })

    async function fetchCourseStudents(courseId) {
        try {
            let temp = courseId
            if (!courseId) {
                const courses = await Courses.getStudentCourses()
                courses.map(course => {
                    options.value.push({value: course.id, label: course.name})
                })

                temp = options.value[0].value
                value.value = {
                    value: temp,
                    label: options.value[0].label
                }
            }

            let courses = await Students.getCourseStudents(temp);
            let authStore = useAuthStore();
            let studentID = authStore.userID;
            if (courses) {
                dataSource.value = courses.find(student => student.id === studentID).student_works;
            }
        } catch (error) {
            message.error(`Failed to fetch students ${error}`)
        }
    }

    return {
        dataSource,
        value,
        options,
        fetchCourseStudents
    }
})