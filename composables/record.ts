import { ref as dbRef, push } from 'firebase/database'

export type RecordDB = {
	amount: number
	catId: string
	date: string
	description: string
	type: 'outcome' | 'income'
	readonly id: string
}

export const useRecord = () => {
	const user = useCurrentUser()
	const db = useDatabase()

	const records = useDatabaseList(() => {
		return user.value ? dbRef(db, `/users/${user.value.uid}/records/`) : null
	}) as unknown as ComputedRef<RecordDB[] | null>

	const getRecord = (id: string) => {
		if (!records.value) return null
		const _id = records.value.findIndex((val) => val.id === id)
		return _id === -1 ? null : records.value[_id]
	}

	const createRecord = async (record: Omit<RecordDB, 'id'>) => {
		const ref = dbRef(db, `/users/${user.value!.uid}/records/`)
		const { key } = await push(ref, { ...record })
		return { ...record, id: key as string }
	}

	return { records, getRecord, createRecord }
}
