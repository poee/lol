import clsx from "clsx";
import { ReactNode } from "react";

import styles from "./calendar.module.css";

interface Props {
  className: string;
  dayOfYear: number;
  monthDay: ReactNode;
}
export function Day({ className, dayOfYear, monthDay }: Props) {
  return (
    <div className={clsx(styles.day, className)}>
      {monthDay} <div className={styles.dayOfYear}>{dayOfYear}</div>
    </div>
  );
}
