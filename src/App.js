import React from 'react'
import { Head, Loading, Router } from 'react-static'
import { compose, mapProps, withStateHandlers } from 'recompose'
import { hot } from 'react-hot-loader'
import Routes from 'react-static-routes'

import Footer from './comps/Footer'
import Header from './comps/Header'
import Menu from './containers/Menu'

import './app.css'

const App = ({ fontSize, decrease, increase, sizeStyle }) => ([
	<Head>
		<link href="https://fonts.googleapis.com/css?family=Noto+Sans" rel="stylesheet" />
		<link href="/image/favicon.png" rel="shortcut icon" />
	</Head>,
	<Router>
		<div className="pageContainer" style={sizeStyle}>
			<Loading>
				{({ loading }) => {
					if (loading) {
						// TODO - Return heart loader
						return 'loading' + loading;
					}
					return [
						<Menu />,
						<article className="content">
							<Header fontSize={fontSize} decrease={decrease} increase={increase} />
							<Routes />
						</article>
					]
				}}
			</Loading>
		</div>
	</Router>,
	<Footer />
])

const INCREMENT = 10
export const MIN_FONT = 75
export const MAX_FONT = 155
export default compose(
	withStateHandlers(
		() => ({ fontSize: Number(window && window.localStorage.getItem('fontSize')) || 95 }), {
			decrease: ({ fontSize }) => () => ({ fontSize: Math.max(MIN_FONT, fontSize - INCREMENT) }),
			increase: ({ fontSize }) => () => ({ fontSize: Math.min(MAX_FONT, fontSize + INCREMENT) }),
		}
	),
	mapProps(
		(props) => {
			window && window.localStorage.setItem('fontSize', props.fontSize)
			return {...props, sizeStyle: {fontSize: `${props.fontSize / 100}rem`}}
		}
	),
	hot(module)
)(App)
