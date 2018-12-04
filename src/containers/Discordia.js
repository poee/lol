import React from 'react'
import { Link, withRouteData } from 'react-static'
import DocumentTitle from 'react-document-title'

import './Discordia.css'

import { PAGES, ROUTE_PREFIX, TITLE } from '../data/discordia'
import Image from '../comps/Image'
import SOC from './SOC'

export default withRouteData(Discordia)

function onError (error) {
	if (error.target.src !== '/image/mancala.png') {
		error.target.src = '/image/mancala.png'
		error.target.alt = 'Could not find this page'
	}
}

function getNeighborSlug (foundSlug, guess) {
	if (typeof foundSlug === 'object') {
		foundSlug = foundSlug.slug
	}
	return zeroPad(foundSlug || guess)
}
function zeroPad (string) {
	return string.toString().padStart(5, '0')
}


function Discordia () {
	let content
	let prevPage
	let nextPage
	let title
	const slug = (typeof window !== 'undefined' && window.location)
		&& (window.location.hash || '').match(/#((\d+)|(\w+))$/)
	const page = slug
		? slug[2] ? zeroPad(slug[2]) : slug[1] // For numeric slugs, zero pad
		: 'front' // Default page

	if (page === 'soc') {
		content = <SOC pages={PAGES} prefix={ROUTE_PREFIX} unsorted />
		title = 'Stool of Contents'
	} else {
		content = <Image src={`/pd/${page}.png`} alt={`page ${page}`} onError={onError} />
	}

	// Look for the page meta to determine title and prev/next pages
	const metaIdx = PAGES.findIndex(meta => typeof meta === 'string' ? meta === page : meta.slug === page)
	if (metaIdx !== -1) {
		prevPage = PAGES[metaIdx - 1]
		nextPage = PAGES[metaIdx + 1]
		title = PAGES[metaIdx].title
	}
	if (slug && slug[2]) {
		// Increment number for pages without meta
		const pageNum = Number(slug[2])
		prevPage = getNeighborSlug(prevPage, pageNum - 1)
		nextPage = getNeighborSlug(nextPage, pageNum + 1)
	}

	return (
		<div className="discordia">
			<DocumentTitle title={`${title}${TITLE}`}>
				{content}
			</DocumentTitle>
			<hr />
			<nav>
				{prevPage && (
					<Link to={ROUTE_PREFIX + prevPage} className="left">
						<img alt="previous page" title="previous page" src="/image/arrow.png" />
					</Link>
				)}
				{nextPage && (
					<Link to={ROUTE_PREFIX + nextPage} className="right mirror">
						<img alt="next page" title="next page" src="/image/arrow.png" />
					</Link>
				)}
				{page !== 'soc' && (
					<Link to={`${ROUTE_PREFIX}soc`} key="soc">
						<img alt="stool of contents" title="stool of contents" className="stool" src="/image/amanita.png" />
					</Link>
				)}
			</nav>
		</div>
	)
}
