import React from 'react'
import { Head, Loading, Router } from 'react-static'
import { hot } from 'react-hot-loader'
import Routes from 'react-static-routes'

import Footer from './comps/Footer'
import Header from './comps/Header'
import Menu from './containers/Menu'

import './app.css'

const App = () => ([
	<Head>
		<link href="https://fonts.googleapis.com/css?family=Noto+Sans" rel="stylesheet" />
		<link href="/image/favicon.png" rel="shortcut icon" />
	</Head>,
	<Router>
		<div className="pageContainer">
			<Loading>
				{({ loading }) => {
					if (loading) {
						// TODO - Return heart loader
						return 'loading' + loading;
					}
					return [
						<Menu />,
						<article className="content">
							<Header />
							<Routes />
						</article>
					]
				}}
			</Loading>
		</div>
	</Router>,
	<Footer />
])

export default hot(module)(App)
