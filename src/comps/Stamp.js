import React from 'react'

import './css/Stamp.css'

export default function Stamp ({ children }) {
	return (
		<div className="stamp">
			<p>{children}</p>
		</div>
	)
}
