import {defineStore} from 'pinia';
import {ref} from "vue";
import {Courses} from "@/services/courses.js";
import {Students} from "@/services/students.js";
import {message} from "ant-design-vue";

export const useTeacherCourseOverviewStore = defineStore('teacherCourseOverview', () => {
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
    const students = ref([]);
    const selectedStudents = ref([]);

    const selectedSubject = () => {
        if (selectedSubjectID.value) {
            return course.value.modules.flatMap(module => module.subjects).find(subject => subject.id == selectedSubjectID.value);
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
            { label: "Add module", key: "addModule" },
            { type: 'divider' },
            { label: "Students", key: "works" }
        ]

        const studentsResponse = await Students.getStudents()
        students.value = studentsResponse.map(student => {
            return { value: student.id, label: student.full_name }
        })
        isLoading.value = false;
    }

    async function createModule() {
        isLoading.value = true;
        await Courses.appendModule(courseID.value, module.value);
        await fetchCourse(courseID.value);
        module.value = {}
        message.success('Module created successfully');
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
        message.success('Subject created successfully');
    }

    async function enroll() {
        isLoading.value = true;
        for (const student of selectedStudents.value) {
            await Courses.enrollStudent(courseID.value, student);
        }
        selectedStudents.value = [];
        isLoading.value = false;
        message.success('Students enrolled successfully');
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
        selectedSubject,
        students,
        selectedStudents,
        enroll
    }
})