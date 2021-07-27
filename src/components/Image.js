import React, { PureComponent } from 'react'
import cn from 'classnames'
import { compose, withState, withProps } from 'recompose'

import Attribution from './Attribution'

const URL = '/image/'

class Image extends PureComponent {
	showInfo = () => {
		if (this.props.isAttributed && !this.props.info) {
			this.props.setInfo(true)
		}
	}

	render () {
		const {
			className, forwardedRef, info, src, isAttributed, setInfo,
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
				<Attribution key="attribution">
					{link ? <a href={link} target="_blank" rel="noopener noreferrer">{source}</a> : source}
					{license && (
						<span className="license">
							<a href={license} target="_blank" rel="noopener noreferrer">Creative Commons License</a>
						</span>
					)}
				</Attribution>
			)
		}
		return [
			<img alt="" key="image" {...combinedProps}
				ref={forwardedRef}
				onClick={this.showInfo}
				onFocus={this.showInfo}
				onKeyDown={this.showInfo}
				onMouseOver={this.showInfo} />,
			infoPanel,
		]
	}
}

const ImageHOC = compose(
	withState('info', 'setInfo', false),
	withProps(props => ({
		isAttributed: props['data-source'] || props['data-license'],
	}))
)(Image)

export default React.forwardRef(
	(props, ref) => <ImageHOC {...props} forwardedRef={ref} />
)
