import React from 'react'
import ReactDOM from 'react-dom'

// Your top level component
import App from './App'

// Export your top level component as JSX (for static rendering)
export default App

// Remave any meta tags that are in index.html
if (typeof document !== 'undefined') {
	const metaTags = document.getElementsByTagName('meta')
	for (let i=0; i<metaTags.length; i++) {
		const thisTag = metaTags[i]
		if (thisTag.name === 'viewport') {
			thisTag.content = 'width=device-width, initial-scale=1, maximum-scale=10, user-scalable=yes'
		}
	}
}

// Render your app
if (typeof document !== 'undefined') {
	const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate || ReactDOM.render
	const render = Comp => {
		renderMethod(<Comp />, document.getElementById('root'))
	}

	// Render!
	render(App)
}
