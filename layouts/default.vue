<template>
	<div>
		<div
			class="grid grid-rows-[4rem_1fr_4rem] gap-x-2.5 transition-all"
			:class="isOpen ? 'grid-cols-[16rem_1fr]' : 'grid-cols-[0%_1fr]'"
		>
			<LazyAppNavbar hydrate-on-interaction="mouseover" @toggle-sidebar="changeOpen()" class="col-start-1 col-end-3" />
			<LazyAppSidebar hydrate-on-media-query="(width >= 48rem)" :isOpen />
			<main class="p-2 pr-[1.125rem] min-h-(--dvh-head) col-start-1 col-end-3 md:col-start-2">
				<slot />
			</main>
			<LazyAppFooter hydrate-on-visible class="col-start-1 col-end-3" />
		</div>
		<LazyAppDock hydrate-on-media-query="(width <= 48rem)" />
	</div>
</template>

<script lang="ts" setup>
const [isOpen, changeOpen] = useToggle(true)
</script>
