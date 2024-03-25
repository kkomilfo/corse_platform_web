<script setup>
import {ref, watch} from "vue";
import {useRoute} from "vue-router";
import {useStudentCourseOverviewStore} from "@/store/studentCourseOverview.js";

const route = useRoute()

const teacherCourseOverviewStore = useStudentCourseOverviewStore();

watch(() => route.params.id, fetchData, { immediate: true })

async function fetchData(id) {
	await teacherCourseOverviewStore.fetchCourse(id);
}

const selectedKeys = ref();

function handleClick(e) {
	if (e.key.startsWith('subject')) {
		selectedKeys.value = [e.key];
		teacherCourseOverviewStore.selectedSubjectID = e.key.split('-')[1];
	}
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
		<a-layout-sider style="width: 256px; height: 100vh">
			<a-menu
					mode="inline"
					:items="teacherCourseOverviewStore.structure"
					:selectedKeys="selectedKeys"
					@click="handleClick"
			>
			</a-menu>
		</a-layout-sider>
		<a-layout-content v-if="teacherCourseOverviewStore.course">
			<a-page-header
					style="border: 1px solid rgb(235, 237, 240)"
					:title="teacherCourseOverviewStore.course.title"
					sub-title="Course"
			/>

			<template v-if="teacherCourseOverviewStore.selectedSubject()">
				<a-typography style="margin: 10px">
					<a-typography-title>{{ teacherCourseOverviewStore.selectedSubject().title }}</a-typography-title>
					<a-typography-paragraph>
						{{ teacherCourseOverviewStore.selectedSubject().description }}
					</a-typography-paragraph>
				</a-typography>
				<a-divider>Info</a-divider>
				<a-flex justify="space-between" align="center" style="margin: 10px">
					<a-card size="small" :title="teacherCourseOverviewStore.selectedSubject().files[0].name" style="width: 300px">
						<template #extra><a target=”_blank” :href="teacherCourseOverviewStore.selectedSubject().files[0].url">Go to file</a></template>
					</a-card>
					<a-typography-text>
						{{ isoToYYYYMMDD(teacherCourseOverviewStore.selectedSubject().due_date) }}
					</a-typography-text>
				</a-flex>

			</template>
		</a-layout-content>
	</a-layout>
</template>

<style scoped>

</style>