import { ref as dbRef, set, update } from 'firebase/database'

export type Info = {
	name: string
	locale: 'ru-RU' | 'en-US'
	bill: number
	readonly id: string
}

export const useInfo = () => {
	const user = useCurrentUser()
	const db = useDatabase()

	const info = useDatabaseObject(() => {
		return user.value ? dbRef(db, `/users/${user.value.uid}/info/`) : null
	}) as unknown as ComputedRef<Info | null>

	const createInfo = async (info: Omit<Info, 'id'>) => {
		const ref = dbRef(db, `/users/${user.value!.uid}/info/`)
		await set(ref, { ...info })
	}

	const updateInfo = async (info: Partial<Info>) => {
		const ref = dbRef(db, `/users/${user.value!.uid}/info/`)
		await update(ref, { ...info })
	}

	return { info, createInfo, updateInfo }
}
