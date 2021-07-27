import React from 'react'

export default function SmallCaps ({ children, ...rest }) {
	return <span className="scaps" {...rest}>{children}</span>
}
