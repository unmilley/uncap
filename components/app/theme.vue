<template>
	<UiDropdown class="dropdown-end">
		<summary class="btn btn-ghost btn-square">
			<Icon name="bx:palette" size="1.5rem" />
		</summary>
		<ul class="menu dropdown-content z-1 w-36 p-2 shadow-sm bg-base-200 border border-base-300 rounded-box">
			<li v-for="theme in themes" :key="theme.title">
				<a
					:class="{ 'menu-active': $colorMode.preference === theme.value }"
					@click.prevent="$colorMode.preference !== theme.value && ($colorMode.preference = theme.value)"
				>
					<Icon :name="theme.icon" />
					{{ theme.title }}
				</a>
			</li>
		</ul>
	</UiDropdown>
</template>

<script lang="ts" setup>
const { $colorMode } = useNuxtApp()
type Themes = { title: string; icon: string; value: string }

const themes = computed((): Themes[] => [
	{ title: 'Темный', icon: 'bx:bxs-moon', value: 'dark' },
	{ title: 'Светлый', icon: 'bx:bxs-sun', value: 'light' },
	{ title: 'Системный', icon: 'bx:desktop', value: 'system' },
])
</script>
