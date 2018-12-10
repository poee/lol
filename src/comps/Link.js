import React from 'react'
import { Link } from 'react-static'

export default function WrappedLink ({ href, ...otherProps } = {}) {
	return (
		<Link to={href} {...otherProps} />
	)
}
