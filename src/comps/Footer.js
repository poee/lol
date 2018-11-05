import React from 'react'

import './Footer.css'

export default function Footer () {
	const year = (new Date()).getFullYear()
	return (
		<footer>
			{`Ⓚ 3.7bya YOLD - ${year} EV. All rites reversed.`}
		</footer>
	)
}
