<script setup>
import {ref, watch} from "vue";
import {useRoute} from "vue-router";
import {useStudentWorkPageStore} from "@/store/useStudentWorkPageStore.js";

const route = useRoute()
const showUploadWorkModal = ref(false);

const store = useStudentWorkPageStore();


watch(() => route.params, fetchData, { immediate: true })

function fetchData(params) {
	store.fetchStudentWork(params.subjectID, params.studentID);
}


function isoToYYYYMMDD(isoString) {
	const date = isoString.slice(0, 10).replace(/-/g, "-");
	if (date === '0001-01-01') {
		return '';
	} else {
		return date;
	}
}


</script>

<template>
	<a-layout>
		<a-layout-content v-if="store.subject">
			<template v-if="store.subject">
				<a-typography style="margin: 10px">
					<a-typography-title>{{ store.subject.title }}</a-typography-title>
					<a-typography-paragraph>
						{{ store.subject.description }}
					</a-typography-paragraph>
				</a-typography>
				<a-divider>Info</a-divider>
				<a-flex justify="space-between" align="center" style="margin: 10px">
					<div v-if="store.subject.task_files != null">
						<a-card size="small" :title="store.subject.task_files[0].name" style="width: 300px">
							<template #extra><a target=”_blank” :href="store.subject.task_files[0].url">Go to file</a></template>
						</a-card>
					</div>

					<div v-if="store.subject.student_files != null">
						<a-card size="small" :title="store.subject.student_files[0].name" style="width: 300px">
							<template #extra><a target=”_blank” :href="store.subject.student_files[0].url">Go to file</a></template>
						</a-card>
					</div>

					<a-typography-text>
						{{ isoToYYYYMMDD(store.subject.due_date) }}
					</a-typography-text>
					<a-typography-text>
						{{ store.subject.type ?? "Task" }} points
					</a-typography-text>


					<div v-if="store.subject.grade">
						<a-typography-text>
							{{ store.subject.grade }} points
						</a-typography-text>
					</div>
					<div v-else>
						<a-select
								v-model:value="store.grade"
								:options="store.grades"
								placeholder="Please select"
								style="width: 200px"
						></a-select>
					</div>
				</a-flex>

			</template>
		</a-layout-content>
	</a-layout>
</template>

<style scoped>

</style>