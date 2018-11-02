import React from 'react'
import { Head, Loading, Router } from 'react-static'
import { compose, withProps, withStateHandlers } from 'recompose'
import { hot } from 'react-hot-loader'
import Routes from 'react-static-routes'

import Footer from './comps/Footer'
import Header from './comps/Header'
import Menu from './containers/Menu'

import './app.css'
import loadCss from './loadCss';

const App = (props) => ([
	<Head key="head">
		<link href="https://fonts.googleapis.com/css?family=Noto+Sans" rel="stylesheet" />
		<link href="/image/favicon.png" rel="shortcut icon" />
		<style>{loadCss}</style>
	</Head>,
	<Router key="router">
		<Loading>
			{({ loading }) => {
				if (loading) {
					return <div className="heart"><div></div></div>
				}
				return [
					<div className="pageContainer" style={props.sizeStyle} key="container">
						<Menu />
						<article className="content">
							<Header {...props} />
							<Routes />
						</article>
					</div>,
					<Footer key="footer" />
				]
			}}
		</Loading>
	</Router>,
])

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
	}),
	hot(module)
)(App)
