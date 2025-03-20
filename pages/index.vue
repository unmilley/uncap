<template>
	<div>
		<AppTitle :title="`Приветствуем, ${info?.name ?? 'unknown'}`" />

		<div class="stats bg-base-200 border border-base-300">
			<div class="stat">
				<div class="stat-title">Счет</div>
				<div class="stat-value text-2xl leading-normal">{{ currency }}</div>
			</div>
		</div>
		<div class="card bg-base-100 card-sm shadow-sm">
			<div class="card-body max-w-3xl px-0">
				<h2 class="card-title ml-2">Доходы</h2>
				<div class="stats stats-vertical md:stats-horizontal bg-base-200 border border-base-300" v-if="incomes">
					<div class="stat">
						<div class="stat-title">Всего</div>
						<div class="stat-value text-2xl leading-normal" v-if="incomes.amount">
							{{ useCurrency(incomes.amount) }}
						</div>
						<div class="stat-value text-2xl leading-normal" v-else>Отсутствует</div>
						<div class="stat-desc" v-if="incomes.max && incomes.secondMax">
							Это на {{ useCurrency(incomes.max - incomes.secondMax) }} больше
						</div>
						<div class="stat-actions" :class="{ 'mt-1': incomes.secondMax }">
							<nuxt-link to="/record" class="btn btn-success btn-xs">Добавить запись</nuxt-link>
						</div>
					</div>
					<div class="stat">
						<div class="stat-title">Максимальный</div>
						<div class="stat-value text-2xl leading-normal" v-if="incomes.max">{{ useCurrency(incomes.max) }}</div>
						<div class="stat-value text-2xl leading-normal" v-else>Отсутствует</div>
						<div class="stat-desc" v-if="incomes.max && incomes.secondMax">
							Это на {{ useCurrency(incomes.max - incomes.secondMax) }} больше
						</div>
						<div class="stat-actions"></div>
					</div>
					<div class="stat">
						<div class="stat-title">Больше всего записей</div>
						<div class="stat-value text-2xl leading-normal" v-if="incomes.mostUsedCategory">
							{{ incomes.mostUsedCategory.title }}
						</div>
						<div class="stat-value text-2xl leading-normal" v-else>Отсутствует</div>
						<div class="stat-desc" v-if="incomes.maxRecords">В этой категории {{ incomes.maxRecords }} записей</div>
						<div class="stat-actions" :class="{ 'mt-1': incomes.maxRecords }">
							<nuxt-link to="/categories" class="btn btn-success btn-xs">Добавить категорию</nuxt-link>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="card bg-base-100 card-sm shadow-sm">
			<div class="card-body max-w-3xl px-0">
				<h2 class="card-title ml-2">Расходы</h2>
				<div class="stats stats-vertical md:stats-horizontal bg-base-200 border border-base-300" v-if="outcomes">
					<div class="stat">
						<div class="stat-title">Всего</div>
						<div class="stat-value text-2xl leading-normal" v-if="outcomes.amount">
							{{ useCurrency(outcomes.amount) }}
						</div>
						<div class="stat-value text-2xl leading-normal" v-else>Отсутствует</div>
						<div class="stat-actions" :class="{ 'mt-1': outcomes.secondMax }">
							<nuxt-link to="/record" class="btn btn-error btn-xs">Добавить запись</nuxt-link>
						</div>
					</div>
					<div class="stat">
						<div class="stat-title">Максимальный</div>
						<div class="stat-value text-2xl leading-normal" v-if="outcomes.max">{{ useCurrency(outcomes.max) }}</div>
						<div class="stat-value text-2xl leading-normal" v-else>Отсутствует</div>
						<div class="stat-desc" v-if="outcomes.max && outcomes.secondMax">
							Это на {{ useCurrency(outcomes.max - outcomes.secondMax) }} больше
						</div>
						<div class="stat-actions"></div>
					</div>
					<div class="stat">
						<div class="stat-title">Больше всего записей</div>
						<div class="stat-value text-2xl leading-normal" v-if="outcomes.mostUsedCategory">
							{{ outcomes.mostUsedCategory.title }}
						</div>
						<div class="stat-value text-2xl leading-normal" v-else>Отсутствует</div>
						<div class="stat-desc" v-if="outcomes.maxRecords">В этой категории {{ outcomes.maxRecords }} записей</div>
						<div class="stat-actions" :class="{ 'mt-1': outcomes.maxRecords }">
							<nuxt-link to="/categories" class="btn btn-error btn-xs">Добавить категорию</nuxt-link>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
definePageMeta({ middleware: 'auth' })
const { info } = useInfo()
const { categories } = useCategory()
const { records } = useRecord()

const currency = computed(() => useCurrency(info.value?.bill ?? 0))

const incomes = computed(() => {
	if (!records.value || !categories.value) return null
	return getStats(records.value, categories.value, 'income')
})

const outcomes = computed(() => {
	if (!records.value || !categories.value) return null
	return getStats(records.value, categories.value, 'outcome')
})
</script>
