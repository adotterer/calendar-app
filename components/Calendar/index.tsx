"use client"; // This is a client component 👈🏽
import { useState } from "react";

import Calendar from "@/lib/Calendar";

export default function CalendarComponent() {
  const [calendar] = useState(new Calendar(new Date()));
  const daysArray = Array.from(
    { length: calendar.numOfDaysInMonth },
    (_, i) => i + 1
  );

  return (
    <div>
      <div className="flex justify-center text-center border-solid border-2 border-indigo-600">
        <h3>
          {calendar.monLabel} {calendar.year}
        </h3>
      </div>
      <div id="calendar" className="flex flex-wrap">
        {daysArray.map((day) => (
          <div
            className="h-12 w-12 border-solid border-2 border-indigo-600"
            key={day}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
