<script setup>
import {useStudentCoursesStore} from "@/store/studentCourses.js";
import {onMounted} from "vue";

let store = useStudentCoursesStore();

onMounted(() => {
	store.fetchCourses();
});
</script>

<template>
	<a-list
			:data-source="store.courses"
			:loading="store.isLoading"
			item-layout="horizontal"
			bordered
			style="height: 100vh"
	>
		<template #header>
			<a-flex justify="space-between" align="center">
				<h2>Courses List</h2>
			</a-flex>
		</template>
		<template #renderItem="{ item }">
			<a-list-item>
				<a-list-item-meta
						:description="item.description"
				>
					<template #title>
						<router-link :to="{ name: 'studentCourseOverview', params: { id: item.id } }">
							{{ item.title }}
						</router-link>
					</template>
					<template #avatar>
						<a-avatar :src="item.image_url"/>
					</template>
				</a-list-item-meta>
			</a-list-item>
		</template>
	</a-list>
</template>

<style scoped>

</style>