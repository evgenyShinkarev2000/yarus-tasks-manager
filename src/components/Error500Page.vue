<template>
	<h2>Сервис не доступен</h2>
	<h3>Попробуйте обновить страницу, зайти позже</h3>
	<h4>Вернуться назад</h4>
	<router-link :to="$route.redirectedFrom?.fullPath ?? '/'">{{ $route.redirectedFrom?.fullPath ?? 'home' }}</router-link>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Error500Page',
})
</script>