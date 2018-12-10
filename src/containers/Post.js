import React from 'react'
import { withRouteData } from 'react-static'
import convert from 'htmr'

import Attribution from '../comps/Attribution'
import Divider from '../comps/Divider'
import Image from '../comps/Image'
import Kopy from '../comps/Kopy'
import Random from '../comps/Random'
import SmallCaps from '../comps/SmallCaps'

const transform = {
	attr: Attribution,
	del: SmallCaps,
	hr: Divider,
	kopy: Kopy,
	img: Image,
	random: Random
}

export default withRouteData(({ page }) => (
	<div>
		{convert(page.contents, { transform })}
		<hr className="end" />
	</div>
))
