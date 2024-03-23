<script setup>
import {reactive, ref} from 'vue';
import {useRouter} from "vue-router";
import {useAuthStore} from "@/store/auth.js";

const router = useRouter();
const store = useAuthStore();

const data = reactive([
	{ label: 'Student', value: 'student' },
	{ label: 'Teacher', value: 'teacher' },
	{ label: 'Admin', value: 'administrator' },
]);
const value = ref('student');

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

	<div class="login-container">
		<div class="login-form">
			<a-typography-title :level="3">Login</a-typography-title>
			<a-segmented block size="large" v-model:value="value" :options="data" />
			<a-form
					:model="formState"
					name="basic"
					autocomplete="off"
					layout="vertical"
					@finish="onFinish"
					class="login-form-container"
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

				<a-form-item>
					<a-button size="large" :loading="store.isLoading" block type="primary" html-type="submit">Submit</a-button>
				</a-form-item>
			</a-form>
		</div>
	</div>
</template>

<style scoped>
.login-container {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
	background-color: #f0f2f5;
}

.login-form {
	width: 40%;
	background-color: #fff;
	padding: 20px;
	border-radius: 10px;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.login-form-container {
	margin-top: 20px;
}
</style>
