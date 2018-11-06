import React, { PureComponent } from 'react'
import cn from 'classnames'
import { compose, withState, withProps } from 'recompose'

const URL = '/image/'

class Image extends PureComponent {
	showInfo = () => {
		if (this.props.isAttributed && !this.props.info) {
			this.props.setInfo(true)
		}
	}

	render () {
		const {
			className, info, src, isAttributed,
			...otherProps
		} = this.props
		const isQualified = typeof src === 'string' && src.match(/^\//)
		const combinedProps = {
			...otherProps,
			className: cn(className, { showInfo: info }),
			src: isQualified ? src : (URL + src),
		}

		// Build attribution panel
		let infoPanel
		if (info) {
			const link = combinedProps['data-link']
			const source = combinedProps['data-source']
			const license = combinedProps['data-license']
			infoPanel = (
				<p className="attribution" key="attribution">
					{link ? <a href={link} target="_blank" rel="noopener noreferrer">{source}</a> : source}
					{license && (
						<span className="license">
							<a href={license} target="_blank" rel="noopener noreferrer">Create Commons License</a>
						</span>
					)}
				</p>
			)
		}
		return [
			<img alt="" key="image" {...combinedProps}
				onClick={this.showInfo}
				onFocus={this.showInfo}
				onKeyDown={this.showInfo}
				onMouseOver={this.showInfo} />,
			infoPanel,
		]
	}
}

export default compose(
	withState('info', 'setInfo', false),
	withProps(props => ({
		isAttributed: props['data-source'] || props['data-license'],
	}))
)(Image)
