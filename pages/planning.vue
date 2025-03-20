<template>
	<div>
		<AppTitle title="Планирование">
			<h4>{{ useCurrency(info?.bill ?? 0) }}</h4>
		</AppTitle>

		<p v-if="!modifyCategories.length" class="text-center">
			Категории отсутствуют.
			<nuxt-link to="/record" class="link link-success">Добавить.</nuxt-link>
		</p>

		<section v-else>
			<div v-for="cat in modifyCategories" :key="cat.id">
				<div :class="['w-full tooltip tooltip-bottom', [cat.tooltipColor]]" :data-tip="cat.tooltip">
					<p>
						<strong>{{ cat.title }}</strong>
						{{ useCurrency(cat.spend) }} из {{ useCurrency(cat.limit) }}
					</p>
					<progress :class="['progress w-full', [cat.progressColor]]" :value="cat.spend" :max="cat.limit" />
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

type ModifyCategories = Category & {
	spend: number
	tooltip: string
	progressColor: string
	tooltipColor: string
}
const { info } = useInfo()
const { categories } = useCategory()
const { records } = useRecord()

const modifyCategories = computed(() => {
	if (!categories.value || !records.value) return []
	return categories.value.map((cat): ModifyCategories => {
		const rec = records.value!
		const spend = rec
			.filter((rec) => rec.catId === cat.id)
			.filter((rec) => rec.type === 'outcome')
			.reduce((total, rec) => (total += rec.amount), 0)

		const percent = (100 * spend) / cat.limit
		const progressColor = percent < 60 ? 'progress-success' : percent < 100 ? 'progress-warning' : 'progress-error'
		const tooltipColor = percent < 60 ? 'tooltip-success' : percent < 100 ? 'tooltip-warning' : 'tooltip-error'
		const tooltipValue = cat.limit - spend
		const tooltip = (tooltipValue < 0 ? 'Превышение на' : 'Осталось') + ' ' + useCurrency(Math.abs(tooltipValue))
		return {
			...cat,
			spend,
			tooltip,
			progressColor,
			tooltipColor,
		}
	})
})
</script>
