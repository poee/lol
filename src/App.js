import React from 'react'
import { Head, Loading, Router } from 'react-static'
import { hot } from 'react-hot-loader'

import Footer from './comps/Footer'
import PageContainer from './containers/PageContainer'

import './app.css'
import loadCss from './loadCss'

const App = () => ([
	<Head key="head">
		<link href="https://fonts.googleapis.com/css?family=Noto+Sans" rel="stylesheet" />
		<link href="/image/favicon.png" rel="shortcut icon" />
		<style>{loadCss}</style>
	</Head>,
	<Router key="router">
		<Loading>
			{({ loading }) => {
				if (loading) {
					return <div className="heart"><div /></div>
				}
				return [
					<PageContainer key="container" />,
					<Footer key="footer" />
				]
			}}
		</Loading>
	</Router>,
])

export default hot(module)(App)
