import { ref as dbRef, push, update } from 'firebase/database'

export type Category = {
	limit: number
	title: string
	readonly id: string
}

export const useCategory = () => {
	const user = useCurrentUser()
	const db = useDatabase()

	const categories = useDatabaseList(() => {
		return user.value ? dbRef(db, `/users/${user.value.uid}/categories/`) : null
	}) as unknown as ComputedRef<Category[] | null>

	const getCategory = (id: string) => {
		if (!categories.value) return null
		const _id = categories.value.findIndex((val) => val.id === id)
		return _id === -1 ? null : categories.value[_id]
	}

	const createCategory = async (category: Omit<Category, 'id'>) => {
		const ref = dbRef(db, `/users/${user.value!.uid}/categories/`)
		const { key } = await push(ref, { ...category })
		return { ...category, id: key as string }
	}

	const updateCategory = async (id: string, category: Partial<Category>) => {
		const ref = dbRef(db, `/users/${user.value!.uid}/categories/${id}/`)
		await update(ref, { ...category })
	}

	return { categories, getCategory, createCategory, updateCategory }
}
