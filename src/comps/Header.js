import React from 'react'
import { withRouteData } from 'react-static'
import DocumentTitle from 'react-document-title'

import './css/Header.css'
import { MIN_FONT, MAX_FONT } from '../containers/PageContainer'

function Header ({
	page, fontSize, decrease, increase,
}) {
	const title = ['POEE.lol']
	if (page && page.title) {
		title.unshift(page.title)
	}
	return (
		<DocumentTitle title={title.join(' - ')}>
			<header className="ribbon">
				<span>{title[0]}</span>
				<aside className="fontControl">
					<button aria-label="Decrease Font Size" className="decreaseFont"
						disabled={fontSize <= MIN_FONT} onClick={decrease}>
						&#x25BC;
					</button>
					<button aria-label="Increase Font Size" className="increaseFont"
						disabled={fontSize >= MAX_FONT} onClick={increase}>
						&#x25B2;
					</button>
				</aside>
			</header>
		</DocumentTitle>
	)
}

export default withRouteData(Header)
