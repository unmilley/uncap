declare namespace NodeJS {
	export interface ProcessEnv {
		NODE_ENV: 'production' | 'development'

		NUXT_PUBLIC_FIREBASE: string
		GOOGLE_APPLICATION_CREDENTIALS: string

		NUXT_SITE_NAME: string
	}
}
