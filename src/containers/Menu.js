import React from "react";
import { Link, Head } from "react-static";
import withSizes from "react-sizes";
import cn from "classnames";
import { compose, pure } from "recompose";

import "./Menu.css";
import Image from "../comps/Image";
import SmallCaps from "../comps/SmallCaps";

function mapSizes({ width }) {
	return { isMobile: width < 768 };
}

export default compose(withSizes(mapSizes), pure)(Menu);

function Menu({ isMobile, expanded, toggle, scrollY }) {
	// Change hue seed every 30 seconds when in the browser
	let style;
	if (typeof window !== "undefined") {
		const hueSeed = Math.round(new Date().getTime() / 2300) % 361;
		const ribbonHue = (150 + hueSeed) % 361;
		const ribbonColor = `hsl(${ribbonHue}, 45%, 40%)`;
		style = `.chao {background-color: hsl(${hueSeed}, 70%, 35%) !important;}
			header.ribbon {background-color: ${ribbonColor};}
			.ribbon:before, .ribbon:after {border-top-color: hsl(${ribbonHue}, 35%, 30%);}
			blockquote, blockquote + .attribution {border-left-color: ${ribbonColor};}`;
	}

	const hide = isMobile && !expanded;
	return (
		<React.Fragment>
			<Head key="head">
				<style>{style}</style>
			</Head>
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
						<Image className="chao" src="chao.png" />
					</header>
				)}
				<nav onClick={isMobile ? toggle : undefined}>
					<Link to="/read/cosmogony">Cosmogony</Link>
					<Link to="/read/light">Light</Link>
					<Link to="/read/wtf">WTF</Link>
					<Link to="/read/orange">joke's on ∪</Link>
					<Link to="/read/apple">Apple</Link>
					<Link to="/discordia/">The Cacophonia</Link>
					<small>Names and Lists</small>
					<Link to="/nom/frood">Frood</Link>
					<Link to="/nom/gnom">
						<SmallCaps>Gnom</SmallCaps>
					</Link>
					<Link to="/nom/floss">FLOSS</Link>
					<Link to="/nom/beati">Five Star Divas</Link>
					<Link to="/nom/holyprimes">Holyprimes</Link>
					<Link to="/nom/holynames">Holynames</Link>
					<Link to="/nom/holytimes">Holytimes</Link>
					<small>Phrases and Notes</small>
					<Link to="/read/erisian-tarot-spread">Erisian Tarot Spread</Link>
					<Link to="/read/the-pentabarf">The Pentabarf</Link>
					<Link to="/read/the-rich-economy">The RICH Economy</Link>
					<Link to="/read/stage">Stage</Link>
					<Link to="/read/optimism">On Optimism</Link>
					<Link to="/read/beauty-and-form">Beauty and Form</Link>
					<Link to="/read/entheatrope">As Many Wisefolk Have Said.</Link>
					<Link to="/read/the-richest-85">The Richest 85</Link>
					<Link to="/read/empty-space">Regions of Empty Space</Link>
				</nav>
			</aside>
		</React.Fragment>
	);
}
