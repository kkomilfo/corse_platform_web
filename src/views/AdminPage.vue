<script setup>
import {onMounted} from 'vue';
import {useStudentsStore} from "@/store/students.js";
import {useTeachersStore} from "@/store/teachers.js";

let studentsStore = useStudentsStore();
let teachersStore = useTeachersStore();

onMounted(studentsStore.fetchStudents);
onMounted(teachersStore.fetchTeachers);

function isoToYYYYMMDD(isoString) {
	return isoString.slice(0, 10).replace(/-/g, "-");
}
</script>

<template>
	<a-row>
		<a-col :span="12">
			<a-form
					:label-col="{ span: 4 }"
					:model="studentsStore.student"
					:wrapper-col="{ span: 24 }"
					autocomplete="off"
					layout="vertical"
					name="basic"
					@finish="studentsStore.createStudent"
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
					<a-input-password v-model:value="studentsStore.student.avatar_url"/>
				</a-form-item>

				<a-form-item
						:rules="[{ required: true, message: 'Please input student email!' }]"
						label="Email"
						name="email"
				>
					<a-input-password v-model:value="studentsStore.student.email"/>
				</a-form-item>

				<a-form-item>
					<a-button :disabled="studentsStore.isLoading" html-type="submit" type="primary">Submit</a-button>
				</a-form-item>
			</a-form>

			<a-list
					:data-source="studentsStore.students"
					:loading="studentsStore.isLoading"
					class="demo-loadmore-list"
					item-layout="horizontal"
			>
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
		</a-col>
		<a-col :span="12">
			<a-list :data-source="teachersStore.teachers" item-layout="vertical" size="middle">
				<template #renderItem="{ item }">
					<a-list-item key="item.title">
						<template #actions>
							<span>id: {{ item.id }}</span>
							<span>Date of birthday: {{ isoToYYYYMMDD(item.date_of_birth) }}</span>

						</template>
						<a-list-item-meta :description="item.description">
							<template #title>
								<a>{{ item.full_name }}</a>
							</template>
							<template #avatar>
								<a-avatar :src="item.avatar_url" size="large"/>
							</template>
						</a-list-item-meta>
						<p>{{ item.education }}</p>

						<span v-for="{ title } in item.courses" :key="title">
							<a-tag color="blue">{{ title }}</a-tag>
						</span>

					</a-list-item>
				</template>
			</a-list>

		</a-col>
	</a-row>


</template>

<style scoped>
</style>