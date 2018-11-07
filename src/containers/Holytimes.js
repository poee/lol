import React from 'react'

import holytimes from '../data/holytimes'

function Date (props) {
	return (
		<div>
			{props.date}
			{props.name}
			{props.since}
		</div>
	)
}

export default function Holytimes () {
	const holyDates = holytimes.map((time, idx) => <Date key={idx} {...time} />)
	return (
		<div>
			Today is ${(new DDate()).toDateString()}.
			{holyDates}
		</div>
	)
}
