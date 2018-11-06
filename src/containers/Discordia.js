import React from 'react'
import { Link, withRouteData } from 'react-static'
import DocumentTitle from 'react-document-title'

import Image from '../comps/Image'
import TOC from './TOC'


export default withRouteData(Discordia)

function onError (error) {
	if (error.target.src !== '/image/mancala.png') {
		error.target.src = '/image/mancala.png'
		error.target.alt = 'Could not find this page'
	}
}

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
	if (typeof window !== 'undefined' && window.location && window.location.hash) {
		const slug = window.location.hash.match(/#((\d+)|(\w+))$/)
		if (slug) {
			const value = slug[2] ? zeroPad(slug[2]) : slug[1]
			content = <Image src={`/pd/${value}.png`} alt={`page ${value}`} onError={onError} />

			// Look for the page meta to determine title and prev/next pages
			const metaIdx = pages.findIndex(meta => meta.slug === value)
			if (metaIdx !== -1) {
				prevPage = pages[metaIdx - 1]
				const thisPage = pages[metaIdx]
				nextPage = pages[metaIdx + 1]
				content = (
					<DocumentTitle title={`POEE - ${thisPage.title}`}>
						{content}
					</DocumentTitle>
				)
			}
			if (slug[2]) {
				// Increment number for missing pages
				const pageNum = Number(slug[2])
				prevPage = prevPage || { slug: zeroPad(pageNum - 1) }
				nextPage = nextPage || { slug: zeroPad(pageNum + 1) }
			}
		}
	}
	return (
		<div>
			{content || (
				<TOC pages={pages} prefix={ROUTE_PREFIX} />
			)}
			<hr />
			{prevPage && (
				<Link to={ROUTE_PREFIX + prevPage.slug} key="prev">
					<img alt="previous page" src="/image/arrow.png" className="left" />
				</Link>
			)}
			{nextPage && (
				<Link to={ROUTE_PREFIX + nextPage.slug} key="next">
					<img alt="next page" src="/image/arrow.png" className="right mirror" />
				</Link>
			)}
		</div>
	)
}
