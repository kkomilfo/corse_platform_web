import api from "@/services/api.js";

export class Courses {
    static async createCourse(teacher) {
        let response = await api.post('/courses', teacher, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data
    }
}