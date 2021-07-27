import React from "react";
import Head from "next/head";

import styles from "./css/Header.module.css";
import { MIN_FONT, MAX_FONT } from "../containers/PageContainer";

function Header({ page, fontSize, decrease, increase }) {
	const title = ["POEE 👽"];
	if (page && page.title) {
		title.unshift(page.title);
	}
	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<header className={styles.ribbon}>
				<span className={styles.title}>{title[0]}</span>
				<aside className={styles.fontControl}>
					<button
						aria-label="Decrease Font Size"
						className="decreaseFont"
						disabled={fontSize <= MIN_FONT}
						onClick={decrease}
					>
						&#x25BC;
					</button>
					<button
						aria-label="Increase Font Size"
						className="increaseFont"
						disabled={fontSize >= MAX_FONT}
						onClick={increase}
					>
						&#x25B2;
					</button>
				</aside>
			</header>
		</>
	);
}

export default Header;
