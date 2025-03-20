<template>
	<div class="dock dock-md md:hidden">
		<nuxt-link v-for="link in links" :key="link.path" :to="link.path" active-class="dock-active">
			<Icon :name="link.icon" class="size-[1.2em]" />
			<span class="dock-label text-center">{{ link.title }}</span>
		</nuxt-link>
	</div>
</template>

<script lang="ts" setup>
import { links } from '@/src/routing'
</script>
