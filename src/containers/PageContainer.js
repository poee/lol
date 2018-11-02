import React, { PureComponent } from 'react'
import Routes from 'react-static-routes'
import Header from '../comps/Header'
import Menu from './Menu'


const BASE_FONT = 95
const INCREMENT = 10
export const MIN_FONT = 75
export const MAX_FONT = 155

class PageContainer extends PureComponent {
	constructor(props) {
		super(props)
		this.inBrowser = typeof window !== 'undefined'
		this.state = { fontSize: null }
	}

	componentDidMount() {
		// Check through localStorage once
		this.update(0)
	}

	increase = () => {
		this.update(INCREMENT)
	}
	decrease = () => {
		this.update(-INCREMENT)
	}
	update = (change) => {
		let fontSize = this.state.fontSize || (
			this.inBrowser && Number(window.localStorage.getItem('fontSize'))
		) || BASE_FONT
		fontSize = Math.max(MIN_FONT,
			Math.min(MAX_FONT, fontSize + change)
		)

		this.inBrowser && window.localStorage.setItem('fontSize', fontSize)
		this.setState({
			fontSize,
			sizeStyle: {
				fontSize: `${fontSize / 100}rem`
			}
		})
	}

	render() {
		return (
			<div className="pageContainer" style={this.state.sizeStyle} key="container">
				<Menu />
				<article className="content">
					<Header {...this.state} decrease={this.decrease} increase={this.increase} />
					<Routes />
				</article>
			</div>
		)
	}
}


export default PageContainer
