import {defineStore} from 'pinia';
import {ref, watch} from "vue";
import {Courses} from "@/services/courses.js";

export const useStudentCourseOverviewStore = defineStore('useStudentCourseOverviewStore', () => {
    const course = ref({})
    const structure = ref([]);
    const isLoading = ref(false);
    const courseID = ref(null);
    const selectedSubjectID = ref(null);

    const selectedSubject = () => {
        if (selectedSubjectID.value) {
            return course.value.modules.flatMap(module => module.subjects).find(subject => subject.id == selectedSubjectID.value);
        }
        return null;
    }

    watch(selectedSubjectID, () => {
        // fetch student works
        console.log("TEST: ", selectedSubjectID)
    })

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

    return {
        course,
        isLoading,
        fetchCourse,
        structure,
        selectedSubjectID,
        selectedSubject,
    }
})