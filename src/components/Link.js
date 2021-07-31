import Link from "next/link";
import React from "react";

export default function WrappedLink({
	children,
	className,
	...otherProps
} = {}) {
	return (
		<Link {...otherProps}>
			<a className={className}>{children}</a>
		</Link>
	);
}
