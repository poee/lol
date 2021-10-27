import clsx from "clsx";
import { getYear, isLeapYear } from "date-fns";
import Link from "next/link";
import { FC, useState } from "react";

import { Day } from "./Day";
import { useUpdateTitle } from "../../hooks/titleContext";

import styles from "./calendar.module.css";
import { YEAR_OFFSET, MONTH_NAMES, SEASON_NAMES } from "./constants";
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
  const [year, setYear] = useState(() => getYear(new Date()) - YEAR_OFFSET);
  const leapYear = isLeapYear(new Date(year + YEAR_OFFSET, 0, 1));

  const [focusedDay, setFocusedDay] = useState(-1);

  // For all the days of the year, build day elements.
  const days = Array.from(
    { length: leapYear ? 366 : 365 },
    (v, i) => i
  ).reduce<CalendarAcc>(
    (acc, dayOrd) => {
      if ([182, 183].includes(dayOrd)) {
        if (leapYear && dayOrd === 182) {
          acc.elements.push(
            <Day
              key={dayOrd}
              className={styles.season}
              dayOfYear={dayOrd}
              isFocused={focusedDay === dayOrd}
              monthDay="-1"
              setFocus={setFocusedDay}
            />,
            <div className={`${styles.gap} ${styles.leap}`}>Calendar Day</div>
          );
          acc.dayOfMonth = 0;
          acc.dayOfWeek = 0;
          return acc;
        }
        if (dayOrd === (leapYear ? 183 : 182)) {
          acc.elements.push(
            <Day
              key={dayOrd}
              className={styles.season}
              dayOfYear={dayOrd}
              isFocused={focusedDay === dayOrd}
              monthDay="∅"
              setFocus={setFocusedDay}
            />,
            <div className={`${styles.gap} ${styles.null}`}>NULL DAY</div>
          );
          acc.dayOfMonth = 0;
          acc.dayOfWeek = 0;
          return acc;
        }
      }

      const isSeasonDay = leapYear
        ? [0, 91, 184, 275].includes(dayOrd)
        : [0, 91, 183, 274].includes(dayOrd);
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
          key={dayOrd}
          className={className}
          dayOfYear={dayOrd}
          isFocused={focusedDay === dayOrd}
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
      <div className={styles.year}>
        <button
          className={styles.yearButton}
          onClick={() => setYear((current) => current - 1)}
        >
          Prev
        </button>
        <div>
          Year: {year}
          <div className={styles.dayOfYear}>{YEAR_OFFSET + year}</div>
        </div>
        <button
          className={styles.yearButton}
          onClick={() => setYear((current) => current + 1)}
        >
          Next
        </button>
      </div>
      <section className={styles.grid}>{days.elements}</section>
      <FocusInfo dayOfYear={focusedDay} leapYear={leapYear} year={year} />
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
