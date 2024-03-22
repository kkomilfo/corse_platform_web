import api from "@/services/api.js";

export class Teachers {
    static async getTeachers() {
        let response = await api.get('/teachers')
        return response.data
    }

    static async createTeacher(teacher) {
        let response = await api.post('/teachers', teacher)
        return response.data
    }

    static async teacherCourses() {
        let response = await api.get('/courses/teacher')
        return response.data
    }
}