<script setup>
import {useTeacherCoursesStore} from "@/store/teacherCourses.js";
import {onMounted, watchEffect} from "vue";

let store = useTeacherCoursesStore();

watchEffect(() => {
	console.log(store.courses);
});

onMounted(() => store.fetchCourses());
</script>

<template>
	<div v-if="store.isLoading">Loading...</div>
	<a-list
			v-if="store.courses"
			:header="`Courses (${store.courses.length})`"
			:loading="store.isLoading"
			:dataSource="store.courses"
			bordered
	>
		<template #renderItem="{ item }">
			<a-list-item :key="item.id" >
					<template #actions>
						<span>Students: {{ item.students == null ? 0 : item.students.count }}</span>
					</template>
					<a-list-item-meta
							:description="item.description"
					>
						<template #title>
							<router-link :to="{ name: 'teacherCourseOverview', params: { id: 1 } }">
								{{ item.title }}
							</router-link>
						</template>
						<template #avatar>
							<a-avatar :src="item.image_url" />
						</template>
					</a-list-item-meta>
			</a-list-item>
		</template>
	</a-list>
</template>

<style scoped>

</style>