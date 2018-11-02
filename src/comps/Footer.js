import React from 'react'

export default function Footer () {
	const year = (new Date()).getFullYear()
	return (
		<footer>
			{`Ⓚ 3.7bya YOLD - ${year} EV. All rites reversed.`}
		</footer>
	)
}
