import React from 'react'
import { Link, Head } from 'react-static'
import withSizes from 'react-sizes';
import cn from 'classnames'
import { compose, withStateHandlers, pure } from 'recompose'

import './Menu.css'
import Image from '../comps/Image'

function mapSizes ({ width }) {
	return { isMobile: width < 768 }
}

export default compose(
	withSizes(mapSizes),
	withStateHandlers(
		{ isHidden: true }, {
			toggle: ({ isHidden, scrollY }) => e => {
				e.stopPropagation()
				isHidden = !isHidden
				if (isHidden) {
					scrollY = 0
				} else {
					// When showing, scroll the menu to the current window position
					scrollY =  window.scrollY + 10
				}
				return { isHidden, scrollY: scrollY }
			}
		}
	),
	pure
)(Menu)

function Menu ({ isMobile, isHidden, toggle, scrollY }) {
	// Change hue seed every 30 seconds when in the browser
	let style;
	if (typeof window !== 'undefined') {
		const hueSeed = Math.round((new Date()).getTime() / 2300) % 361
		const ribbonHue = (150 + hueSeed) % 361
		const ribbonColor = `hsl(${ribbonHue}, 45%, 40%)`;
		style = `.chao {background-color: hsl(${hueSeed}, 70%, 35%);}
			header.ribbon {background-color: ${ribbonColor};}
			.ribbon:before, .ribbon:after {border-top-color: hsl(${ribbonHue}, 35%, 30%);}
			blockquote, blockquote + .attribution { border-left-color: ${ribbonColor};}`
	}

	const hide = isMobile && isHidden
	const asideStyle = isMobile ? { top: `${scrollY}px` } : undefined
	return [
		<Head key="head">
			<style>{style}</style>
		</Head>,
		isMobile && (
			<div className="showMenuWrapper">
				<button className={cn('showMenu', { isHidden: !hide })} onClick={toggle} key="showMenu" />
			</div>
		),
		<aside className={cn('menu', { isHidden: hide })} style={asideStyle} key="menu">
			<header>
				<Image className="chao" src="chao.png" />
			</header>
			<nav onClick={isMobile ? toggle : undefined}>
				<Link to="/read/cosmogony">Cosmogony</Link>
				<Link to="/read/wtf">WTF</Link>
				<Link to="/discordia/">The Cacophonia</Link>
				<Link to="/read/light">Light</Link>
				<Link to="/read/apple">Apple</Link>
				<Link to="/read/the-pentabarf">The Pentabarf</Link>
				<small>Names and Lists</small>
				<Link to="/nom/frood">Frood</Link>
				<Link to="/nom/beati">Five Star Divas</Link>
				<Link to="/nom/floss">FLOSS</Link>
				<Link to="/nom/holytimes">Holytimes</Link>
				<Link to="/nom/holyprimes">Holyprimes</Link>
				<Link to="/nom/holynames">Holynames</Link>
				<small>Phrases and Notes</small>
				<Link to="/read/empty-space">Regions of Empty Space</Link>
				<Link to="/read/erisian-tarot-spread">Erisian Tarot Spread</Link>
				<Link to="/read/optimism">On Optimism</Link>
				<Link to="/read/the-rich-economy">The RICH Economy</Link>
				<Link to="/read/the-richest-85">The Richest 85</Link>
				<Link to="/read/stage">Stage</Link>
				<Link to="/read/stele">Stele</Link>
				<Link to="/read/beauty-and-form">Beauty and Form</Link>
				<Link to="/read/entheatrope">As Many Wisefolk Have Said.</Link>
			</nav>
		</aside>
	];
}
