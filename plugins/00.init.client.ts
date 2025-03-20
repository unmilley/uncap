import { getApp, getApps, initializeApp, type FirebaseOptions } from 'firebase/app'
import { browserPopupRedirectResolver, initializeAuth, inMemoryPersistence } from 'firebase/auth'

const authParams = ['/login', '/register']

const initializeFirebase = () => {
	if (getApps().length) return getApp()
	const { public: config } = useRuntimeConfig()

	const app = initializeApp(config.firebase as FirebaseOptions)
	initializeAuth(app, {
		persistence: inMemoryPersistence,
		popupRedirectResolver: browserPopupRedirectResolver,
	})
	return app
}

export default defineNuxtPlugin((nuxt) => {
	/* 'app:created' */
	// nuxt.hook('vue:setup', () => {
	// 	const app = initializeFirebase()
	// 	onAuthStateChanged(getAuth(app), async (user) => {
	// 		if (!authParams.includes(nuxt._route.path) && !user) {
	// 			useInfoStore().clearInfo()
	// 			return navigateTo('/login?message=login')
	// 		}
	// 		if (authParams.includes(nuxt._route.path) && user) {
	// 			return navigateTo('/')
	// 		}
	// 		user && (await useInfoStore().fetchInfo())
	// 	})
	// })
	// return { provide: { initializeFirebase } }
})
