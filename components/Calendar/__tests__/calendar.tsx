import CalendarComponent from "..";
import Calendar from "@/lib/Calendar";

import { render } from "@testing-library/react";

describe("<Calendar />", () => {
  test("Should display today's month calendar by default", () => {
    const today = new Calendar(new Date());
    const title = `${today.monLabel} ${today.year}`;
    const { getByText } = render(<CalendarComponent />);
    expect(getByText(title));
  });
});
