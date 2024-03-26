<script setup>
import {ref, watch} from "vue";
import {useRoute} from "vue-router";
import {useStudentCourseOverviewStore} from "@/store/studentCourseOverview.js";
import router from "@/router/router.js";

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
		return '-';
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

	<a-layout style="background: white" >
		<a-page-header
				:title="studentCourseOverviewStore.course.title"
				sub-title="Course"
				@back="() => router.back()"
		/>
		<a-layout>
			<a-layout-sider style="background: white">
				<a-menu
						style="height: 100vh"
						mode="inline"
						:items="studentCourseOverviewStore.structure"
						:selectedKeys="selectedKeys"
						@click="handleClick"
				>
				</a-menu>
			</a-layout-sider>
			<a-layout-content style="background: white; padding: 0 30px">
				<template v-if="studentCourseOverviewStore.subject">
					<a-float-button v-if="studentCourseOverviewStore.subject?.type == null && studentCourseOverviewStore.subject.student_files == null" description="Add" @click="uploadWork" />

					<a-typography>
						<a-typography-title>{{ studentCourseOverviewStore.subject.title }}</a-typography-title>
						<a-divider/>
						<a-typography-paragraph>
							{{ studentCourseOverviewStore.subject.description }}
						</a-typography-paragraph>
					</a-typography>
					<a-divider/>
					<a-descriptions bordered size="small">
						<a-descriptions-item label="Type">{{ studentCourseOverviewStore.subject.type ?? 'Task' }}</a-descriptions-item>
						<a-descriptions-item label="Due Date">{{ isoToYYYYMMDD(studentCourseOverviewStore.subject.due_date) }}</a-descriptions-item>
						<a-descriptions-item v-if="studentCourseOverviewStore.subject.grade" label="Grade">{{ studentCourseOverviewStore.subject.grade }}</a-descriptions-item>
						<a-descriptions-item v-if="studentCourseOverviewStore.subject?.type == null && studentCourseOverviewStore.subject.grade != null" label="Status" :span="3">
							<a-badge status="success" text="Approved" />
						</a-descriptions-item>
						<a-descriptions-item v-if="studentCourseOverviewStore.subject?.type == null && studentCourseOverviewStore.subject.student_files == null" label="Status" :span="3">
							<a-badge status="processing" text="Need to upload" />
						</a-descriptions-item>

						<a-descriptions-item v-if="studentCourseOverviewStore.subject?.type == null && studentCourseOverviewStore.subject.grade == null && studentCourseOverviewStore.subject.student_files != null" label="Status" :span="3">
							<a-badge status="processing" text="Waiting for review" />
						</a-descriptions-item>
					</a-descriptions>
					<a-divider/>
					<a-list v-if="studentCourseOverviewStore.subject.files" :data-source="studentCourseOverviewStore.subject.files">
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
					<a-row v-else :gutter="16">
						<a-col :span="12">
							<a-list :data-source="studentCourseOverviewStore.subject.task_files">
								<template #header>
									<a-typography-text>Task files</a-typography-text>
								</template>
								<template #renderItem="{ item }">
									<a-list-item>
										<a-card hoverable>
											<template #cover>
												<img alt="example"
														 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAOVBMVEXm6ezb3uGXoazq7e/Dyc/l6ey/xcyrs7vX3OCnr7jV2d6Zo63O09ibpa+5wMezusLv8fTP1NnIzdMlnmvOAAABdElEQVR4nO3Z0ZKaMBiAUUwQlsaIy/s/bAHdabXxdmn7n3PDCDeZb0JA0nUAAAAAAAAAAAAAAAAAAAAAAAAAAP+u3HT0qA6UT/3Q1J+iZslDemsIGmVJpY5NtaTl6NEdItcyt5eTnMdSY06UlD7eXMk/UvrWofwtzu+bdNGb5NPl4/VGCd4kz+tjZnq5FrxJn8pqfp4psZvkqVxvfUmabB5Naulvn78S3NsEbzKkMpYy3lvkft6PsZt03bSusfW8n8rXVPblNnqTfBkeL/JbkrJHid6k+1pe1yRp/txnSvgmD3uSnC9bFE129yTbrbRG0WTzleQepVZNfkuyR9HkOck9Svgmz0nW30uJ3uQ1iWdxI0n4Jo0k0Zu0kgRv0kwStsn23T63k4RtkmsZb+s/4euttb8zxdzfWbYvA7WO0x9qSZejR3eM3Ke0ZmnuF/cxp8m2s7MMfctyjpoEAAAAAAAAAAAAAAAAAAAAAAAAAPgPnHj1E96TDiAitj9wAAAAAElFTkSuQmCC"/>
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
						</a-col>
						<a-col :span="12">
							<a-list v-if="studentCourseOverviewStore.subject.student_files" :data-source="studentCourseOverviewStore.subject.student_files">
								<template #header>
									<a-typography-text>Student files</a-typography-text>
								</template>
								<template #renderItem="{ item }">
									<a-list-item>
										<a-card hoverable>
											<template #cover>
												<img alt="example"
														 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAOVBMVEXm6ezb3uGXoazq7e/Dyc/l6ey/xcyrs7vX3OCnr7jV2d6Zo63O09ibpa+5wMezusLv8fTP1NnIzdMlnmvOAAABdElEQVR4nO3Z0ZKaMBiAUUwQlsaIy/s/bAHdabXxdmn7n3PDCDeZb0JA0nUAAAAAAAAAAAAAAAAAAAAAAAAAAP+u3HT0qA6UT/3Q1J+iZslDemsIGmVJpY5NtaTl6NEdItcyt5eTnMdSY06UlD7eXMk/UvrWofwtzu+bdNGb5NPl4/VGCd4kz+tjZnq5FrxJn8pqfp4psZvkqVxvfUmabB5Naulvn78S3NsEbzKkMpYy3lvkft6PsZt03bSusfW8n8rXVPblNnqTfBkeL/JbkrJHid6k+1pe1yRp/txnSvgmD3uSnC9bFE129yTbrbRG0WTzleQepVZNfkuyR9HkOck9Svgmz0nW30uJ3uQ1iWdxI0n4Jo0k0Zu0kgRv0kwStsn23T63k4RtkmsZb+s/4euttb8zxdzfWbYvA7WO0x9qSZejR3eM3Ke0ZmnuF/cxp8m2s7MMfctyjpoEAAAAAAAAAAAAAAAAAAAAAAAAAPgPnHj1E96TDiAitj9wAAAAAElFTkSuQmCC"/>
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
						</a-col>
					</a-row>

				</template>
			</a-layout-content>
		</a-layout>
	</a-layout>



</template>

<style scoped>

</style>