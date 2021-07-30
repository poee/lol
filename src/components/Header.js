import React from "react";
import Head from "next/head";

import styles from "./css/Header.module.css";
import { MIN_FONT, MAX_FONT } from "../containers/PageContainer";
import { useTitleContext } from "../hooks/titleContext";

function Header({ fontSize, decrease, increase }) {
	const { title } = useTitleContext();
	return (
		<>
			<header className={styles.ribbon}>
				<span className={styles.title}>{title}</span>
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
