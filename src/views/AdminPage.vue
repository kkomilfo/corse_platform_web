<script setup>
import {onMounted, ref} from 'vue';
import {useTeachersStore} from "@/store/teachers.js";
import StudentsList from "@/components/StudentsList.vue";

let teachersStore = useTeachersStore();

onMounted(teachersStore.fetchTeachers);

function isoToYYYYMMDD(isoString) {
	return isoString.slice(0, 10).replace(/-/g, "-");
}

const headerStyle = {
	border: '2px solid rgb(235, 237, 240)',
	marginBottom: '10px',
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
					<a-list bordered :data-source="teachersStore.teachers" item-layout="vertical" size="middle">
						<template #header>
							<h2>Teacher List</h2>
						</template>
						<template #renderItem="{ item }">
							<a-list-item key="item.title">
								<template #actions>
									<span>id: {{ item.id }}</span>
									<span>Date of birthday: {{ isoToYYYYMMDD(item.date_of_birth) }}</span>
									a
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