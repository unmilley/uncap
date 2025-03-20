import { defu } from 'defu'

export const useCurrency = (
	value: number | bigint,
	options: Intl.NumberFormatOptions = {},
	locales: Intl.LocalesArgument = 'ru-RU',
) => {
	const defaults: Intl.NumberFormatOptions = {
		compactDisplay: 'short',
		notation: 'standard',
		style: 'currency',
		currency: 'RUB',
	}
	const params = defu(options, defaults)

	return new Intl.NumberFormat(locales, params).format(value)
}
