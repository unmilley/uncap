export default defineNuxtRouteMiddleware(async (to, from) => {
	// if (import.meta.client) {
	// 	try {
	// 		const auth = getAuth()
	// 		if (!auth.currentUser) return navigateTo('/login?message=login')
	// 	} catch (error) {
	// 		useNuxtApp().callHook('vue:setup')
	// 		return navigateTo('/login?message=login')
	// 	}
	// }
	const user = await getCurrentUser()

	// redirect the user to the login page
	if (!user) {
		return navigateTo({
			path: '/login',
			query: {
				message: 'login',
			},
		})
	}
})
