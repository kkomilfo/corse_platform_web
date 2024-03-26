import api from "@/services/api.js";

export class Courses {
    static async createCourse(teacher) {
        let response = await api.post('/courses', teacher)
        return response.data
    }

    static async getCourse(id) {
        let response = await api.get(`/courses/${id}`)
        return response.data
    }

    static async appendModule(id, module) {
        let response = await api.post(`/courses/${id}/module`, module)
        return response.data
    }

    static async appendSubject(id, lesson) {
        let response = await api.post(`/courses/module/${id}/subject`, lesson)
        return response.data
    }

    static async enrollStudent(value, student) {
        let response = await api.post(`/courses/enroll`, {
            course_id: parseInt(value),
            student_id: student
        })
        return response.data
    }

    static async getStudentCourses() {
        let response = await api.get('/courses/student')
        return response.data
    }

    static async comment(id, comment) {
        let response = await api.post(`/comment/work/${id}`, comment)
        return response.data
    }
}