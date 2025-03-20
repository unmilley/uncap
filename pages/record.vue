<template>
	<div>
		<AppTitle title="Новая запись" />
		<section>
			<form @submit.prevent="submit">
				<fieldset class="fieldset bg-base-200 md:max-w-md border border-base-300 p-4 rounded-box">
					<legend class="fieldset-legend">Создать</legend>

					<label class="fieldset-label">Выберите категорию</label>
					<select class="select w-full" v-model="current">
						<option v-for="cat in categories" :key="cat.id" :value="cat.id">
							{{ cat.title }}
						</option>
					</select>

					<label class="fieldset-label">Тип</label>
					<div class="filter">
						<input class="btn filter-reset" type="radio" name="type" aria-label="All" value="" v-model="type" />
						<input
							v-for="t in types"
							:key="t.value"
							:class="['btn', { 'btn-error': errors.type }]"
							type="radio"
							name="type"
							:aria-label="t.title"
							:value="t.value"
							v-model="type"
						/>
					</div>
					<span :class="['fieldset-label', { 'text-error': errors.type }]">{{ errors.type }}</span>

					<label class="fieldset-label">Сумма</label>
					<input
						type="number"
						v-model="amount"
						v-bind:amountProps
						:class="['input w-full', { 'input-error': errors.amount }]"
						placeholder="1000000"
					/>
					<span :class="['fieldset-label', { 'text-error': errors.amount }]" v-html="errors.amount"></span>

					<label class="fieldset-label">Описание</label>
					<input
						type="text"
						v-model="description"
						v-bind:descriptionProps
						:class="['input w-full', { 'input-error': errors.description }]"
						placeholder="Первоначальный взнос"
					/>
					<span :class="['fieldset-label', { 'text-error': errors.description }]">{{ errors.description }}</span>

					<div class="flex justify-between mt-4">
						<button :disabled="!meta.valid" class="btn btn-neutral w-4/5" type="submit">Создать</button>
						<div class="tooltip" data-tip="Сбросить">
							<button class="btn btn-square"><Icon name="bx:reset" size="1.3rem" @click="resetForm()" /></button>
						</div>
					</div>
				</fieldset>
			</form>
		</section>
	</div>
</template>

<script lang="ts" setup>
import { z } from 'zod'

definePageMeta({ middleware: 'auth' })
const { $toast } = useNuxtApp()

const current = ref<string | null>(null)
const category = ref<string | null>(null)

const { categories } = useCategory()
const { createRecord } = useRecord()

const { info, updateInfo } = useInfo()

const canCreateRecord = computed(
	() => !!info.value && (type.value === 'income' ? true : info.value.bill >= (amount.value ?? 0)),
)

const types = [
	{ title: 'Доход', value: 'income' },
	{ title: 'Расход', value: 'outcome' },
]

const { handleSubmit, defineField, resetForm, errors, meta } = useForm({
	validationSchema: toTypedSchema(
		z.object({
			description: z.string().min(1, 'Описание должно содержать не менее 1 символа (символов)'),
			amount: z.number({ message: 'Только число' }).min(1, 'Минимум <strong>1</strong>').default(100),
			type: z.enum(['income', 'outcome'], { message: 'Выберите тип записи' }),
		}),
	),
})

const [description, descriptionProps] = defineField('description', { validateOnBlur: true })
const [type] = defineField('type', { validateOnBlur: true })
const [amount, amountProps] = defineField('amount')

onMounted(async () => {
	if (categories.value?.length) category.value = categories.value[0].id
})

const submit = handleSubmit(async ({ description: desc, amount: am, type: t }) => {
	if (canCreateRecord.value) {
		try {
			const bill = type.value === 'income' ? info.value!.bill + am : info.value!.bill - am
			await createRecord({
				catId: category.value || '',
				amount: am,
				type: t,
				description: desc,
				date: new Date().toJSON(),
			})
			await updateInfo({ bill })
			$toast.success('Запись успешна создана')

			resetForm()
			amount.value = 100
			description.value = ''
		} catch (e) {}
	} else {
		$toast.error(`Недостаточно средств для создания записи (${am - info.value!.bill})`)
	}
})
</script>
