import React from 'react'
import { withRouteData } from 'react-static'
import convert from 'htmr'

import Image from '../comps/Image'


export default withRouteData(Principia)

function onError (error) {
	if (error.target.src !== '/image/mancala.png') {
		error.target.src = '/image/mancala.png'
	}
}

function Principia ({ page }) {
	if (typeof window !== 'undefined' && window.location && window.location.hash) {
		const number = window.location.hash.match(/#(\d{5})/)
		if (number) {
			return <Image src={`/pd/${number[1]}.png`} onError={onError} />
		}
	}
	return (
		<div>
			{convert(page.contents)}
		</div>
	)
}
