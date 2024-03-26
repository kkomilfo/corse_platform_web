<script setup>
import {useTeacherCoursesStore} from "@/store/teacher/teacherCourses.js";
import {onMounted} from "vue";

let store = useTeacherCoursesStore();

onMounted(() => store.fetchCourses());

function getInitials(fullName) {
	let nameParts = fullName.split(' ');
	return nameParts[0][0] + nameParts[nameParts.length - 1][0];
}
</script>

<template>
	<a-list
			v-if="store.courses"
			:header="`Courses (${store.courses.length})`"
			:loading="store.isLoading"
			:dataSource="store.courses"
			bordered
	>
		<template #renderItem="{ item }">
			<a-list-item :key="item.id" >
				<a-list-item-meta>
					<template #title>
						<router-link :to="{ name: 'teacherCourseOverview', params: { id: item.id } }">
							{{ item.title }}
						</router-link>
					</template>
					<template #avatar>
						<a-avatar size="large" shape="square" :src="item.image_url" />
					</template>
					<template #description>
						<a-avatar-group v-if="item.students" size="large">
							<a-avatar
									style="background-color: #3988dc"
									v-for="student in item.students"
							>
								{{ getInitials(student.full_name) }}
							</a-avatar>
						</a-avatar-group>
						<div v-else>
							No students yet
						</div>
					</template>
				</a-list-item-meta>
				{{ item.description }}
			</a-list-item>
		</template>
	</a-list>
</template>

<style scoped>

</style>