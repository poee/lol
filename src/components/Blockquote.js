import React from "react";

import styles from "./css/Blockquote.module.css";

export function Attribution({ children }) {
	return <p className={styles.attribution}>{children}</p>;
}

export function Blockquote({ children }) {
	return <blockquote className={styles.quote}>{children}</blockquote>;
}
