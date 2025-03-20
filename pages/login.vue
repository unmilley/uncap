<template>
	<div class="hero bg-base-200 min-h-screen">
		<div class="hero-content flex-col lg:flex-row-reverse">
			<div class="text-center lg:text-left">
				<h1 class="text-5xl font-bold">Добро пожаловать!</h1>
				<p class="py-6">Пожалуйста, войдите в свою учетную запись, чтобы продолжить.</p>
			</div>

			<div class="card w-96 bg-base-100 shadow-sm">
				<div class="card-body">
					<h2 class="card-title">Авторизоваться</h2>
					<div class="mt-2 space-y-1">
						<button
							v-for="p in providers"
							:key="p.provider"
							class="btn btn-primary btn-block"
							@click="handleSighIn(p.provider)"
						>
							<Icon :name="p.icon" size="1.5rem" />
							Войти через {{ p.title }}
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
definePageMeta({ layout: 'auth' })

const { $toast } = useNuxtApp()
const route = useRoute()
const router = useRouter()

const providers = [
	{ title: 'Github', icon: 'bx:bxl-github', provider: 'github' },
	{ title: 'Google', icon: 'bx:bxl-google', provider: 'google' },
] as const

onMounted(() => {
	route.query.message && $toast(route.query.message)
})

const { handleSignWithProvider } = useAuth()
const handleSighIn = async (provider: (typeof providers)[number]['provider']) => {
	try {
		await handleSignWithProvider(provider)
		router.push('/')
	} catch (error) {
		console.log('error: ', error)
	}
}
</script>
