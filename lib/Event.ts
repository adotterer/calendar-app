export default class Event {
  startTime: string;
  endTime: string;

  constructor(startTime: Date, endTime: Date) {
    this.startTime = startTime.toISOString();
    this.endTime = endTime.toISOString();
  }

  getStartTimeForUser(timezone: string): string {
    return new Date(this.startTime).toLocaleString("en-US", {
      timeZone: timezone,
    });
  }

  getEndTimeForUser(timezone: string): string {
    return new Date(this.endTime).toLocaleString("en-US", {
      timeZone: timezone,
    });
  }
}
