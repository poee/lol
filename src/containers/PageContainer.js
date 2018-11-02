import React from 'react'
import { compose, withProps, withStateHandlers } from 'recompose'
import Routes from 'react-static-routes'
import Header from '../comps/Header'
import Menu from './Menu'

function PageContainer(props) {
	return (
		<div className="pageContainer" style={props.sizeStyle} key="container">
			<Menu />
			<article className="content">
				<Header {...props} />
				<Routes />
			</article>
		</div>
	)
}

const INCREMENT = 10
const BASE_FONT = 95
export const MIN_FONT = 75
export const MAX_FONT = 155
function getLSValue() {
	return typeof window !== 'undefined' && Number(window.localStorage.getItem('fontSize')) || BASE_FONT
}
function updateSize(oldValue, change) {
	oldValue = oldValue || getLSValue()
	let fontSize = Math.max(MIN_FONT, oldValue + change)
	fontSize = Math.min(MAX_FONT, fontSize)
	return {
		fontSize,
	}
}

export default compose(
	withStateHandlers(
		{ fontSize: null }, {
			decrease: ({ fontSize }) => () => updateSize(fontSize, -INCREMENT),
			increase: ({ fontSize }) => () => updateSize(fontSize, +INCREMENT),
		}
	),
	withProps(({ fontSize }) => {
		if (typeof window !== 'undefined') {
			fontSize = fontSize || getLSValue()
			window.localStorage.setItem('fontSize', fontSize)
		}
		return {
			fontSize,
			sizeStyle: {
				fontSize: `${fontSize / 100}rem`
			}
		}
	})
)(PageContainer)
