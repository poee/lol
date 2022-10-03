import { addDays, format } from "date-fns";

import styles from "./calendar.module.css";

interface Props {
  dayOfYear: number;
  leapYear: boolean;
  year: number;
}

export function FocusInfo({ dayOfYear, leapYear, year }: Props) {
  if (dayOfYear < 0) {
    return null;
  }
  const date = addDays(new Date(year, 2, leapYear ? 21 : 22), dayOfYear);
  return (
    <div className={styles.focusInfo}>
      <p>{`Day #${dayOfYear + 1}`}</p>
      <p>{format(date, "eee MMM do, yyyy")}</p>
    </div>
  );
}
