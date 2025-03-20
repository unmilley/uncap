<template>
	<div>
		<section v-if="record">
			<div class="flex justify-start items-center text-2xl">
				<h3><nuxt-link to="/history" class="link link-hover">История</nuxt-link></h3>
				<p class="mt-2">
					<Icon name="bx:bxs-chevron-right" />
				</p>
				<h3>{{ record.type === 'income' ? 'Доход' : 'Расход' }}</h3>
			</div>

			<div class="divider divider-primary mt-2 mb-4"></div>

			<fieldset class="fieldset bg-base-200 md:max-w-md border border-base-300 p-4 rounded-box">
				<legend class="fieldset-legend">Детали записи</legend>

				<label class="fieldset-label">Категория</label>
				<input
					type="text"
					class="input w-full pointer-events-none"
					placeholder="Категория"
					:value="record.categoryName"
				/>

				<label class="fieldset-label">Сумма</label>
				<input
					type="text"
					class="input w-full pointer-events-none"
					placeholder="Сумма"
					:value="useCurrency(record.amount)"
				/>

				<template v-if="record.description">
					<label class="fieldset-label">Описание</label>
					<textarea ref="textarea" class="textarea w-full resize-none pointer-events-none" placeholder="Описание">{{
						record.description
					}}</textarea>
				</template>

				<label class="fieldset-label">Дата</label>
				<input
					type="datetime-local"
					:value="useDateFormat(record.date, 'YYYY-MM-DDTHH:mm').value"
					class="input w-full pointer-events-none"
				/>
			</fieldset>
		</section>
	</div>
</template>

<script lang="ts" setup>
import { useRouteParams } from '@vueuse/router'

const recordId = useRouteParams('id', '', { transform: String })

const { data: record } = await useAsyncData(`history-${recordId.value}`, async () => {
	const record = useRecord().getRecord(recordId.value)
	if (!record) throw createError({ statusMessage: 'Record not found', statusCode: 404 })

	const category = useCategory().getCategory(record.catId)
	if (!category) throw createError({ statusMessage: 'Category not found', statusCode: 404 })

	return {
		...record,
		categoryName: category.title,
	}
})

const { textarea } = useTextareaAutosize()
</script>
