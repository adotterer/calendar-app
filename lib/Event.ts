export default class Event {
  startTime: string;
  endTime: string;

  constructor(startTime: Date, endTime: Date) {
    this.startTime = startTime.toISOString();
    this.endTime = endTime.toISOString();
  }

  localStartTime(timezone: string): string {
    return new Date(this.startTime).toLocaleString("en-US", {
      timeZone: timezone,
    });
  }

  localEndTime(timezone: string): string {
    return new Date(this.endTime).toLocaleString("en-US", {
      timeZone: timezone,
    });
  }
}

// timezone:
/* 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#locales

https://www.iana.org/time-zones
*/
