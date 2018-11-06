import React from 'react'
import { Link, withRouteData } from 'react-static'
import DocumentTitle from 'react-document-title'

import Image from '../comps/Image'
import SOC from './SOC'


import './Discordia.css'
export default withRouteData(Discordia)

function onError (error) {
	if (error.target.src !== '/image/mancala.png') {
		error.target.src = '/image/mancala.png'
		error.target.alt = 'Could not find this page'
	}
}

const TITLE = ' ~ Cacophonia Discordia - POEE.lol'
const ROUTE_PREFIX = '/discordia/#'
const pages = [
	{ title: 'Front', slug: 'front' },
	{ title: 'Interview', slug: 'interview' },
	{ title: 'Title', slug: 'title' },
	{ title: 'Joshua Norton Cabal', slug: '00001' },
	// pages here
]

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
		content = <SOC pages={pages} prefix={ROUTE_PREFIX} unsorted />
		title = 'Stool of Contents'
	} else {
		content = <Image src={`/pd/${page}.png`} alt={`page ${page}`} onError={onError} />
	}

	// Look for the page meta to determine title and prev/next pages
	const metaIdx = pages.findIndex(meta => meta.slug === page)
	if (metaIdx !== -1) {
		prevPage = pages[metaIdx - 1]
		nextPage = pages[metaIdx + 1]
		title = pages[metaIdx].title
	}
	if (slug && slug[2]) {
		// Increment number for pages without meta
		const pageNum = Number(slug[2])
		prevPage = prevPage || { slug: zeroPad(pageNum - 1) }
		nextPage = nextPage || { slug: zeroPad(pageNum + 1) }
	}

	return (
		<div>
			<DocumentTitle title={`${title}${TITLE}`}>
				{content}
			</DocumentTitle>
			<hr />
			{prevPage && (
				<Link to={ROUTE_PREFIX + prevPage.slug}>
					<img alt="previous page" title="previous page" src="/image/arrow.png" className="left" />
				</Link>
			)}
			{nextPage && (
				<Link to={ROUTE_PREFIX + nextPage.slug}>
					<img alt="next page" title="next page" src="/image/arrow.png" className="right mirror" />
				</Link>
			)}
			<hr />
			{page !== 'soc' && (
				<Link to={`${ROUTE_PREFIX}soc`}>
					<img alt="stool of contents" title="stool of contents" className="toc" src="/image/amanita.png" />
				</Link>
			)}
		</div>
	)
}