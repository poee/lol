import clsx from "clsx";
import { addDays, format, getYear, isLeapYear, setDayOfYear } from "date-fns";
import { FC, useState } from "react";
import ReactTooltip from "react-tooltip";

import { Day } from "./Day";
import { useUpdateTitle } from "../../hooks/titleContext";

import styles from "./calendar.module.css";

const YEAR_OFFSET = 2000;
const DOY_OFFSET = 78;
const SEASON_LENGTH = 91;
const SEASON_NAMES = [
  "Northward Equinox",
  "Northern Solstice",
  "Sothward Equinox",
  "Southern Solstice",
];

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

  const [focusedDay, setFocusedDay] = useState(1);

  // For all the days of the year, build day elements.
  const days = Array.from({ length: 364 }, (v, i) => i).reduce<CalendarAcc>(
    (acc, dayOrd) => {
      const isSeasonDay = dayOrd % SEASON_LENGTH === 0;
      if (acc.dayOfMonth === 31) {
        acc.dayOfMonth = 1;
        acc.month += 1;
        acc.elements.push(
          <div className={styles.divider}>Month {acc.month}</div>,
          <WeekRow
            hasSeason={isSeasonDay}
            seasonName={isSeasonDay ? SEASON_NAMES[acc.season - 1] : undefined}
          />
        );
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

      // The ordinal day is not exactly equivalent to dayOfYear.
      // Add 1 to correct 0-index, and add another 1 on leap years
      // to reflect day (-1)
      const dayOfYear = dayOrd + 1 + (leapYear ? 1 : 0);
      acc.elements.push(
        <Day
          key={dayOfYear}
          className={className}
          dayOfYear={dayOfYear}
          isFocused={focusedDay === dayOfYear}
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
      <ReactTooltip
        getContent={(dayTip) => {
          const dayOfYear = parseInt(dayTip);
          if (isNaN(dayOfYear)) {
            console.log("nan", { dayOfYear });
            return "error";
          }
          let thisYear = year + YEAR_OFFSET;
          const date = addDays(
            new Date(thisYear, 2, 20),
            leapYear ? dayOfYear - 2 : dayOfYear - 1
          );
          return (
            <div className={styles.tooltip}>
              <p>{`Day #${dayOfYear}`}</p>
              <p>{format(date, "eee MMM do, yyyy")}</p>
            </div>
          );
        }}
        effect="solid"
        place="bottom"
      />
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
      <section className={styles.grid}>
        {leapYear && (
          <div className={`${styles.divider} ${styles.recognition}`}>
            -1 | Deliberation Day
          </div>
        )}
        <div className={styles.divider}>Month 1</div>
        <WeekRow hasSeason seasonName={SEASON_NAMES[0]} />
        {days.elements}
        <div className={`${styles.divider} ${styles.null}`}>∅ NULL DAY ∅</div>
      </section>
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
