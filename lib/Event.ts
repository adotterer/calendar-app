const convertForHoursMins = (time: string) => {
  // time: "10:00 PM"
  const [hoursMinutes, period] = time.split(" ");
  let [hours, minutes] = hoursMinutes.split(":").map(Number);
  if (period === "PM" && hours !== 12) {
    hours += 12;
  } else if (period === "AM" && hours === 12) {
    hours = 0;
  }
  return [hours, minutes];
};

export default class CalendarEvent {
  name: string;
  date: string; //  "YYYY-MM-DD" format
  startTime: string;
  endTime: string;
  guests: Array<string>;
  year: number;
  month: number;
  day: number;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;

  constructor(
    name: string,
    date: string,
    startTime: string, // example: "10:30 PM"
    endTime: string, //  example: "11:00 PM"
    guests: Array<string>
  ) {
    this.name = name;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
    this.guests = guests;
    [this.year, this.month, this.day] = this.date.split("-").map(Number);
    [this.startHour, this.startMinute] = convertForHoursMins(this.startTime);
    [this.endHour, this.endMinute] = convertForHoursMins(this.endTime);
  }

  get startDate() {
    return new Date(
      this.year,
      this.month,
      this.day,
      this.startHour,
      this.startMinute
    );
  }

  get endDate() {
    return new Date(
      this.year,
      this.month,
      this.day,
      this.endHour,
      this.endMinute
    );
  }
  get startTimeStamp() {
    return this.startDate.getTime();
  }

  get endTimeStamp() {
    return this.endDate.getTime();
  }
}

// timezone:
/* 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#locales

https://www.iana.org/time-zones
*/

export function insertEvent() {}
