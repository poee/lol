import React from "react";
import Link from "next/link";
import { PAGES } from "../data/discordia";

export default function SOC() {
	return (
		<div>
			<h2>Stool of Contents</h2>
			<br />
			<ul className="soc">
				{PAGES.map((page) => {
					if (typeof page === "string") {
						// Do not display in SOC
						return null;
					}
					const displayedSlug = parseInt(page.slug);
					return (
						<li key={page.slug}>
							<Link href={`/cacophonia/${page.slug}`}>
								{`${!isNaN(displayedSlug) ? `${displayedSlug} - ` : ""} ${
									page.title
								}`}
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
