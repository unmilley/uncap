<template>
	<footer
		class="footer footer-horizontal bg-base-100 text-base-content items-center p-4 pb-28 md:pb-4 inset-shadow-top"
	>
		<aside class="grid-flow-col items-center">
			<p>Copyright © {{ new Date().getFullYear() }} - All right reserved</p>
		</aside>
		<nav class="grid-flow-col gap-4 place-self-center justify-self-end">
			<nuxt-link to="https://milley.uno" target="_blank" class="btn btn-sm">
				<Icon name="bx:cookie" size="1.25rem" />
				milley
			</nuxt-link>
		</nav>
	</footer>
</template>
