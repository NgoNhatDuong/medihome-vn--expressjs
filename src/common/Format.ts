export const datetimeToString = (time: Date, pattern: string) => {
	const rules = {
		YYYY: `${time.getFullYear()}`,
		YY: `${time.getFullYear()}`.slice(-2),
		MM: `0${time.getMonth() + 1}`.slice(-2),
		DD: `0${time.getDate()}`.slice(-2),
		hh: `0${time.getHours()}`.slice(-2),
		mm: `0${time.getMinutes()}`.slice(-2),
		ss: `0${time.getSeconds()}`.slice(-2),
	}

	let result = pattern
	Object.entries(rules).forEach(([key, value]) => {
		result = result.replace(key, value)
	})

	return result
}
