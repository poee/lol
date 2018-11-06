import React from 'react'
import { withRouteData } from 'react-static'
import convert from 'htmr'

import Image from '../comps/Image'
import Kopy from '../comps/Kopy'
import SmallCaps from '../comps/SmallCaps'

const transform = {
	del: SmallCaps,
	kopy: Kopy,
	img: Image,
}

export default withRouteData(({ page }) => (
	<div>
		{convert(page.contents, { transform })}
		<hr className="end" />
	</div>
))
