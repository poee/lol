import React from 'react';

const URL = '/image/'

export default function Image (props) {
	const isQualified = typeof props.src === 'string' && props.src.match(/^\//)
	const combinedProps = {
		...props,
		src: isQualified ? props.src : (URL + props.src)
	}
	return <img {...combinedProps} />
}
