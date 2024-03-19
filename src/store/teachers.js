import {defineStore} from 'pinia';
import {ref} from "vue";
import {Teachers} from "@/services/teachers.js";

export const useTeachersStore = defineStore('teachers', () => {
    const teacher = ref({
        email: '',
        password: '',
        full_name: '',
        avatar_url: '',
        education: '',
        date_of_birth: '',
        description: '',
    })
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

    async function createTeacher() {
        try {
            isLoading.value = true
            console.log(teacher.value)
            await Teachers.createTeacher(teacher.value)
            await fetchTeachers()
            teacher.value = {
                email: '',
                password: '',
                full_name: '',
                avatar_url: '',
                education: '',
                date_of_birth: '',
                description: '',
            }
        } catch (e) {
            error.value = e
            isLoading.value = false
        }
    }

    return {teacher, teachers, isLoading, error, fetchTeachers, createTeacher}
})