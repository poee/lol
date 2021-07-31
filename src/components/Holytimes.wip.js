import React from 'react'

import DDate from 'ddate'
import holytimes from '../data/holytimes'

const FORMAT_NO_YEAR = '%{%B the %e%}'
const FORMAT = `${FORMAT_NO_YEAR}, %Y`

function Date (props) {
	const {
		date, name, since, epoch
	} = props
	let ddate = ''
	if (epoch) {
		ddate = new DDate(epoch)
		// Don't include Year when it's 3136/1970
		const format = ddate.format('%Y') === '3136'
			? FORMAT_NO_YEAR : FORMAT
		ddate = ddate.format(format)
	}
	return (
		<div>
			{date}
			{name}
			{since}
			{ddate}
		</div>
	)
}

export default function Holytimes () {
	const holyDates = holytimes.map((time, idx) => <Date key={idx} {...time} />)
	return (
		<div>
			Today is the first day of the rest of your liff.
			{holyDates}
		</div>
	)
}
