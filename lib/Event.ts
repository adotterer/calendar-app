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

export default class Event {
  name: string;
  startTime: number;
  endTime: number;
  guests: Array<string>;

  constructor(name, startTime, endTime, guests) {
    this.name = name;
    this.startTime = startTime;
    this.endTime = endTime;
    this.guests = guests;
  }
}

// timezone:
/* 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#locales

https://www.iana.org/time-zones
*/

export function insertEvent() {}
