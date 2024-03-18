<script setup>
import { ref, onMounted } from 'vue';
import { Students } from '@/services/students.js';

const students = ref([]);
const isLoading = ref(false);

async function loadStudents() {
	isLoading.value = true;
	students.value = await Students.getStudents();
	isLoading.value = false;
}

onMounted(loadStudents);
</script>

<template>
	<div>
		<div v-if="isLoading">Loading...</div>
		<ul v-else>
			<li v-for="student in students" :key="student.id">
				<img :src="student.avatar_url" alt="Student Avatar" />
				<h2>{{ student.full_name }}</h2>
				<p>{{ student.email }}</p>
			</li>
		</ul>
	</div>
</template>

<style scoped>
</style>