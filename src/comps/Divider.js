import React from 'react'
import cn from 'classnames'

export default function Divider ({ type = 'deco', className }) {
	return (
		<img alt="divider"
			className={cn('o75 w50', className)}
			src={`/image/svg/${type}divider.svg`} />
	)
}
