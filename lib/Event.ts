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

export const formatCurrentTime = (hour: number, minutes: number) => {
  const ampm = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${formattedHour}:${minutes.toString().padStart(2, "0")} ${ampm}`;
};

export const formatHour = (hour: number) => {
  const ampm = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${formattedHour} ${ampm}`;
};

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
