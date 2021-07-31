import Link from "next/link";
import React from "react";

export default function WrappedLink({
	children,
	className,
	...otherProps
} = {}) {
	if (otherProps.href) {
		return (
			<Link {...otherProps}>
				<a className={className}>{children}</a>
			</Link>
		);
	}
	return (
		<a className={className} {...otherProps}>
			{children}
		</a>
	);
}
