<script setup>
import {reactive, ref, watch, watchEffect} from "vue";
import {useRoute} from "vue-router";
import {useTeacherCourseOverviewStore} from "@/store/teacherCourseOverview.js";

const route = useRoute()
const showModuleModal = ref(false);
const showSubjectModal = ref(false);
const teacherCourseOverviewStore = useTeacherCourseOverviewStore();

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
	if (e.key.startsWith('addLesson')) {
		teacherCourseOverviewStore.subject.moduleID = e.key.split('-')[1];
		showSubjectModal.value = true;
	}
	switch (e.key) {
		case 'addModule':
			showModuleModal.value = true;
			break;
	}
}

async function handleOk() {
	await teacherCourseOverviewStore.createModule();
	showModuleModal.value = false;
}

async function handleSubjectOk() {
	await teacherCourseOverviewStore.createSubject();
	showSubjectModal.value = false;
}

</script>

<template>
	<a-modal v-model:open="showModuleModal" :confirm-loading="teacherCourseOverviewStore.isLoading" title="Create a module">
		<template #footer>
		</template>
		<a-form
				:label-col="{ span: 24 }"
				:model="teacherCourseOverviewStore.module"
				:wrapper-col="{ span: 24 }"
				autocomplete="off"
				layout="vertical"
				name="basic"
				@finish="handleOk"
		>
			<a-form-item
					:rules="[{ required: true, message: 'Please input modal title!' }]"
					label="Title"
					name="title"
			>
				<a-input v-model:value="teacherCourseOverviewStore.module.title"/>
			</a-form-item>

			<a-form-item>
				<a-button block :loading="teacherCourseOverviewStore.isLoading" type="primary" html-type="submit" size="large">Submit</a-button>
			</a-form-item>
		</a-form>
	</a-modal>

	<a-modal v-model:open="showSubjectModal" :confirm-loading="teacherCourseOverviewStore.isLoading" title="Create a subject">
		<template #footer>
		</template>
		<a-form
				:label-col="{ span: 24 }"
				:model="teacherCourseOverviewStore.subject"
				:wrapper-col="{ span: 24 }"
				autocomplete="off"
				layout="vertical"
				name="basic"
				@finish="handleSubjectOk"
		>
			<a-form-item
					:rules="[{ required: true, message: 'Please input subject title!' }]"
					label="Title"
					name="title"
			>
				<a-input v-model:value="teacherCourseOverviewStore.subject.title"/>
			</a-form-item>

			<a-form-item
					:rules="[{ required: true, message: 'Please input description title!' }]"
					label="Description"
					name="description"
			>
				<a-input v-model:value="teacherCourseOverviewStore.subject.description"/>
			</a-form-item>

			<a-form-item label="Due date" name="date_of_birthday">
				<a-date-picker v-model:value="teacherCourseOverviewStore.subject.due_date"  value-format="YYYY-MM-DDTHH:mm:ss.sssZ" />
			</a-form-item>

			<a-form-item label="Is task?" name="type">
				<a-switch v-model:checked="teacherCourseOverviewStore.subject.type" />
			</a-form-item>

			<a-form-item
					:rules="[{ required: true, message: 'Please input file name title!' }]"
					label="File Name"
					name="fileName"
			>
				<a-input v-model:value="teacherCourseOverviewStore.subject.fileName"/>
			</a-form-item>

			<a-form-item
					:rules="[{ required: true, message: 'Please input file url title!' }]"
					label="File URL"
					name="filesURL"
			>
				<a-input v-model:value="teacherCourseOverviewStore.subject.filesURL"/>
			</a-form-item>


			<a-form-item>
				<a-button block :loading="teacherCourseOverviewStore.isLoading" type="primary" html-type="submit" size="large">Submit</a-button>
			</a-form-item>
		</a-form>
	</a-modal>

	<a-layout>
		<a-layout-sider style="width: 256px; height: 100vh">
			<a-menu
					id="dddddd"

					mode="inline"
					:items="teacherCourseOverviewStore.structure"
					:selectedKeys="selectedKeys"
					@click="handleClick"
			>
			</a-menu>
		</a-layout-sider>
		<a-layout-content>
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
				<a-divider>Text</a-divider>
				<a-card size="small" :title="teacherCourseOverviewStore.selectedSubject().files[0].name" style="width: 300px; margin: 10px">
					<template #extra><a target=”_blank” :href="teacherCourseOverviewStore.selectedSubject().files[0].url">Go to file</a></template>
				</a-card>
			</template>
		</a-layout-content>
	</a-layout>

</template>

<style scoped>

</style>