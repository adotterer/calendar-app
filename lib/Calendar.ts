export default class Calendar {
  date: Date;
  mon: number;
  monLabel: string;
  year: number;
  firstOfThisMonth: Date;
  numOfDaysInMonth: number;
  monthStartsThisDay: number;

  constructor(date: Date) {
    this.date = date;
    this.mon = this.date.getMonth() + 1; // NOT 0 indexed now
    this.monLabel = months[this.mon];
    this.year = this.date.getFullYear();
    this.firstOfThisMonth = new Date(`${this.mon}/1/${this.year}`);
    this.numOfDaysInMonth = new Date(this.year, this.mon, 0).getDate();
    this.monthStartsThisDay = this.firstOfThisMonth.getDay();
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
