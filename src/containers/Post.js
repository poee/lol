import React from 'react'
import { withRouteData } from 'react-static'
import convert from 'htmr'
//

export default withRouteData(({ page }) => (
	<div>
		{convert(page.contents)}
		<hr className="end" />
	</div>
))
