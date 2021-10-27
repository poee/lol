import clsx from "clsx";
import { Dispatch, ReactNode, SetStateAction } from "react";

import styles from "./calendar.module.css";

interface Props {
  className: string;
  dayOfYear: number;
  isFocused: boolean;
  setFocus: Dispatch<SetStateAction<number>>;
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
      onClick={() => setFocus((curr) => (curr === dayOfYear ? -1 : dayOfYear))}
    >
      {monthDay}
    </button>
  );
}
