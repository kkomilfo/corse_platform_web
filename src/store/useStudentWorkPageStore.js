import {defineStore} from 'pinia';
import {ref, watch} from "vue";
import {Students} from "@/services/students.js";
import {message} from "ant-design-vue";
import {Teachers} from "@/services/teachers.js";
import {Courses} from "@/services/courses.js";
import {useAuthStore} from "@/store/auth.js";

export const useStudentWorkPageStore = defineStore('useStudentWorkPageStore', () => {
    const isLoading = ref(false);
    const subject = ref(null)
    const grades = ref([...Array(12)].map((_, i) => ({
        value: i,
    })))

    const subjectID = ref(null)
    const studentID = ref(null)

    const comment = ref({
        content: ""
    })
    const grade = ref(0)

    watch(() => grade.value, (value) => {
        if (value) {
            gradeWork(value)
        }
    })

    async function gradeWork(value) {
        const request ={
            grade: value,
            student_work_id: subject.value.student_work_id
        }
        isLoading.value = true;
        try {
            await Teachers.grade(request)
            await fetchStudentWork(subjectID.value, studentID.value)
            isLoading.value = false;
            message.success("Student work graded successfully")
        } catch (e) {
            message.error("Failed to grade student work")
            isLoading.value = false;
        }
    }

    async function fetchStudentWork(subjectid, studentid) {
        subjectID.value = subjectid
        studentID.value = studentid
        isLoading.value = true;
        try {
            subject.value = await Students.getStudentWork(subjectid, studentid)
            console.log(subject.value)
            isLoading.value = false;
        } catch (e) {
            message.error("Failed to fetch student work")
            isLoading.value = false;
        }
    }

    async function addComment() {
        try {
            await Courses.comment(subject.value.student_work_id, comment.value)
            let store = useAuthStore()
            let studentUserID = store.userID
            subject.value = await Students.getStudentWork(parseInt(subjectID.value), studentUserID)

            comment.value.content = ""

            message.success("Comment added successfully")
        } catch (e) {
            message.error("Failed to download file")
        }
    }

    return {
        subject,
        isLoading,
        fetchStudentWork,
        grades,
        addComment,
        grade,
        comment
    }
})