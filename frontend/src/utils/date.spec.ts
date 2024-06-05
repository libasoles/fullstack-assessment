import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { daysSince } from "./date";

describe("duration", () => {
  const mockedDate = new Date("2024-7-1");

  beforeEach(() => {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.tz.setDefault("UTC");

    jest.useFakeTimers();
    jest.setSystemTime(mockedDate);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should return the duration in days", () => {
    const aDate = dayjs("2024, 7, 6");

    const timePeriod = daysSince(aDate);

    expect(timePeriod).toEqual("5d");
  });

  it("should return the duration in months", () => {
    const aDate = dayjs("2024, 8, 6");

    const timePeriod = daysSince(aDate);

    expect(timePeriod).toEqual("1m - 5d");
  });

  it("should return the duration in years", () => {
    const aDate = dayjs("2025, 7, 6");

    const timePeriod = daysSince(aDate);

    expect(timePeriod).toEqual("1y - 5d");
  });

  it("should accept a string as startDate", () => {
    const aDate = "2024-08-06";

    const timePeriod = daysSince(aDate);

    expect(timePeriod).toEqual("1m - 5d");
  });

  it("should return 'today' if the date is today", () => {
    const today = dayjs(mockedDate);

    const timePeriod = daysSince(today);

    expect(timePeriod).toEqual("today");
  });
});
