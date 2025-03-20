<template>
	<div>
		<AppTitle title="Профиль" />
		<section>
			<form @submit.prevent="submit">
				<fieldset class="fieldset bg-base-200 border border-base-300 p-4 md:max-w-md rounded-box">
					<legend class="fieldset-legend">Настройка</legend>

					<label class="fieldset-label">Имя</label>
					<input
						type="text"
						v-model="name"
						v-bind:nameProps
						:class="['input w-full', { 'input-error': errors.name }]"
						placeholder="Rick Sanchez"
					/>
					<span :class="['fieldset-label', { 'text-error': errors.name }]">{{ errors.name }}</span>

					<button :disabled="!meta.valid" class="btn btn-neutral mt-4" type="submit">Обновить</button>
				</fieldset>
			</form>
		</section>
	</div>
</template>

<script lang="ts" setup>
import { z } from 'zod'

definePageMeta({ middleware: 'auth' })
const { $toast } = useNuxtApp()

const { info, updateInfo } = useInfo()

const { handleSubmit, defineField, errors, meta } = useForm({
	validationSchema: toTypedSchema(
		z.object({ name: z.string().min(1, 'Имя должно содержать не менее 1 символа (символов)') }),
	),
	initialValues: { name: info.value?.name },
})
const [name, nameProps] = defineField('name', { validateOnBlur: true })

const submit = handleSubmit(async ({ name }) => {
	try {
		name !== info.value!.name && (await updateInfo({ name }))
		$toast.success('Профиль обновлен')
	} catch (e) {
		$toast.error(`Не удалось обновить профиль`)
	}
})
</script>
