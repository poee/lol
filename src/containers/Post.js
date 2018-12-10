import React from 'react'
import { withRouteData } from 'react-static'
import convert from 'htmr'

import Attribution from '../comps/Attribution'
import Divider from '../comps/Divider'
import Image from '../comps/Image'
import Kopy from '../comps/Kopy'
import Link from '../comps/Link'
import Random from '../comps/Random'
import SmallCaps from '../comps/SmallCaps'
import Stamp from '../comps/Stamp'

const transform = {
	a: Link,
	attr: Attribution,
	del: SmallCaps,
	hr: Divider,
	kopy: Kopy,
	img: Image,
	random: Random,
	stamp: Stamp
}

export default withRouteData(({ page }) => (
	<div>
		{convert(page.contents, { transform })}
		<hr className="end" />
	</div>
))
