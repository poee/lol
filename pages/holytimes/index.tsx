import { getYear, isLeapYear } from "date-fns";
import { FC, useState } from "react";
import { Day } from "../../src/components/calendar/Day";
import { useUpdateTitle } from "../../src/hooks/titleContext";

import styles from "./Calendar.module.css";

const YEAR_OFFSET = 2000;
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

export default function Calendar() {
  useUpdateTitle("Holytimes Calendar");
  const now = new Date();
  const legacyYear = getYear(now);

  const [year, setYear] = useState(() => legacyYear - YEAR_OFFSET);
  const leapYear = isLeapYear(new Date(year + YEAR_OFFSET, 0, 1));
  // For all the days of the year, build day elements.
  const days = Array.from({ length: 364 }, (v, i) => i).reduce<CalendarAcc>(
    (acc, dayOfYear) => {
      const isSeasonDay = dayOfYear % SEASON_LENGTH === 0;
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

      acc.elements.push(
        <Day
          className={className}
          key={dayOfYear}
          monthDay={acc.dayOfMonth}
          dayOfYear={dayOfYear + 1}
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
      <div className={styles.details}>
        Year: {year} ({YEAR_OFFSET + year})
        <button
          className={styles.yearButton}
          onClick={() => setYear((current) => current - 1)}
        >
          Prev
        </button>
        <button
          className={styles.yearButton}
          onClick={() => setYear((current) => current + 1)}
        >
          Next
        </button>
      </div>
      {leapYear && (
        <div className={`${styles.divider} ${styles.recognition}`}>
          -1 | Recognition Day
        </div>
      )}
      <section className={styles.grid}>
        <div className={styles.divider}>Month 1</div>
        <WeekRow hasSeason seasonName={SEASON_NAMES[0]} />
        {days.elements}
      </section>
      <div className={`${styles.divider} ${styles.null}`}>∅ NULL DAY ∅</div>
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
      <div className={styles.seasonLabel} title={seasonName}>{`🌍`}</div>
    )}
    <div className={styles.moon}>🌚︎</div>
    <div>♂</div>
    <div>☿</div>
    <div>♀</div>
    <div>♄</div>
    <div>🌞︎</div>
    {children}
  </>
);
