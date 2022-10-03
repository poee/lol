import React, { useCallback, useState } from "react";
import cn from "classnames";

import { Attribution } from "./Blockquote";

export default function Image(props: any) {
	const {
		className,
		forwardedRef,
		"data-source": source,
		"data-link": link,
		"data-license": license,
		...otherProps
	} = props;
	const [showInfo, setShowInfo] = useState(false);
	const isAttributed = !!source || !!license;
	const displayAttribution = useCallback(() => {
		if (isAttributed) {
			setShowInfo(true);
		}
	}, [isAttributed, setShowInfo]);

	const combinedProps = {
		...otherProps,
		className: cn(className, { showInfo }),
	};

	// Build attribution panel
	let infoPanel;
	if (showInfo) {
		infoPanel = (
			<Attribution key="attribution">
				{link ? (
					<a href={link} target="_blank" rel="noopener noreferrer">
						{source}
					</a>
				) : (
					source
				)}
				{license && (
					<span className="license">
						<a href={license} target="_blank" rel="noopener noreferrer">
							Creative Commons License
						</a>
					</span>
				)}
			</Attribution>
		);
	}
	return (
		<p>
			<img
				key="image"
				{...combinedProps}
				ref={forwardedRef}
				onClick={displayAttribution}
				onFocus={displayAttribution}
				onKeyDown={displayAttribution}
				onMouseOver={displayAttribution}
			/>
			{infoPanel}
		</p>
	);
}
