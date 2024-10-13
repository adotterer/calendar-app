export default class Calendar {
  date: Date;
  mon: number;
  monLabel: string;
  day: string;
  dayNumber: number;
  month: string;
  year: number;
  firstOfThisMonth: Date;
  numOfDaysInMonth: number;
  monthStartsThisDay: number;

  constructor(date: Date) {
    this.date = date;
    this.mon = this.date.getMonth() + 1; // NOT 0 indexed now
    this.monLabel = months[this.mon];
    this.month = monthsFull[this.mon];
    this.day = this.date.toLocaleDateString("en-US", { weekday: "long" });
    this.dayNumber = this.date.getDate();
    this.year = this.date.getFullYear();
    this.firstOfThisMonth = new Date(`${this.mon}/1/${this.year}`);
    this.numOfDaysInMonth = new Date(this.year, this.mon, 0).getDate();
    this.monthStartsThisDay = this.firstOfThisMonth.getDay();
  }

  get dateFormat() {
    return `${this.year}-${this.mon}-${this.dayNumber}`;
  }

  get prevMonth() {
    const prevMonth = this.mon - 1 > 0 ? this.mon - 1 : 12;
    const year = prevMonth !== 12 ? this.year : this.year - 1;
    const firstOfPrevMonth = new Date(`${prevMonth}/1/${year}`);

    return new Calendar(firstOfPrevMonth);
  }

  get nextMonth() {
    const nextMon = this.mon + 1 <= 12 ? this.mon + 1 : 1;
    const year = nextMon !== 1 ? this.year : this.year + 1;
    const firstOfNextMonth = new Date(`${nextMon}/1/${year}`);
    return new Calendar(firstOfNextMonth);
  }

  get firstSunday() {
    if (this.monthStartsThisDay === 0) {
      return 1;
    } else {
      let curr = this.monthStartsThisDay;
      let pointer = 1;
      while (curr % 7 !== 0) {
        curr += 1;
        pointer += 1;
      }
      return pointer;
    }
  }

  get sundays() {
    const sundays = [];
    let curr = this.firstSunday;
    while (curr <= this.numOfDaysInMonth) {
      sundays.push(curr);
      curr += 7;
    }
    return sundays;
  }

  activeWeek(activeDay: number) {
    const activeIndex = this.sundays.findIndex((sunday) => {
      const endOfWeek = sunday + 6;
      return activeDay >= sunday && activeDay <= endOfWeek;
    });

    const activeSunday = this.sundays[activeIndex];

    const week =
      activeIndex >= 0
        ? Array.from({ length: 7 }, (_, i) => {
            return i + activeSunday;
          })
        : Array.from({ length: this.sundays[0] - 1 }, (_, i) => {
            return i + 1;
          });

    return week;
  }
}

const months: { [key: number]: string } = {
  1: "JAN",
  2: "FEB",
  3: "MAR",
  4: "APR",
  5: "MAY",
  6: "JUN",
  7: "JUL",
  8: "AUG",
  9: "SEP",
  10: "OCT",
  11: "NOV",
  12: "DEC",
};

const monthsFull: { [key: number]: string } = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};
