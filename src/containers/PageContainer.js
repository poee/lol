import React, { Component } from "react";
import Routes from "react-static-routes";
import cn from "classnames";

import Header from "../comps/Header";
import Menu from "./Menu";

const BASE_FONT = 95;
const INCREMENT = 15;
export const MIN_FONT = 65;
export const MAX_FONT = 185;

class PageContainer extends Component {
	constructor(props) {
		super(props);
		this.inBrowser = typeof window !== "undefined";
		this.state = { fontSize: null, menuExpanded: false };
	}

	componentDidMount() {
		// Check through localStorage once
		this.update(0);
	}

	increase = () => {
		this.update(INCREMENT);
	};
	decrease = () => {
		this.update(-INCREMENT);
	};
	toggleMenu = () => {
		const { menuExpanded } = this.state;
		this.setState({ menuExpanded: !menuExpanded });
	};
	update = (change) => {
		let fontSize =
			this.state.fontSize ||
			(this.inBrowser && Number(window.localStorage.getItem("fontSize"))) ||
			BASE_FONT;
		fontSize = Math.max(MIN_FONT, Math.min(MAX_FONT, fontSize + change));

		this.inBrowser && window.localStorage.setItem("fontSize", fontSize);
		this.setState({
			fontSize,
			sizeStyle: {
				fontSize: `${fontSize / 100}rem`,
			},
		});
	};

	render() {
		return (
			<div
				className="pageContainer"
				style={this.state.sizeStyle}
				key="container"
			>
				<Menu
					key="menu"
					toggle={this.toggleMenu}
					expanded={this.state.menuExpanded}
				/>
				<article
					className={cn("content", { blur: this.state.menuExpanded })}
					onClick={this.state.menuExpanded ? this.toggleMenu : undefined}
				>
					<Header
						{...this.state}
						decrease={this.decrease}
						increase={this.increase}
					/>
					<Routes />
				</article>
			</div>
		);
	}
}

export default PageContainer;
