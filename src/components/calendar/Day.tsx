import clsx from "clsx";
import { ReactNode } from "react";

import styles from "./calendar.module.css";

interface Props {
  className: string;
  dayOfYear: number;
  isFocused: boolean;
  setFocus: (dayOfYear: number) => void;
  monthDay: ReactNode;
}

export function Day({
  className,
  dayOfYear,
  isFocused,
  setFocus,
  monthDay,
}: Props) {
  return (
    <button
      data-tip={dayOfYear}
      className={clsx(styles.day, className, isFocused && styles.focused)}
      onClick={() => setFocus(dayOfYear)}
    >
      {monthDay}
    </button>
  );
}
