<template>
	<div>
		<div class="flex justify-between items-center text-2xl">
			<h3>{{ title }}</h3>
			<slot />
		</div>
		<div class="divider divider-primary mt-2 mb-4"></div>
	</div>
</template>

<script lang="ts" setup>
defineProps<{ title: string }>()
</script>
