export const links = computed(() => {
	return [
		{ title: 'Счет', path: '/', icon: 'iconoir:coins' },
		{ title: 'История', path: '/history', icon: 'bx:history' },
		{ title: 'Запись', path: '/record', icon: 'bx:plus-circle' },
		{ title: 'Планирование', path: '/planning', icon: 'fluent:clock-bill-20-filled' },
		{ title: 'Категории', path: '/categories', icon: 'bx:bxs-collection' },
	]
})
