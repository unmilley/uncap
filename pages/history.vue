<template>
	<div>
		<AppTitle title="История" />
		<div class="max-w-[24rem] mx-auto">
			<Pie :options="chartOptions" :data="chartData" v-if="chartData" />
		</div>
		<p v-if="!data?.records.length" class="text-center">
			Записи отсутствуют.
			<nuxt-link to="/record" class="link link-success">Добавить.</nuxt-link>
		</p>
		<section v-else>
			<HistoryTable :records="data.records" />
		</section>
	</div>
</template>

<script lang="ts" setup>
import { ArcElement, Chart as ChartJS, Legend, Tooltip, type ChartData, type ChartOptions } from 'chart.js'
import { Pie } from 'vue-chartjs'
ChartJS.register(ArcElement, Tooltip, Legend)

definePageMeta({ middleware: 'auth' })
const { categories } = useCategory()
const { records } = useRecord()

const data = computed(() => {
	if (!categories.value || !records.value) return null

	const rec = records.value.map((record) => ({
		...record,
		id: record.id,
		categoryName: categories.value!.find((c) => c.id === record.catId)!.title,
		typeClass: record.type === 'income' ? 'badge-success' : 'badge-error',
		typeText: record.type === 'income' ? 'Доход' : 'Расход',
	}))
	return { records: rec, categories: categories.value }
})

const chartData = computed((): ChartData<'pie'> | null => {
	if (!data.value) return null
	return {
		labels: data.value.categories.map((c) => c.title),
		datasets: [
			{
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
				],
				borderWidth: 1,
				data: data.value.categories.map((c) => {
					return data.value!.records.reduce((total, rec) => {
						if (rec.catId === c.id && rec.type === 'outcome') total += +rec.amount
						return total
					}, 0)
				}),
			},
		],
	}
})

const chartOptions = ref<ChartOptions<'pie'>>({
	responsive: true,
	maintainAspectRatio: false,
})
</script>
