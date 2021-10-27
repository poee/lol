import { addDays, format } from "date-fns";

import styles from "./calendar.module.css";
import { YEAR_OFFSET } from "./constants";

interface Props {
  dayOfYear: number;
  leapYear: boolean;
  year: number;
}

export function FocusInfo({ dayOfYear, leapYear, year }: Props) {
  if (dayOfYear < 0) {
    return null;
  }
  let thisYear = year + YEAR_OFFSET;
  const date = addDays(new Date(thisYear, 2, leapYear ? 21 : 22), dayOfYear);
  return (
    <div className={styles.focusInfo}>
      <p>{`Day #${dayOfYear + 1}`}</p>
      <p>{format(date, "eee MMM do, yyyy")}</p>
    </div>
  );
}
