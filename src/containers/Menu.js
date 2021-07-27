import React from "react";
import Link from "next/link";
import cn from "classnames";

import SmallCaps from "../components/SmallCaps";

// function mapSizes({ width }) {
// 	return { isMobile: width < 768 };
// }

export default function Menu({ isMobile, expanded, toggle }) {
	const hide = isMobile && !expanded;
	return (
		<React.Fragment>
			{isMobile && (
				<div
					className={cn("showMenuWrapper", { raised: !hide })}
					key="showMenu"
				>
					<button
						key="chao-button"
						className={cn("chao showMenu")}
						aria-label="Show Menu"
						onClick={toggle}
					/>
				</div>
			)}
			<aside className={cn("menu", { isHidden: hide })} key="menu">
				{!isMobile && (
					<header key="header">
						<img className="chao" src="/image/chao.png" />
					</header>
				)}
				<nav onClick={isMobile ? toggle : undefined}>
					<Link href="/read/cosmogony">Cosmogony</Link>
					<Link href="/read/light">Light</Link>
					<Link href="/read/wtf">WTF</Link>
					<Link href="/read/orange">joke's on ∪</Link>
					<Link href="/read/apple">Apple</Link>
					<Link href="/discordia/">The Cacophonia</Link>
					<small>Names and Lists</small>
					<Link href="/read/frood">Frood</Link>
					<Link href="/read/gnom">
						<a>
							<SmallCaps>Gnom</SmallCaps>
						</a>
					</Link>
					<Link href="/read/floss">FLOSS</Link>
					<Link href="/read/beati">Five Star Divas</Link>
					<Link href="/read/holyprimes">Holyprimes</Link>
					<Link href="/read/holynames">Holynames</Link>
					<Link href="/read/holytimes">Holytimes</Link>
					<small>Phrases and Notes</small>
					<Link href="/read/erisian-tarot-spread">Erisian Tarot Spread</Link>
					<Link href="/read/the-pentabarf">The Pentabarf</Link>
					<Link href="/read/the-rich-economy">The RICH Economy</Link>
					<Link href="/read/stage">Stage</Link>
					<Link href="/read/optimism">On Optimism</Link>
					<Link href="/read/beauty-and-form">Beauty and Form</Link>
					<Link href="/read/entheatrope">As Many Wisefolk Have Said.</Link>
					<Link href="/read/the-richest-85">The Richest 85</Link>
					<Link href="/read/empty-space">Regions of Empty Space</Link>
				</nav>
			</aside>
		</React.Fragment>
	);
}
