<template>
	<div>
		<NuxtRouteAnnouncer>
			<template #default="{ message }">
				<p>{{ message }} was loaded.</p>
			</template>
		</NuxtRouteAnnouncer>
		<NuxtLoadingIndicator
			color="repeating-linear-gradient(to right,oklch(var(--n)) 0%, oklch(var(--p)) 100%)"
			error="repeating-linear-gradient(to right,oklch(var(--n)) 0%, oklch(var(--er)) 100%)"
		/>
		<NuxtLayout>
			<Toaster position="top-right" />
			<NuxtPage
				:transition="{
					name: 'page',
					mode: 'out-in',
				}"
			/>
		</NuxtLayout>
	</div>
</template>

<script lang="ts" setup></script>

<style>
.page-enter-active,
.page-leave-active {
	transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
	opacity: 0;
	filter: blur(0.05rem);
}
</style>
