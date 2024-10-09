"use client"; // This is a client component 👈🏽
import { useState, useEffect } from "react";
import { FaChevronRight, FaPlus } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa6";

import Calendar from "@/lib/Calendar";

interface CalendarComponentProps {
  date?: Date;
}

export default function MonthView({
  date = new Date(),
}: CalendarComponentProps) {
  const [calendar, setCalendar] = useState(new Calendar(date));
  const [activeDay, setActiveDay] = useState(new Date().getDate());
  const [creatingEvent, setCreatingEvent] = useState(false);

  const activeWeek = calendar.activeWeek(activeDay);

  useEffect(() => {
    if (activeDay > calendar.numOfDaysInMonth) {
      setActiveDay(calendar.numOfDaysInMonth);
    }
  }, [calendar, activeDay]);

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
      <div className="m-4 flex justify-between text-center p-2">
        <h3 className="mx-2 month-label" role="month-label">
          {calendar.monLabel} {calendar.year}
        </h3>
        <div className="controls" role="controls">
          <button
            onClick={() => setCreatingEvent((b) => !b)}
            id="create-event"
            className="flex items-center"
          >
            <FaPlus /> Create Event
          </button>
          <button
            onClick={() => {
              setCreatingEvent(false);
              setCalendar(calendar.prevMonth);
            }}
            role="previous"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={() => {
              setCreatingEvent(false);
              setCalendar(calendar.nextMonth);
            }}
            role="next"
          >
            <FaChevronRight />
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
            className={`day ${activeDay ? "active-day" : ""} ${
              activeWeek ? "active-week" : ""
            } ${creatingEvent && activeWeek ? "creating-event" : ""}`}
            key={day}
            onClick={() => setActiveDay(day)}
          >
            <span>{day}</span>
            {activeDay && creatingEvent ? (
              <span className="select-event-day">
                {" "}
                <FaPlus />
              </span>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
