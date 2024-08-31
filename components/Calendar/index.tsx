"use client"; // This is a client component 👈🏽
import { useState } from "react";

import Calendar from "@/lib/Calendar";

interface CalendarComponentProps {
  date?: Date;
}

export default function CalendarComponent({
  date = new Date(),
}: CalendarComponentProps) {
  const [calendar] = useState(new Calendar(date));
  const daysArray = Array.from(
    { length: calendar.numOfDaysInMonth },
    (_, i) => i + 1
  );

  return (
    <div>
      <div className="flex justify-center text-center border-solid border-2 border-indigo-600">
        <h3 role="month-label">
          {calendar.monLabel} {calendar.year}
        </h3>
        <button role="previous">Prev</button>
        <button role="next">Next</button>
      </div>
      <div id="calendar" className="flex flex-wrap">
        <div className="flex justify-center">SUN</div>
        <div className="flex justify-center">MON</div>
        <div className="flex justify-center">TUS</div>
        <div className="flex justify-center">WED</div>
        <div className="flex justify-center">THU</div>
        <div className="flex justify-center">FRI</div>
        <div className="flex justify-center">SAT</div>
        {Array.from({ length: calendar.monthStartsThisDay }, (_, i) => i).map(
          (_, i) => {
            return (
              <div
                key={calendar.mon + i}
                className="h-12 w-12 border-solid border-2 border-sky-50"
              ></div>
            );
          }
        )}
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
