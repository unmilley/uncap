const getCategory = (categories: Category[], id: string): Category | null => {
	const _id = categories.findIndex((val) => val.id === id)
	return _id === -1 ? null : categories[_id]
}

export const getStats = (records: RecordDB[], categories: Category[], type: RecordDB['type']) => {
	const data = records.filter(({ type: t }) => t === type)

	const amounts = data.map(({ amount }) => amount).sort((a, b) => b - a)
	const amount = amounts.reduce((max, cur) => (max += cur), 0)
	const uniqueAmounts = [...new Set(amounts)]
	const [max = 0, secondMax = 0] = uniqueAmounts

	const categoryIds = data.reduce<Record<string, number>>((prev, { catId }) => {
		if (prev[catId]) prev[catId]++
		else prev[catId] = 1
		return prev
	}, {})
	const [maxCatId, maxRecords = 0] = Object.entries(categoryIds).reduce(
		(max, current) => (current[1] > max[1] ? current : max),
		['', 0],
	)
	const mostUsedCategory = getCategory(categories, maxCatId)

	return { max, secondMax, mostUsedCategory, maxRecords, amount }
}
