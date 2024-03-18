import api from "@/services/api.js";

export class Students {
    static async getStudents() {
        let response = await api.get('/students', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log(response)
        return response.data
    }
}