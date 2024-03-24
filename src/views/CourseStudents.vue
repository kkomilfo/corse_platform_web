<script setup>
import {ref, watch} from "vue";
import {useCourseStudentsStore} from "@/store/courseStudents.js";
import {useRoute} from "vue-router";

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
		title: 'Subjects',
		key: 'student_works',
	}
])

function alert(id, record) {
	console.log(id, record)
}

</script>

<template>
	<a-page-header
			style="border: 1px solid rgb(235, 237, 240)"
			title="Course students"
	/>
	<a-table :dataSource="store.dataSource" :columns="columns">
		<template #bodyCell="{ column, record }">
			<template v-if="column.key === 'student_works'">
				<a-list size="small" bordered :data-source="record.student_works">
					<template #renderItem="{ item }">
						<a-list-item v-if="item.grade" @click="alert(item.subject_id, record.id)">
							<a-tag color="blue">Subject: {{item.subject_id}}</a-tag>
							<a-tag color="success">Grade: {{item.grade}}</a-tag>
						</a-list-item>
						<a-list-item v-else  @click="alert(item.subject_id, record.id)">
							<a-tag color="blue">Subject: {{item.subject_id}}</a-tag>
							<a-tag color="warning">Waiting</a-tag>
						</a-list-item>
					</template>
				</a-list>
			</template>
		</template>
		</a-table>
</template>

<style scoped>

</style>

