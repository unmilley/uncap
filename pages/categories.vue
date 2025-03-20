<template>
	<div>
		<AppTitle title="Категории" />
		<section>
			<div class="flex gap-4 flex-wrap md:flex-nowrap">
				<CategoryCreate />
				<CategoryEdit v-if="categories && categories.length" :categories="categories" :key="categories.length" />
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const { categories } = useCategory()
</script>
