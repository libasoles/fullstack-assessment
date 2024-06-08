import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

export function mockSystemDate(date: Date) {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault("UTC");

  jest.useFakeTimers();
  jest.setSystemTime(date);
}
