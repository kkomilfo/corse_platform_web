import api from "@/services/api.js";

export class Teachers {
    static async getTeachers() {
        let response = await api.get('/teachers', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data
    }

    static async createTeacher(teacher) {
        let response = await api.post('/teachers', teacher, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data
    }
}