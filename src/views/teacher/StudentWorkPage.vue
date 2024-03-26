<script setup>
import {ref, watch} from "vue";
import {useRoute} from "vue-router";
import {useStudentWorkPageStore} from "@/store/useStudentWorkPageStore.js";
import router from "@/router/router.js";

const route = useRoute()
const showUploadWorkModal = ref(false);

const store = useStudentWorkPageStore();


watch(() => route.params, fetchData, {immediate: true})

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

async function handleSubmit() {
	await store.addComment();
}


</script>

<template>
	<a-page-header
			title="Student work"
			sub-title="Course"
			@back="() => router.back()"
	/>

	<div v-if="store.subject" style="padding: 30px">
		<a-typography>
			<a-typography-title>{{ store.subject.title }}</a-typography-title>
			<a-divider/>
			<a-typography-paragraph>
				{{ store.subject.description }}
			</a-typography-paragraph>
		</a-typography>
		<a-divider/>
		<a-descriptions bordered size="small">
			<a-descriptions-item label="Type">Task</a-descriptions-item>
			<a-descriptions-item label="Due Date">{{ isoToYYYYMMDD(store.subject.due_date) }}</a-descriptions-item>
			<a-descriptions-item label="Grade">
				<div v-if="store.subject && store.subject.grade">
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
			</a-descriptions-item>

		</a-descriptions>
		<a-divider/>
		<a-row :gutter="16">
			<a-col :span="12">
				<a-list :data-source="store.subject.task_files">
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
				<a-list :data-source="store.subject.student_files">
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

		<a-list
				v-if="store.subject.student_files"
				:data-source="store.subject.comments ?? []"
				:header="`Comments (${store.subject.comments?.length ?? 0})`"
				item-layout="horizontal"
		>
			<template #renderItem="{ item }">
				<a-list-item>
					<a-comment
							:author="item.user_type"
							:content="item.content"
					/>
				</a-list-item>
			</template>
		</a-list>
		<a-comment v-if="store.subject.student_files">
			<template #content>
				<a-form-item>
					<a-textarea v-model:value="store.comment.content" :rows="4" />
				</a-form-item>
				<a-form-item>
					<a-button html-type="submit" type="primary" @click="handleSubmit">
						Add Comment
					</a-button>
				</a-form-item>
			</template>
		</a-comment>
	</div>

</template>

<style scoped>

</style>