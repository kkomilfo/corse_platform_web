import api from "@/services/api.js";

export class Students {
    static async getStudents() {
        let response = await api.get('/students', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data
    }

    static async createStudent(student) {
        let response = await api.post('/students', student, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data
    }

    static async getCourseStudents(id) {
        let response = await api.get(`/courses/${id}/students`)
        return response.data
    }
}