<script setup>
import {ref} from "vue";
import TeacherCoursesList from "@/components/teacher/TeacherCoursesList.vue";

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
			</a-tabs>
		</template>
	</a-page-header>

	<div v-if="selectedKey === '1'" style="padding: 20px">
		<TeacherCoursesList />
	</div>
</template>

<style scoped>

</style>