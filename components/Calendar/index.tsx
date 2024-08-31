"use client"; // This is a client component 👈🏽
import { useState } from "react";

import Calendar from "@/lib/Calendar";

interface CalendarComponentProps {
  date?: Date;
}

export default function CalendarComponent({
  date = new Date(),
}: CalendarComponentProps) {
  const [calendar, setCalendar] = useState(new Calendar(date));
  const [activeDay, setActiveDay] = useState(new Date().getDate());

  const activeWeek = calendar.activeWeek(activeDay);

  const daysArray = Array.from(
    { length: calendar.numOfDaysInMonth },
    (_, i) => {
      return {
        day: i + 1,
        activeWeek: activeWeek.includes(i + 1),
        activeDay: i + 1 === activeDay,
      };
    }
  );

  return (
    <div id="calendar-container">
      <div className="flex justify-between text-center p-2">
        <h3 role="month-label">
          {calendar.monLabel} {calendar.year}
        </h3>
        <div role="controls">
          <button
            onClick={() => setCalendar(calendar.prevMonth)}
            role="previous"
          >
            Prev
          </button>
          <button onClick={() => setCalendar(calendar.nextMonth)} role="next">
            Next
          </button>
        </div>
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
            return <div key={calendar.mon + i} className="day"></div>;
          }
        )}
        {daysArray.map(({ day, activeWeek, activeDay }) => (
          <div
            className={`day ${activeDay ? "active-day" : null} ${
              activeWeek ? "active-week" : null
            }`}
            key={day}
            onClick={() => setActiveDay(day)}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
