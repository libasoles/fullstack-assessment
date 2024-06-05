import dayjs, { Dayjs } from "dayjs";
import duration from "dayjs/plugin/duration";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(duration);

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("UTC");

type DaySince = (aDate: Dayjs | string) => string;
export const daysSince: DaySince = (aDate) => {
  const startDate = dayjs(aDate);
  const today = dayjs();

  const difference = Math.abs(today.diff(startDate));

  const duration = dayjs.duration(difference);

  const amounts = [duration.years(), duration.months(), duration.days()];

  const suffixes = ["y", "m", "d"];
  const separator = " - ";

  const formattedDuration = amounts
    .map((amount, i) => (amount === 0 ? null : amount + suffixes[i]))
    .filter(Boolean)
    .join(separator);

  if (!formattedDuration) return "today";

  return formattedDuration;
};
