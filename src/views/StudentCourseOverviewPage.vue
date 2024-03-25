<script setup>
import {ref, watch} from "vue";
import {useRoute} from "vue-router";
import {useStudentCourseOverviewStore} from "@/store/studentCourseOverview.js";

const route = useRoute()
const showUploadWorkModal = ref(false);

const studentCourseOverviewStore = useStudentCourseOverviewStore();

watch(() => route.params.id, fetchData, { immediate: true })

async function fetchData(id) {
	await studentCourseOverviewStore.fetchCourse(id);
}

const selectedKeys = ref();

function handleClick(e) {
	if (e.key.startsWith('subject')) {
		selectedKeys.value = [e.key];
		studentCourseOverviewStore.selectedSubjectID = e.key.split('-')[1];
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

function uploadWork() {
	showUploadWorkModal.value = true;
}

async function handleOk() {
	await studentCourseOverviewStore.uploadWork();
	showUploadWorkModal.value = false;
}

</script>

<template>
	<a-modal v-model:open="showUploadWorkModal" :confirm-loading="studentCourseOverviewStore.isLoading" title="Upload a work">
		<template #footer>
		</template>
		<a-form
				:label-col="{ span: 24 }"
				:model="studentCourseOverviewStore.afile"
				:wrapper-col="{ span: 24 }"
				autocomplete="off"
				layout="vertical"
				@finish="handleOk"
		>
			<a-form-item
					:rules="[{ required: true, message: 'Please input file url!' }]"
					label="File URL"
					name="url"
			>
				<a-input v-model:value="studentCourseOverviewStore.afile.url"/>
			</a-form-item>

			<a-form-item
					:rules="[{ required: true, message: 'Please input file name' }]"
					label="File Name"
					name="name"
			>
				<a-input v-model:value="studentCourseOverviewStore.afile.name"/>
			</a-form-item>

			<a-form-item>
				<a-button block :loading="studentCourseOverviewStore.isLoading" type="primary" html-type="submit" size="large">Submit</a-button>
			</a-form-item>
		</a-form>
	</a-modal>

	<a-layout>
		<a-layout-sider style="width: 256px; height: 100vh">
			<a-menu
					mode="inline"
					:items="studentCourseOverviewStore.structure"
					:selectedKeys="selectedKeys"
					@click="handleClick"
			>
			</a-menu>
		</a-layout-sider>
		<a-layout-content v-if="studentCourseOverviewStore.course">
			<a-page-header
					style="border: 1px solid rgb(235, 237, 240)"
					:title="studentCourseOverviewStore.course.title"
					sub-title="Course"
			/>

			<template v-if="studentCourseOverviewStore.subject">
				<a-typography style="margin: 10px">
					<a-typography-title>{{ studentCourseOverviewStore.subject.title }}</a-typography-title>
					<a-typography-paragraph>
						{{ studentCourseOverviewStore.subject.description }}
					</a-typography-paragraph>
				</a-typography>
				<a-divider>Info</a-divider>
				<a-flex justify="space-between" align="center" style="margin: 10px">
					<div v-if="studentCourseOverviewStore.subject.files != null">
						<a-card size="small" :title="studentCourseOverviewStore.subject.files[0].name" style="width: 300px">
							<template #extra><a target=”_blank” :href="studentCourseOverviewStore.subject.files[0].url">Go to file</a></template>
						</a-card>
					</div>

					<div v-if="studentCourseOverviewStore.subject.task_files != null">
						<a-card size="small" :title="studentCourseOverviewStore.subject.task_files[0].name" style="width: 300px">
							<template #extra><a target=”_blank” :href="studentCourseOverviewStore.subject.task_files[0].url">Go to file</a></template>
						</a-card>
					</div>

					<div v-if="studentCourseOverviewStore.subject.student_files != null">
						<a-card size="small" :title="studentCourseOverviewStore.subject.student_files[0].name" style="width: 300px">
							<template #extra><a target=”_blank” :href="studentCourseOverviewStore.subject.student_files[0].url">Go to file</a></template>
						</a-card>
					</div>

					<a-typography-text>
						{{ isoToYYYYMMDD(studentCourseOverviewStore.subject.due_date) }}
					</a-typography-text>
					<a-typography-text>
						{{ studentCourseOverviewStore.subject.type ?? "Task" }} points
					</a-typography-text>
				</a-flex>

			</template>
		</a-layout-content>

		<a-float-button description="Add" @click="uploadWork" />
	</a-layout>
</template>

<style scoped>

</style>