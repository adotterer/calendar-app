import CalendarComponent from "..";
import Calendar from "@/lib/Calendar";
import userEvent from "@testing-library/user-event";

import { render } from "@testing-library/react";

describe("<Calendar />", () => {
  test("Should display today's month calendar by default", () => {
    const today = new Calendar(new Date());
    const title = `${today.monLabel} ${today.year}`;
    const { getByText } = render(<CalendarComponent />);
    expect(getByText(title));
  });

  test("Next button should show next month", async () => {
    const user = userEvent.setup();

    const { getByRole } = render(
      <CalendarComponent date={new Date(2024, 0, 1)} />
    );
    const previous = getByRole("previous");
    const monthLabel = getByRole("month-label");
    await user.click(previous);
    expect(monthLabel).toMatchInlineSnapshot(`
<h3
  role="month-label"
>
  DEC
   
  2023
</h3>
`);
  });

  test("Previous button should show previous month", async () => {
    const user = userEvent.setup();

    const { getByRole } = render(
      <CalendarComponent date={new Date(2024, 0, 1)} />
    );
    const next = getByRole("next");
    const monthLabel = getByRole("month-label");
    await user.click(next);
    expect(monthLabel).toMatchInlineSnapshot(`
<h3
  role="month-label"
>
  FEB
   
  2024
</h3>
`);
  });
});
