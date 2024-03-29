<script setup>
import {ref, watch} from "vue";
import {useRoute} from "vue-router";
import {useTeacherCourseOverviewStore} from "@/store/teacherCourseOverview.js";
import router from "@/router/router.js";

const route = useRoute()
const showModuleModal = ref(false);
const showSubjectModal = ref(false);
const showStudentModal = ref(false);

const teacherCourseOverviewStore = useTeacherCourseOverviewStore();

watch(() => route.params.id, fetchData, { immediate: true })

async function fetchData(id) {
	console.log("enter", id)
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
	if (e.key.startsWith('works')) {
		router.push(`/teacher/course/${route.params.id}/students`);
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

function handleAddStudentClick() {
	showStudentModal.value = true;
}

async function handleSubmit() {
	await teacherCourseOverviewStore.enroll();
	showStudentModal.value = false;
}

function isoToYYYYMMDD(isoString) {
	const date = isoString.slice(0, 10).replace(/-/g, "-");
	if (date === '0001-01-01') {
		return '-';
	} else {
		return date;
	}
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
	<a-modal v-model:open="showStudentModal" :confirm-loading="teacherCourseOverviewStore.isLoading" title="Add student at course">
		<template #footer>
		</template>
		<a-select
				mode="multiple"
				v-model:value="teacherCourseOverviewStore.selectedStudents"
				placeholder="Please select a students"
				:options="teacherCourseOverviewStore.students"
				style="width: 100%"
		>
		</a-select>

		<a-divider/>

		<a-button block :loading="teacherCourseOverviewStore.isLoading" type="primary" html-type="submit" size="large" @click="handleSubmit" >Submit</a-button>
	</a-modal>
	<a-layout style="background: white" >
			<a-page-header
					:title="teacherCourseOverviewStore.course.title"
					sub-title="Course"
					@back="() => router.push('/teacher')"
			/>
		<a-layout>
			<a-layout-sider style="background: white">
				<a-menu
						style="height: 100vh"
						mode="inline"
						:items="teacherCourseOverviewStore.structure"
						:selectedKeys="selectedKeys"
						@click="handleClick"
				>
				</a-menu>
			</a-layout-sider>
			<a-layout-content style="background: white; padding: 0px 30px">
				<template v-if="teacherCourseOverviewStore.selectedSubject()">
					<a-typography>
						<a-typography-title>{{ teacherCourseOverviewStore.selectedSubject().title }}</a-typography-title>
						<a-divider/>
						<a-typography-paragraph>
							{{ teacherCourseOverviewStore.selectedSubject().description }}
						</a-typography-paragraph>
					</a-typography>
					<a-divider/>
					<a-descriptions bordered size="small">
						<a-descriptions-item label="Type">{{ teacherCourseOverviewStore.selectedSubject().type }}</a-descriptions-item>
						<a-descriptions-item label="Due Date">{{ isoToYYYYMMDD(teacherCourseOverviewStore.selectedSubject().due_date) }}</a-descriptions-item>
					</a-descriptions>
					<a-divider/>
					<a-list :grid="{ gutter: 24, column: 4 }" :data-source="teacherCourseOverviewStore.selectedSubject().files">
						<template #renderItem="{ item }">
							<a-list-item>
								<a-card hoverable>
									<template #cover>
										<img alt="example" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAOVBMVEXm6ezb3uGXoazq7e/Dyc/l6ey/xcyrs7vX3OCnr7jV2d6Zo63O09ibpa+5wMezusLv8fTP1NnIzdMlnmvOAAABdElEQVR4nO3Z0ZKaMBiAUUwQlsaIy/s/bAHdabXxdmn7n3PDCDeZb0JA0nUAAAAAAAAAAAAAAAAAAAAAAAAAAP+u3HT0qA6UT/3Q1J+iZslDemsIGmVJpY5NtaTl6NEdItcyt5eTnMdSY06UlD7eXMk/UvrWofwtzu+bdNGb5NPl4/VGCd4kz+tjZnq5FrxJn8pqfp4psZvkqVxvfUmabB5Naulvn78S3NsEbzKkMpYy3lvkft6PsZt03bSusfW8n8rXVPblNnqTfBkeL/JbkrJHid6k+1pe1yRp/txnSvgmD3uSnC9bFE129yTbrbRG0WTzleQepVZNfkuyR9HkOck9Svgmz0nW30uJ3uQ1iWdxI0n4Jo0k0Zu0kgRv0kwStsn23T63k4RtkmsZb+s/4euttb8zxdzfWbYvA7WO0x9qSZejR3eM3Ke0ZmnuF/cxp8m2s7MMfctyjpoEAAAAAAAAAAAAAAAAAAAAAAAAAPgPnHj1E96TDiAitj9wAAAAAElFTkSuQmCC" />
									</template>
									<a-card-meta :title="item.name">
										<template #description>
											<a target="_blank" :href="item.url">Link</a>
										</template>
									</a-card-meta>
								</a-card>
							</a-list-item>
						</template>
					</a-list>
				</template>
			</a-layout-content>
		</a-layout>
	</a-layout>
	<a-float-button @click="handleAddStudentClick" />
</template>

<style scoped>

</style>