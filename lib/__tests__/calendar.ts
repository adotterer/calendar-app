import Calendar from "../Calendar";

describe("Calendar class", () => {
  test("Should take in a Date and have the correct month label", () => {
    const date = new Date(2024, 7, 30); // August 30, 2024
    const calendar = new Calendar(date);
    expect(calendar.monLabel).toMatchInlineSnapshot(`"AUG"`);
  });
});
