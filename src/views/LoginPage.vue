<script setup>
import {reactive, ref} from 'vue';
import {useRouter} from "vue-router";
import {useAuthStore} from "@/store/auth.js";

const router = useRouter();
const store = useAuthStore();

const data = reactive(['teacher', 'administrator', 'student']);
const value = ref(data[0]);

const formState = reactive({
	email: '',
	password: '',
});

const onFinish = async values => {
	await store.login(values.email, values.password, value.value);
	if (store.isAuthenticated) {
		await router.push(`/${store.role}`);
	}
};

</script>

<template>
	<div v-if="store.isLoading">Loading...</div>
	<div v-if="store.error">{{store.error}}</div>
	<a-segmented v-model:value="value" block :options="data" />
	<a-form
			:model="formState"
			name="basic"
			:label-col="{ span: 8 }"
			:wrapper-col="{ span: 8 }"
			autocomplete="off"
			@finish="onFinish"
	>
		<a-form-item
				label="Email"
				name="email"
				:rules="[{ required: true, message: 'Please input your email!' }]"
		>
			<a-input v-model:value="formState.email"/>
		</a-form-item>

		<a-form-item
				label="Password"
				name="password"
				:rules="[{ required: true, message: 'Please input your password!' }]"
		>
			<a-input-password v-model:value="formState.password"/>
		</a-form-item>

		<a-form-item :wrapper-col="{ offset: 8, span: 16 }">
			<a-button type="primary" html-type="submit">Submit</a-button>
		</a-form-item>
	</a-form>
</template>

<style scoped>

</style>
