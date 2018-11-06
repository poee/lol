
import React from 'react'
import { withRouteData, Link } from 'react-static'

import sort from 'array-sort'

function TOC ({ pages, match = {}, prefix, unsorted }) {
	let sorted = pages
	if (!unsorted) {
		sorted = sort(pages, 'title')
	}
	return (
		<div>
			<h2>Table of Contents</h2>
			<br />
			<ul>
				{sorted.map(page => (
					<li key={page.slug}>
						<Link to={`${prefix || match.url || '/'}${page.slug}`}>
							{page.title}
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}

export default withRouteData(TOC)
