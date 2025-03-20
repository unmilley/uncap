<template>
	<div class="w-full">
		<form @submit.prevent="submit">
			<fieldset class="fieldset bg-base-200 md:max-w-md border border-base-300 p-4 rounded-box">
				<legend class="fieldset-legend">Редактировать</legend>

				<label class="fieldset-label">Выберите категорию</label>
				<select class="select w-full" v-model="current">
					<option v-for="cat in categories" :key="cat.id" :value="cat.id">
						{{ cat.title }}
					</option>
				</select>

				<label class="fieldset-label">Название</label>
				<input
					type="text"
					v-model="title"
					v-bind:titleProps
					:class="['input w-full', { 'input-error': errors.title }]"
					placeholder="Первоначальный взнос"
				/>
				<span :class="['fieldset-label', { 'text-error': errors.title }]">{{ errors.title }}</span>

				<label class="fieldset-label">Лимит</label>
				<input
					type="number"
					v-model="limit"
					v-bind:limitProps
					:class="['input w-full', { 'input-error': errors.limit }]"
					placeholder="1000000"
				/>
				<span :class="['fieldset-label', { 'text-error': errors.limit }]" v-html="errors.limit"></span>

				<div class="flex justify-between mt-4">
					<button :disabled="!meta.valid" class="btn btn-neutral w-4/5" type="submit">Обновить</button>
					<div class="tooltip" data-tip="Сбросить">
						<button class="btn btn-square"><Icon name="bx:reset" size="1.3rem" @click="resetForm(current)" /></button>
					</div>
				</div>
			</fieldset>
		</form>
	</div>
</template>

<script setup lang="ts">
import { z } from 'zod'

const props = defineProps<{ categories: Category[] }>()
const { updateCategory } = useCategory()
const { $toast } = useNuxtApp()

const { handleSubmit, defineField, errors, meta } = useForm({
	validationSchema: toTypedSchema(
		z.object({
			title: z.string().min(1, 'Название должно содержать не менее 1 символа (символов)'),
			limit: z.number({ message: 'Только число' }).min(1, 'Минимум <strong>1</strong>').default(100),
		}),
	),
})

const [title, titleProps] = defineField('title', { validateOnBlur: true })
const [limit, limitProps] = defineField('limit')

const current = ref<string | null>(null)

onMounted(() => {
	const { id, title: t, limit: l } = props.categories[0]
	current.value = id
	title.value = t
	limit.value = l
})

const submit = handleSubmit(async (val) => {
	try {
		await updateCategory(current.value || '', val)
		$toast.success(`Категория "${val.title}" была обновлена`)
	} catch (e) {}
})

const resetForm = (catId: string | null) => {
	const idx = props.categories.findIndex(({ id }) => id === catId)
	if (idx === -1) return
	title.value = props.categories[idx].title
	limit.value = props.categories[idx].limit
}

watch(current, resetForm)
</script>
