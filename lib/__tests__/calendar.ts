import Calendar from "../Calendar";

describe("Calendar class", () => {
  test("Should take in a Date and have the correct month label", () => {
    const date = new Date(2024, 7, 30); // August 30, 2024
    const calendar = new Calendar(date);

    expect(calendar.monLabel).toMatchInlineSnapshot(`"AUG"`);
  });

  test("Should calculate the correct previous month", () => {
    const date = new Date(2024, 0, 1); // January 1, 2024
    const calendar = new Calendar(date);

    expect(calendar.prevMonth.monLabel).toMatchInlineSnapshot(`"DEC"`);
  });

  test("Should calculate the correct previous year", () => {
    const date = new Date(2024, 0, 1); // January 1, 2024
    const calendar = new Calendar(date);

    expect(calendar.prevMonth.year).toBe(2023);
  });

  test("Should calculate the correct next month", () => {
    const date = new Date(2024, 11, 1); // December 1, 2024
    const calendar = new Calendar(date);

    expect(calendar.nextMonth.monLabel).toMatchInlineSnapshot(`"JAN"`);
  });

  test("Should calculate the correct next year", () => {
    const date = new Date(2024, 11, 1); // December 1, 2024
    const calendar = new Calendar(date);

    expect(calendar.nextMonth.year).toBe(2025);
  });
});
