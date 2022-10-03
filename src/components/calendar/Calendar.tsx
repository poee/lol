import clsx from "clsx";
import { getDayOfYear, getYear, isLeapYear } from "date-fns";
import Link from "next/link";
import { FC, useState } from "react";

import { Day } from "./Day";
import { useUpdateTitle } from "../../hooks/titleContext";

import styles from "./calendar.module.css";
import { DOY_OFFSET, YEAR_OFFSET, MONTH_NAMES, SEASON_NAMES } from "./constants";
import { FocusInfo } from "./FocusInfo";

type CalendarAcc = {
  dayOfWeek: number;
  dayOfMonth: number;
  season: number;
  month: number;
  elements: JSX.Element[];
};

export function Calendar() {
  useUpdateTitle("Holytimes Calendar");
  const today = new Date()
  const [year, setYear] = useState(() => getYear(today));
  const leapYear = isLeapYear(new Date(year, 0, 1)); // was Jan 1st of this year a leap year?

  const [focusedDay, setFocusedDay] = useState(getDayOfYear(today) - DOY_OFFSET);

  // For all the days of the year, build day elements.
  const days = Array.from(
    { length: leapYear ? 366 : 365 },
    (v, i) => i
  ).reduce<CalendarAcc>(
    (acc, dayIdx) => {
      if ([182, 183].includes(dayIdx)) {
      if (dayIdx === 182) {
          acc.elements.push(
            <Day
              key={dayIdx}
              className={styles.season}
              dayOfYear={dayIdx}
              isFocused={focusedDay === dayIdx}
              monthDay="∅"
              setFocus={setFocusedDay}
            />,
            <div className={`${styles.gap} ${styles.null}`}>INTERMISSION</div>
          );
          acc.dayOfMonth = 0;
          acc.dayOfWeek = 0;
          return acc;
        }
        if (leapYear && dayIdx === 183) {
          acc.elements.push(
            <Day
              key={dayIdx}
              className={styles.season}
              dayOfYear={dayIdx}
              isFocused={focusedDay === dayIdx}
              monthDay="#"
              setFocus={setFocusedDay}
            />,
            <div className={`${styles.gap} ${styles.leap}`}>Calendar Day (leap years only)</div>
          );
          acc.dayOfMonth = 0;
          acc.dayOfWeek = 0;
          return acc;
        }
      }

      const isSeasonDay = leapYear
        ? [0, 91, 184, 275].includes(dayIdx)
        : [0, 91, 183, 274].includes(dayIdx);
      if (acc.dayOfMonth % 31 === 0) {
        acc.elements.push(
          <div key={`month-${acc.month}`} className={styles.month}>
            Month {acc.month} -- {MONTH_NAMES[acc.month - 1]}
          </div>,
          <WeekRow
            key={`month-week-${acc.month}`}
            hasSeason={isSeasonDay}
            seasonName={isSeasonDay ? SEASON_NAMES[acc.season - 1] : undefined}
          />
        );
        acc.dayOfMonth = 1;
        acc.month += 1;
      }
      let className = "";
      if (isSeasonDay) {
        // This is a season day
        className = styles.season;
        acc.season += 1;
        acc.dayOfMonth = 0;
        acc.dayOfWeek = 0;
      }

      if (acc.dayOfWeek % 6 === 1) {
        acc.dayOfWeek = 1;
        className = styles.moon;
      }

      acc.elements.push(
        <Day
          key={dayIdx}
          className={className}
          dayOfYear={dayIdx}
          isFocused={focusedDay === dayIdx}
          monthDay={acc.dayOfMonth}
          setFocus={setFocusedDay}
        />
      );
      acc.dayOfMonth += 1;
      acc.dayOfWeek += 1;
      return acc;
    },
    {
      dayOfWeek: 0,
      dayOfMonth: 0,
      season: 1,
      month: 1,
      elements: [],
    }
  );

  return (
    <>
      <p>
        <Link href="/holytimes/info">More Information</Link>
      </p>
      <FocusInfo dayOfYear={focusedDay} leapYear={leapYear} year={year} />
      <div className={styles.year}>
        <button
          className={styles.yearButton}
          onClick={() => setYear((current) => current - 1)}
        >
          Prev
        </button>
        <div>
          Year: {year - YEAR_OFFSET}
          <div className={styles.dayOfYear}>{year}</div>
        </div>
        <button
          className={styles.yearButton}
          onClick={() => setYear((current) => current + 1)}
        >
          Next
        </button>
      </div>
      <section className={styles.grid}>{days.elements}</section>
    </>
  );
}

const WeekRow: FC<{ hasSeason: boolean; seasonName?: string }> = ({
  children,
  hasSeason,
  seasonName,
}) => (
  <>
    {hasSeason && (
      <div
        className={clsx(styles.seasonLabel, styles.weekday)}
        title={seasonName}
      >{`🌍`}</div>
    )}
    <div className={clsx(styles.moon, styles.weekday)}>🌚︎</div>
    <div className={styles.weekday}>♂</div>
    <div className={styles.weekday}>☿</div>
    <div className={styles.weekday}>♀</div>
    <div className={styles.weekday}>♄</div>
    <div className={styles.weekday}>🌞︎</div>
    {children}
  </>
);
