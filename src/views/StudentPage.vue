<script setup>
import {ref} from "vue";
import StudentCoursesList from "@/components/StudentCoursesList.vue";

const selectedKeys = ref(['1']);
</script>

<template>
	<a-layout>
		<a-layout-header style="background: white">
			<a-menu
					v-model:selectedKeys="selectedKeys"
					mode="horizontal"
			>
				<a-menu-item key="1">Home</a-menu-item>
				<a-menu-item key="2">Grade</a-menu-item>
			</a-menu>


		</a-layout-header>
		<a-layout-content style="padding: 50px" >
			<div v-if="selectedKeys[0] === '1'">
				<StudentCoursesList />
			</div>
			<div v-else-if="selectedKeys[0] === '2'">
				B
			</div>
			<div v-else>
				<h1>404</h1>
			</div>
		</a-layout-content>
	</a-layout>
</template>

<style scoped>

</style>