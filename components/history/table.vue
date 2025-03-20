<template>
	<div class="overflow-x-auto">
		<table class="table">
			<!-- head -->
			<thead>
				<tr>
					<th></th>
					<th>Сумма</th>
					<th>Дата</th>
					<th>Категория</th>
					<th>Тип</th>
					<th>Открыть</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(record, index) in records" :key="record.id">
					<th>{{ index + 1 }}</th>
					<td>
						{{ useCurrency(record.amount) }}
					</td>
					<td>
						{{ useDateFormat(record.date, 'DD MMMM YYYY') }}
					</td>
					<td>{{ record.categoryName }}</td>
					<td>
						<div :class="['badge badge-soft', record.typeClass]">
							{{ record.typeText }}
						</div>
					</td>
					<th>
						<div class="tooltip" data-tip="Открыть">
							<nuxt-link :to="'/detail/' + record.id" class="btn btn-square btn-sm">
								<Icon name="bx:folder-open" size="1.25rem" />
							</nuxt-link>
						</div>
					</th>
				</tr>
			</tbody>
			<!-- foot -->
			<tfoot>
				<tr>
					<th></th>
					<th>Сумма</th>
					<th>Дата</th>
					<th>Категория</th>
					<th>Тип</th>
					<th>Открыть</th>
				</tr>
			</tfoot>
		</table>
	</div>
</template>

<script lang="ts" setup>
type Props = RecordDB & {
	categoryName: string
	typeClass: string
	typeText: string
}

const { records } = defineProps<{ records: Props[] }>()
</script>
