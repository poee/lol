import React from 'react'
import { Head, Loading, Router } from 'react-static'
import { compose, mapProps, withStateHandlers } from 'recompose'
import { hot } from 'react-hot-loader'
import Routes from 'react-static-routes'

import Footer from './comps/Footer'
import Header from './comps/Header'
import Menu from './containers/Menu'

import './app.css'
import loadCss from './loadCss';

const App = ({ fontSize, decrease, increase, sizeStyle }) => ([
	<Head key="head">
		<link href="https://fonts.googleapis.com/css?family=Noto+Sans" rel="stylesheet" />
		<link href="/image/favicon.png" rel="shortcut icon" />
		<style>{loadCss}</style>
	</Head>,
	<Router key="router">
		<Loading>
			{({ loading }) => {
				if (loading) {
					return <div class="heart"><div></div></div>
				}
				return [
					<div className="pageContainer" style={sizeStyle} key="container">
						<Menu />
						<article className="content">
							<Header fontSize={fontSize} decrease={decrease} increase={increase} />
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
function makeNewFontState({ fontSize }, change = 0) {
	fontSize = (
		fontSize
		|| typeof window !== 'undefined' && Number(window.localStorage.getItem('fontSize'))
		|| BASE_FONT
	) + change;
	debugger
	fontSize = Math.max(MIN_FONT, fontSize)
	fontSize = Math.min(MAX_FONT, fontSize)
	typeof window !== 'undefined' && window.localStorage.setItem('fontSize', fontSize)
	return {
		fontSize,
		sizeStyle: {fontSize: `${fontSize / 100}rem`}
	}
}

export default compose(
	withStateHandlers(
		makeNewFontState, {
			decrease: (state) => () => makeNewFontState(state, -INCREMENT),
			increase: (state) => () => makeNewFontState(state, INCREMENT),
		}
	),
	hot(module)
)(App)
