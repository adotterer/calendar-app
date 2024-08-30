import CalendarComponent from "..";
import Calendar from "@/lib/Calendar";

import { render, screen } from "@testing-library/react";

describe("Calendar class", () => {
  test("Should display this month's calendar by default", () => {
    const today = new Calendar(new Date());
    const title = `${today.monLabel} ${today.year}`;
    const { getByText } = render(<CalendarComponent />);
    expect(getByText(title));
  });
});
