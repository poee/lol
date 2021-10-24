import { ReactNode } from "react";

interface Props {
  className: string;
  dayOfYear: number;
  monthDay: ReactNode;
}
export function Day({ className, dayOfYear, monthDay }: Props) {
  return (
    <div className={className}>
      {monthDay} ({dayOfYear})
    </div>
  );
}
