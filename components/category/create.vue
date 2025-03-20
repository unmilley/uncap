<template>
	<div class="w-full">
		<form @submit.prevent="submit">
			<fieldset class="fieldset bg-base-200 md:max-w-md border border-base-300 p-4 rounded-box">
				<legend class="fieldset-legend">Создать</legend>

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
					<button :disabled="!meta.valid" class="btn btn-neutral w-4/5" type="submit">Создать</button>
					<div class="tooltip" data-tip="Сбросить">
						<button class="btn btn-square"><Icon name="bx:reset" size="1.3rem" @click="resetForm()" /></button>
					</div>
				</div>
			</fieldset>
		</form>
	</div>
</template>

<script setup lang="ts">
import { z } from 'zod'

const { createCategory } = useCategory()
const { $toast } = useNuxtApp()

const { handleSubmit, defineField, resetForm, errors, meta } = useForm({
	validationSchema: toTypedSchema(
		z.object({
			title: z.string().min(1, 'Название должно содержать не менее 1 символа (символов)'),
			limit: z.number({ message: 'Только число' }).min(1, 'Минимум <strong>1</strong>').default(100),
		}),
	),
})

const [title, titleProps] = defineField('title', { validateOnBlur: true })
const [limit, limitProps] = defineField('limit')

const submit = handleSubmit(async (val) => {
	try {
		await createCategory(val)
		resetForm()
		$toast.success(`Категория "${val.title}" была создана`)
	} catch (e) {}
})
</script>
