<script setup>
import {onMounted, ref} from 'vue';
import {useTeachersStore} from "@/store/teachers.js";
import StudentsList from "@/components/StudentsList.vue";
import {useCoursesStore} from "@/store/courses.js";

let teachersStore = useTeachersStore();
let coursesStore = useCoursesStore();

onMounted(teachersStore.fetchTeachers);

function isoToYYYYMMDD(isoString) {
	return isoString.slice(0, 10).replace(/-/g, "-");
}

const headerStyle = {
	border: '2px solid rgb(235, 237, 240)',
	marginBottom: '10px',
};

const open = ref(false);
const courseOpen = ref(false);

function showCourseModal(id) {
	coursesStore.course.teacher_id = id;
	courseOpen.value = true;
}

async function handleCourseOk() {
	await coursesStore.createCourse();
	courseOpen.value = false;
	await teachersStore.fetchTeachers();
}

const showModal = () => {
	console.log('showModal');
	open.value = true;
};

const handleOk = async () => {
	await teachersStore.createTeacher();
	open.value = false;
};
</script>

<template>
	<a-layout>
		<a-page-header
				:style="headerStyle"
				title="Course Platform"
				sub-title="Innovative online platform for university students and teachers"
		/>
		<a-layout-content style="margin: 5px">
			<a-row :gutter="16">
				<a-col :span="10">
					<StudentsList />
				</a-col>
				<a-col :span="14">
					<a-modal v-model:open="open" :confirm-loading="teachersStore.isLoading" title="Create a student">
						<template #footer></template>
						<a-form
								:label-col="{ span: 24 }"
								:model="teachersStore.teacher"
								:wrapper-col="{ span: 24 }"
								autocomplete="off"
								layout="vertical"
								name="basic"
								@finish="handleOk"
						>
							<a-form-item
									:rules="[{ required: true, message: 'Please input teacher full name!' }]"
									label="Full Name"
									name="full_name"
							>
								<a-input v-model:value="teachersStore.teacher.full_name"/>
							</a-form-item>

							<a-form-item
									:rules="[{ required: true, message: 'Please input teacher password!' }]"
									label="Password"
									name="password"
							>
								<a-input-password v-model:value="teachersStore.teacher.password"/>
							</a-form-item>

							<a-form-item
									:rules="[{ required: true, message: 'Please input avatar url!' }]"
									label="Avatar URL"
									name="avatar_url"
							>
								<a-input v-model:value="teachersStore.teacher.avatar_url"/>
							</a-form-item>

							<a-form-item
									:rules="[{ required: true, message: 'Please input teacher email!' }]"
									label="Email"
									name="email"
							>
								<a-input v-model:value="teachersStore.teacher.email"/>
							</a-form-item>

							<a-form-item
									:rules="[{ required: true, message: 'Please input teacher education!' }]"
									label="Education"
									name="education"
							>
								<a-input v-model:value="teachersStore.teacher.education"/>
							</a-form-item>

							<a-form-item label="Date of birthday" name="date_of_birthday">
								<a-date-picker v-model:value="teachersStore.teacher.date_of_birth"  value-format="YYYY-MM-DDTHH:mm:ss.sssZ" />
							</a-form-item>

							<a-form-item label="Description" name="description" :rules="[{ required: true, message: 'Please input data!' }]">
								<a-textarea v-model:value="teachersStore.teacher.description" />
							</a-form-item>

							<a-form-item>
								<a-button block :loading="teachersStore.isLoading" type="primary" html-type="submit" size="large">Submit</a-button>
							</a-form-item>
						</a-form>
					</a-modal>

					<a-modal v-model:open="courseOpen" :confirm-loading="coursesStore.isLoading" title="Create a course">
						<template #footer></template>
						<a-form
								:label-col="{ span: 24 }"
								:model="coursesStore.course"
								:wrapper-col="{ span: 24 }"
								autocomplete="off"
								layout="vertical"
								name="basic"
								@finish="handleCourseOk"
						>
							<a-form-item
									:rules="[{ required: true, message: 'Please enter course title' }]"
									label="Title"
									name="title"
							>
								<a-input v-model:value="coursesStore.course.title"/>
							</a-form-item>

							<a-form-item
									:rules="[{ required: true, message: 'Please enter course image url' }]"
									label="Image URL"
									name="image_url"
							>
								<a-input v-model:value="coursesStore.course.image_url"/>
							</a-form-item>

							<a-form-item
									:rules="[{ required: true, message: 'Please course description' }]"
									label="Description"
									name="description"
							>
								<a-textarea v-model:value="coursesStore.course.description"/>
							</a-form-item>

							<a-form-item>
								<a-button block :loading="coursesStore.isLoading" type="primary" html-type="submit" size="large">Submit</a-button>
							</a-form-item>
						</a-form>
					</a-modal>

					<a-list bordered :data-source="teachersStore.teachers" item-layout="vertical" size="middle">
						<template #header>
							<a-flex justify="space-between" align="center">
								<h2>Teacher List</h2>
								<a-button type="primary" @click="showModal">Create Teacher</a-button>
							</a-flex>
						</template>
						<template #renderItem="{ item }">
							<a-list-item key="item.title">
								<template #actions>
									<a-button type="primary" @click="showCourseModal(item.id)" >Append Course</a-button>
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
		</a-layout-content>
	</a-layout>

</template>

<style scoped>
</style>