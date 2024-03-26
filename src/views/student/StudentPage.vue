<script setup>
import {onMounted, ref} from "vue";
import StudentCoursesList from "@/components/StudentCoursesList.vue";
import {useStudentPerformanceStore} from "@/store/studentPerfomance.js";


const store = useStudentPerformanceStore();

onMounted(() => {
	fetchData();
});

async function fetchData() {
	await store.fetchCourseStudents();
}

const columns = ref([
	{
		title: 'Title',
		dataIndex: 'subject_name',
		key: 'subject_name',
	},
	{
		title: 'Grade',
		dataIndex: 'grade',
		key: 'grade',
	},
	{
		title: 'Status',
		dataIndex: 'in_send',
		key: 'in_send',
	}
])

const selectedKey = ref('1');
</script>

<template>
	<a-page-header
			style="background-color: white;"
			title="Course Platform"
	>
		<template #footer>
			<a-tabs v-model:activeKey="selectedKey">
				<a-tab-pane key="1" tab="Home"/>
				<a-tab-pane key="2" tab="Performance"/>
			</a-tabs>
		</template>
	</a-page-header>

	<div v-if="selectedKey === '1'" style="padding: 20px">
		<StudentCoursesList />
	</div>

	<div v-if="selectedKey === '2'" style="padding: 20px">
		<a-select
				v-model:value="store.value"
				style="width: 200px"
				:options="store.options"
		></a-select>
		<a-table :dataSource="store.dataSource" :columns="columns" :pagination="false">
			<template #bodyCell="{ column, record }">
				<template v-if="column.key === 'in_send'">
					<a-badge v-if="record.in_send && record.grade" status="success" text="Approve"></a-badge>
					<a-badge v-if="record.in_send && record.grade === null" status="warning" text="Waiting"></a-badge>
					<a-badge v-if="record.in_send === false" status="error" text="Not send"></a-badge>
				</template>
			</template>
		</a-table>
	</div>
</template>

<style scoped>

</style>