<script setup>
import {reactive} from 'vue';
import {Auth} from '@/services/auth.js';
import {jwtDecode} from "jwt-decode";
import {useRouter} from "vue-router";

const router = useRouter();

const formState = reactive({
	email: '',
	password: '',
});

const onFinish = async values => {
	try {
		let response = await Auth.login(values.email, values.password, "administrator");
		let token = response.token;
		let decodedToken = jwtDecode(token);
		let userRole = decodedToken.role;
		await router.push("/admin")
	} catch (e) {
	}
};
</script>

<template>
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
