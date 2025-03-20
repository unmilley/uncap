import tailwindcss from '@tailwindcss/vite'
import { deepParseJson } from './utils/deepParseJson'

const fontHref = [
	'https://fonts.googleapis.com/css2?family=Nunito:wght@200..1000&display=swap',
	'https://fonts.googleapis.com/css2?family=Tomorrow&text=UNCAP-uncap&display=swap',
]

export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },
	modules: [
		'@nuxt/icon',
		'@vueuse/nuxt',
		'vue-sonner/nuxt',
		'@vee-validate/nuxt',
		'@nuxtjs/color-mode',
		'@nuxt/icon',
		'nuxt-vuefire',
		'@nuxtjs/seo',
	],
	css: ['~/assets/css/tailwind.css'],
	vite: { plugins: [tailwindcss() as any] },
	colorMode: {
		preference: 'system',
		fallback: 'dark',
		classSuffix: '',
		dataValue: 'theme',
		storageKey: 'theme',
		storage: 'cookie',
	},
	icon: {
		collections: ['bx'],
		mode: 'svg',
	},
	app: {
		head: {
			htmlAttrs: { dir: 'ltr', lang: 'ru' },
			titleTemplate: '%s %separator %siteName',
			link: [
				{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
				{ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' as '' },
				...fontHref.map((href) => ({ rel: 'stylesheet', href })),
				{ rel: 'icon', type: 'image/png', href: '/favicon.png' },
			],
		},
	},

	vuefire: {
		config: { ...deepParseJson(process.env.NUXT_PUBLIC_FIREBASE) },
		auth: {
			enabled: true,
			sessionCookie: false,
		},
	},
	ssr: true,
	routeRules: {
		'/login': { isr: true },
		'/detail/**': { ssr: false },
		'/categories': { ssr: false },
		'/history': { ssr: false },
		'/': { ssr: false },
		'/planning': { ssr: false },
		'/profile': { ssr: false },
		'/record': { ssr: false },
	},
	nitro: {
		preset: 'vercel',
	},
})
