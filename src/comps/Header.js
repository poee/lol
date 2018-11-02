import React from 'react'
import { withRouteData } from 'react-static'
import DocumentTitle from 'react-document-title'

import './Header.css'

function Header ({ page }) {
	const title = ['POEE']
	if (page && page.title) {
		title.unshift(page.title);
	}
	return (
		<DocumentTitle title={title.join(' - ')}>
			<header className="ribbon">
				<span>{title[0]}</span>
			</header>
		</DocumentTitle>
	)
}

export default withRouteData(Header)
