<script setup>
import {ref, watch} from "vue";
import {useCourseStudentsStore} from "@/store/courseStudents.js";
import {useRoute} from "vue-router";
import router from "@/router/router.js";

const store = useCourseStudentsStore()

const route = useRoute()

watch(() => route.params.id, fetchData, { immediate: true })

async function fetchData(id) {
	await store.fetchCourseStudents(id);
}

const columns = ref([
	{
		title: 'ID',
		dataIndex: 'id',
		key: 'id',
	},
	{
		title: 'Full Name',
		dataIndex: 'full_name',
		key: 'full_name',
	},
	{
		title: 'Student Works',
		key: 'student_works',
	}
])

function redirect(subjectID, studentID) {
	router.push({ name: 'teacherStudentWork', params: { subjectID, studentID } })
}

</script>

<template>
	<a-page-header
			title="Course students"
			@back="() => router.back()"
	/>
	<a-table :dataSource="store.dataSource" :columns="columns" :pagination="false">
		<template #bodyCell="{ column, record }">
			<template v-if="column.key === 'student_works'">
				<a-list size="small" bordered :data-source="record.student_works">
					<template #renderItem="{ item }">
						<a-list-item v-if="item.grade" @click="redirect(item.subject_id, record.id)">
							<a-tag color="blue">{{item.subject_name}}</a-tag>
							<a-tag color="success">Grade: {{item.grade}}</a-tag>
						</a-list-item>
						<a-list-item v-else  @click="redirect(item.subject_id, record.id)">
							<a-tag color="blue">{{item.subject_name}}</a-tag>
							<a-tag v-if="item.in_send" color="warning">Waiting</a-tag>
							<a-tag v-else color="red">Not Send</a-tag>
						</a-list-item>
					</template>
				</a-list>
			</template>
		</template>
		</a-table>
</template>

<style scoped>

</style>

