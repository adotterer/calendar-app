export default class Calendar {
  date: Date;
  mon: number;
  monLabel: string;
  constructor(date: Date) {
    this.date = date;
    this.mon = this.date.getMonth() + 1; // NOT 0 indexed now
    this.monLabel = months[this.mon];
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
