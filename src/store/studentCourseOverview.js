import {defineStore} from 'pinia';
import {ref, watch} from "vue";
import {Courses} from "@/services/courses.js";
import {Students} from "@/services/students.js";
import {useAuthStore} from "@/store/auth.js";
import {message} from "ant-design-vue";

export const useStudentCourseOverviewStore = defineStore('useStudentCourseOverviewStore', () => {
    const course = ref({})
    const structure = ref([]);
    const isLoading = ref(false);
    const courseID = ref(null);
    const selectedSubjectID = ref(null);
    const afile = ref({
        name: null,
        url: null
    });

    const subject = ref(null)

    const selectedSubject = () => {
        if (selectedSubjectID.value) {
            return course.value.modules.flatMap(module => module.subjects).find(subject => subject.id == selectedSubjectID.value);
        }
        return null;
    }

    watch(selectedSubjectID, (newValue) => {
        let foundSubject = findSubjectByID(newValue)
        console.log("Found subject", foundSubject)
        if (foundSubject.type == 'Lecture') {
            subject.value = foundSubject
        } else {
            fetchStudentWork(newValue)
        }
    })

    function findSubjectByID(subjectID) {
        for (let module of course.value.modules) {
            for (let subject of module.subjects) {
                if (subject.id == subjectID) {
                    return subject;
                }
            }
        }
        return null;
    }

    async function fetchStudentWork(value) {
        let store = useAuthStore()
        let studentUserID = store.userID
        isLoading.value = true;
        try {
            subject.value = await Students.getStudentWork(value, studentUserID)
            console.log("loaded subject", subject)
            isLoading.value = false;
        } catch (e) {
            message.error("Failed to fetch student work")
            isLoading.value = false;
        }
    }

    async function fetchCourse(courseId) {
        courseID.value = courseId;
        isLoading.value = true;
        course.value = await Courses.getCourse(courseId);

        if (!course.value.modules) {
            course.value.modules = [];
        }

        structure.value = course.value.modules.map(module => {
            if (!module.subjects) {
                module.subjects = [];
            }
            return {
                label: module.title,
                key: module.id,
                children: [
                    ...module.subjects.map(subject => {
                        return {
                            label: subject.title,
                            key: `subject-${subject.id}`,
                        }
                    })
                ]
            }
        });

        isLoading.value = false;
    }

    async function uploadWork() {
        try {
            const request = {
                subject_id: parseInt(selectedSubjectID.value),
                files: [
                    {
                        name: afile.value.name,
                        url: afile.value.url
                    }
                ]
            }
            let store = useAuthStore()
            let studentUserID = store.userID
            isLoading.value = true;
            await Students.uploadWork(request)
            subject.value = await Students.getStudentWork(parseInt(selectedSubjectID.value), studentUserID)
            isLoading.value = false;
            message.success("Work uploaded successfully")
        } catch (e) {
            message.error("Failed to upload work")
            isLoading.value = false;
        }
    }

    return {
        course,
        isLoading,
        fetchCourse,
        structure,
        selectedSubjectID,
        selectedSubject,
        subject,
        afile,
        uploadWork
    }
})