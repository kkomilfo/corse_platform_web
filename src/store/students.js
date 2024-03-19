import {defineStore} from 'pinia';
import {ref} from "vue";
import {Students} from "@/services/students.js";

export const useStudentsStore = defineStore('students', () => {
    const student = ref({
        email: '',
        password: '',
        full_name: '',
        avatar_url: '',
    })
    const students = ref([])
    const isLoading = ref(false)
    const error = ref(null)

    async function fetchStudents() {
        try {
            isLoading.value = true
            students.value = await Students.getStudents()
            isLoading.value = false
        } catch (e) {
            error.value = e
            isLoading.value = false
        }
    }

    async function createStudent() {
        try {
            isLoading.value = true
            await Students.createStudent(student.value)
            await fetchStudents()
            student.value = {
                email: '',
                password: '',
                full_name: '',
                avatar_url: '',
            }
        } catch (e) {
            error.value = e
            isLoading.value = false
        }
    }

    return {student, students, isLoading, error, fetchStudents, createStudent}
})