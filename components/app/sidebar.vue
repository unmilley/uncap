<template>
	<aside
		class="bg-base-100 sticky overflow-y-auto hidden md:flex inset-shadow-right p-2 transition-all flex-col"
		:class="{ '-translate-x-[50rem]': !isOpen }"
	>
		<ClientOnly>
			<time class="px-3 h-8">{{ date }}</time>
			<template #fallback>
				<time class="px-3 h-8">01.02.03 - 13:37:00 </time>
			</template>
		</ClientOnly>
		<ul class="menu p-0 space-y-1 w-full">
			<li v-for="link in links" :key="link.path">
				<nuxt-link :to="link.path" active-class="menu-active">
					<Icon :name="link.icon" class="size-5" />
					{{ link.title }}
				</nuxt-link>
			</li>
		</ul>
	</aside>
</template>

<script lang="ts" setup>
import { links } from '@/src/routing'
const { isOpen } = defineProps<{ isOpen: boolean }>()
const date = useDateFormat(useNow(), 'DD.MM.YY - HH:mm:ss')
</script>
