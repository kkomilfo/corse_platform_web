<script setup>
import {useRoute} from "vue-router";
import {watch} from "vue";

const route = useRoute()

watch(() => route.params, fetchData, { immediate: true })

function fetchData(params) {
	console.log(params)
}

</script>

<template>
<h1>Hello Work</h1>
</template>

<style scoped>

</style>