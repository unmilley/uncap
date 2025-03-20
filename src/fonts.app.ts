const fontHref = [
	'https://fonts.googleapis.com/css2?family=Nunito:wght@200..1000&display=swap',
	'https://fonts.googleapis.com/css2?family=Tomorrow&text=UNCAP-uncap&display=swap',
]

export const fontLinks = [
	{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
	{ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' as '' },
	...fontHref.map((href) => ({ rel: 'stylesheet', href })),
]
