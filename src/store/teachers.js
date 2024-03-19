import {defineStore} from 'pinia';
import {ref} from "vue";
import {Teachers} from "@/services/teachers.js";

export const useTeachersStore = defineStore('teachers', () => {
    const teachers = ref([])
    const isLoading = ref(false)
    const error = ref(null)

    async function fetchTeachers() {
        try {
            isLoading.value = true
            teachers.value = await Teachers.getTeachers()
            isLoading.value = false
        } catch (e) {
            error.value = e
            isLoading.value = false
        }
    }

    // async function createStudent() {
    //     try {
    //         isLoading.value = true
    //         await Students.createStudent(student.value)
    //         await fetchStudents()
    //         student.value = {
    //             email: '',
    //             password: '',
    //             full_name: '',
    //             avatar_url: '',
    //         }
    //     } catch (e) {
    //         error.value = e
    //         isLoading.value = false
    //     }
    // }

    return {teachers, isLoading, error, fetchTeachers}
})