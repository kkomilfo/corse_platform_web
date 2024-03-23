import {defineStore} from 'pinia';
import {ref} from "vue";
import {Courses} from "@/services/courses.js";

export const useTeacherCourseOverviewStore = defineStore('teacherCoursesStore', () => {
    const course = ref({})
    const structure = ref([]);
    const isLoading = ref(false);
    const courseID = ref(null);
    const selectedSubjectID = ref(null);
    const module = ref({
        title: null,
    });
    const subject = ref({
        moduleID: null,
        title: null,
        description: null,
        type: false,
        due_date: null,
        filesURL: null,
        fileName: null,
    });

    const selectedSubject = () => {
        if (selectedSubjectID.value) {
            console.log(selectedSubjectID)
            console.log(course.value.modules.flatMap(module => module.subjects))
            const a = course.value.modules.flatMap(module => module.subjects).find(subject => subject.id == selectedSubjectID.value);
            console.log(a);
            return a
        }
        return null;
    }

    async function fetchCourse(courseId) {
        courseID.value = courseId;
        isLoading.value = true;
        course.value = await Courses.getCourse(courseId);

        console.log(course.value);
        if (!course.value.modules) {
            course.value.modules = [];
        }

        const modules = course.value.modules.map(module => {
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
                    }),
                    { type: 'divider' },
                    { label: "Add Subject", key: `addLesson-${module.id}` },
                ]
            }
        })

        structure.value = [
            ...modules,
            { type: 'divider' },
            { label: "Add module", key: "addModule" }
        ]
        isLoading.value = false;
    }

    async function createModule() {
        isLoading.value = true;
        await Courses.appendModule(courseID.value, module.value);
        await fetchCourse(courseID.value);
        module.value = {}
    }

    async function createSubject() {
        isLoading.value = true;
        let result = {
            title: subject.value.title,
            description: subject.value.description,
            type: subject.value.type ? 'Task' : 'Lecture',
            due_date: subject.value.due_date,
            files: [
                {
                    url: subject.value.filesURL,
                    name: subject.value.fileName
                }
            ]
        }
        await Courses.appendSubject(subject.value.moduleID, result);
        await fetchCourse(courseID.value);
        subject.value = {
            moduleID: null,
            title: null,
            description: null,
            type: false,
            due_date: null,
            filesURL: null,
            fileName: null,
        }
    }

    return {
        course,
        isLoading,
        fetchCourse,
        structure,
        createModule,
        module,
        subject,
        createSubject,
        selectedSubjectID,
        selectedSubject
    }
})