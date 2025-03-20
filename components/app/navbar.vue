<template>
	<header
		class="bg-base-100/90 text-base-content sticky top-0 z-30 flex h-16 w-full [transform:translate3d(0,0,0)] justify-center backdrop-blur transition-shadow duration-100 print:hidden shadow-xs inset-shadow-down"
	>
		<div class="navbar w-full">
			<div class="flex-none">
				<span class="tooltip tooltip-bottom before:text-xs" data-tip="Меню">
					<button
						aria-label="Open menu"
						class="btn btn-square btn-ghost hidden md:inline-flex"
						@click="$emit('toggleSidebar')"
					>
						<Icon name="bx:menu" class="size-6 md:size-7" />
					</button>
				</span>
			</div>
			<div class="flex-1">
				<nuxt-link to="/" class="btn btn-ghost text-2xl font-normal font-logo">unCAP</nuxt-link>
			</div>
			<div class="flex-none md:space-x-1">
				<AppTheme />
				<UiDropdown class="dropdown-end" v-if="info">
					<summary class="btn m-1">{{ info.name }}</summary>
					<ul class="menu dropdown-content z-1 w-52 p-2 shadow-sm bg-base-200 border border-base-300 rounded-box">
						<li><nuxt-link to="/profile">Профиль</nuxt-link></li>
						<li><a @click.prevent="logout()">Выйти</a></li>
					</ul>
				</UiDropdown>
			</div>
		</div>
	</header>
</template>

<script lang="ts" setup>
const router = useRouter()
const { info } = useInfo()
const auth = useAuth()

defineEmits<{ toggleSidebar: [] }>()

const logout = async () => {
	await auth.logout()
	router.push('/login?message=logout')
}
</script>
