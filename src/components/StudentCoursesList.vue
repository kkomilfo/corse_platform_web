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
	>
		<template #header>
			<a-flex justify="space-between" align="center">
				<h2>Courses List</h2>
			</a-flex>
		</template>
		<template #renderItem="{ item }">
			<a-list-item :key="item.id">
				<a-list-item-meta>
					<template #title>
						<router-link :to="{ name: 'studentCourseOverview', params: { id: item.id } }">
							{{ item.title }}
						</router-link>
					</template>
					<template #avatar>
						<a-avatar size="large" shape="square" :src="item.image_url"/>
					</template>
				</a-list-item-meta>
				{{ item.description }}
			</a-list-item>
		</template>
	</a-list>
</template>

<style scoped>

</style>