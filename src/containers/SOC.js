
import React from 'react'
import { withRouteData, Link } from 'react-static'

import sort from 'array-sort'
const ADD_SLASH = /([^/#])$/
function addSlash (string) {
	string = string || '/'
	return string.replace(ADD_SLASH, '$1/')
}


function SOC ({
	pages, match = {}, prefix, unsorted
}) {
	let sorted = pages
	if (!unsorted) {
		sorted = sort(pages, 'title')
	}
	return (
		<div>
			<h2>Stool of Contents</h2>
			<br />
			<ul className="soc">
				{sorted.map(page => {
					if (typeof page === 'string') {
						// Do not display in SOC
						return null
					}
					const displayedSlug = Number(page.slug)
					return (
						<li key={page.slug}>
							<Link to={`${addSlash(prefix || match.url)}${page.slug}`}>
								{!isNaN(displayedSlug) && `${displayedSlug} - `}
								{page.title}
							</Link>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default withRouteData(SOC)
