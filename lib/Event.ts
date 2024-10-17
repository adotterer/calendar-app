export const convertForHoursMins = (time: string) => {
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

/* export default class CalendarEvent {
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
    console.log(this.month, "month?", this.day, "day");
  }

  get startDate() {
    return new Date(
      this.year,
      this.month - 1, // month INDEX
      this.day,
      this.startHour,
      this.startMinute
    );
  }

  get endDate() {
    return new Date(
      this.year,
      this.month - 1, // month INDEX
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
 */
export class LocalEvent {
  name: string;
  calendarDays: string[];
  startTimeStamp: number;
  endTimeStamp: number;
  localStartTime: string;
  localEndTime: string;

  constructor(name: string, startTime: number, endTime: number) {
    this.name = name;
    this.startTimeStamp = startTime;
    this.endTimeStamp = endTime;
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    this.calendarDays = this.getCalendarDays(startDate, endDate);

    this.localStartTime = startDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    this.localEndTime = endDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  private getCalendarDays(startDate: Date, endDate: Date): string[] {
    const days: string[] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");

      const localFormattedDate = `${year}-${month}-${day}`; // "YYYY-MM-DD" format

      days.push(localFormattedDate);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  }
}
