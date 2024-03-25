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

    static async getStudentWork(subjectID, studentID) {
        let response = await api.get(`courses/subject/${subjectID}/student/${studentID}`)
        return response.data
    }

    static async uploadWork(request) {
        let response = await api.post(`students/work`, request)
        return response.data
    }
}