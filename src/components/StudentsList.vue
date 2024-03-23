<script setup>
import {onMounted, ref} from "vue";
import {useStudentsStore} from "@/store/students.js";

let studentsStore = useStudentsStore();

onMounted(studentsStore.fetchStudents);

const open = ref(false);

const showModal = () => {
	open.value = true;
};

const handleOk = async () => {
	await studentsStore.createStudent();
	open.value = false;
};
</script>

<template>
	<a-modal v-model:open="open" :confirm-loading="studentsStore.isLoading" title="Create a student">
		<template #footer>
		</template>
		<a-form
				:label-col="{ span: 24 }"
				:model="studentsStore.student"
				:wrapper-col="{ span: 24 }"
				autocomplete="off"
				layout="vertical"
				name="basic"
				@finish="handleOk"
		>
			<a-form-item
					:rules="[{ required: true, message: 'Please input student full name!' }]"
					label="Full Name"
					name="full_name"
			>
				<a-input v-model:value="studentsStore.student.full_name"/>
			</a-form-item>

			<a-form-item
					:rules="[{ required: true, message: 'Please input student password!' }]"
					label="Password"
					name="password"
			>
				<a-input-password v-model:value="studentsStore.student.password"/>
			</a-form-item>

			<a-form-item
					:rules="[{ required: true, message: 'Please input avatar url!' }]"
					label="Avatar URL"
					name="avatar_url"
			>
				<a-input v-model:value="studentsStore.student.avatar_url"/>
			</a-form-item>

			<a-form-item
					:rules="[{ required: true, message: 'Please input student email!' }]"
					label="Email"
					name="email"
			>
				<a-input v-model:value="studentsStore.student.email"/>
			</a-form-item>

			<a-form-item>
				<a-button block :loading="studentsStore.isLoading" type="primary" html-type="submit" size="large">Submit</a-button>
			</a-form-item>
		</a-form>
	</a-modal>

	<a-list
			:data-source="studentsStore.students"
			:loading="studentsStore.isLoading"
			class="demo-loadmore-list"
			item-layout="horizontal"
			bordered
			style="height: 100vh"
	>
		<template #header>
			<a-flex justify="space-between" align="center">
				<h2>Student List</h2>
				<a-button type="primary" @click="showModal">Create Student</a-button>
			</a-flex>
		</template>
		<template #renderItem="{ item }">
			<a-list-item>
				<a-list-item-meta
						:description="item.email"
				>
					<template #title>
						<a href="https://www.antdv.com/">{{ item.full_name }}</a>
					</template>
					<template #avatar>
						<a-avatar :src="item.avatar_url"/>
					</template>
				</a-list-item-meta>
			</a-list-item>
		</template>
	</a-list>
</template>

<style scoped>

</style>