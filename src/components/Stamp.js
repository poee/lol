import React from "react";

import styles from "./css/Stamp.module.css";

export default function Stamp({ children }) {
	return (
		<div className={styles.stamp}>
			<p>{children}</p>
		</div>
	);
}
