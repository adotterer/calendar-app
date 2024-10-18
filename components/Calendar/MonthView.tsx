"use client";
import { useState, useEffect, useMemo } from "react";
import { FaChevronRight, FaPlus, FaMinus } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa6";
import Modal from "../Modal";
import EventForm from "../EventForm";
import Calendar from "@/lib/Calendar";
import LoginButton from "../AuthForm/button";
import { useAuth } from "@/context/AuthContext";
import { useView } from "@/context/ViewContext";
import { LocalEvent } from "@/lib/Event";

type CalendarDayEvents = {
  [day: number]: LocalEvent[];
};

export default function MonthView() {
  const { userEvents } = useAuth();
  const {
    setView,
    calendar,
    setCalendar,
    activeDay,
    setActiveDay,
    activeWeek,
  } = useView();

  const [creatingEvent, setCreatingEvent] = useState(false);
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);

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

  useEffect(() => {
    if (activeDay > calendar.numOfDaysInMonth) {
      setActiveDay(calendar.numOfDaysInMonth);
    }
  }, [calendar, activeDay]);

  const eventsForThisMonth = useMemo(() => {
    return userEvents.reduce<CalendarDayEvents>((acc, userEvent) => {
      userEvent.calendarDays.forEach((curr) => {
        const [year, month, day] = curr.split("-").map(Number);

        if (calendar.year === year && calendar.mon === month) {
          if (acc[day]) {
            acc[day].push(userEvent);
          } else {
            acc[day] = [userEvent];
          }
        }
      });
      return acc;
    }, {});
  }, [calendar, userEvents]);

  const daysComponents = useMemo(() => {
    return daysArray.map(({ day, activeWeek, activeDay }) => {
      const getClassNames = () => {
        let classNames = "day";
        if (activeDay) classNames += " active-day";
        if (activeWeek) classNames += " active-week";
        if (creatingEvent && activeWeek) classNames += " creating-event";
        return classNames;
      };

      return (
        <div
          className={getClassNames()}
          key={day}
          onClick={() => setActiveDay(day)}
        >
          <div className="flex">{day}</div>

          {eventsForThisMonth[day]?.map((event) => (
            <div
              onClick={() => {
                setView("day");
              }}
              className="flex event-block cursor-pointer"
              key={event.name}
            >
              {event.name}
            </div>
          ))}

          {activeDay && creatingEvent && (
            <button
              onClick={() => setCalendarModalOpen(true)}
              className="select-event-day"
            >
              <FaPlus />
            </button>
          )}
        </div>
      );
    });
  }, [eventsForThisMonth, activeWeek, activeDay, creatingEvent]);

  return (
    <>
      <div id="calendar-container">
        <div className="m-4 flex justify-between text-center lg:p-2">
          <h3 className="mx-2 month-label" role="month-label">
            {calendar.month} {calendar.year}
          </h3>
          <div className="user-controls">
            <LoginButton />
            <button
              onClick={() => setCreatingEvent((b) => !b)}
              className="flex items-center user-button"
            >
              {creatingEvent ? <FaMinus /> : <FaPlus />} Create Event
            </button>
            <div className="month-controls" role="controls">
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
                <div key={calendar.mon + i} className="day empty-day"></div>
              );
            }
          )}
          {daysComponents}
        </div>
      </div>
      <Modal
        isOpen={calendarModalOpen}
        onClose={() => setCalendarModalOpen(false)}
      >
        <EventForm
          currentDate={`${calendar.year}-${calendar.mon}-${activeDay}`}
        />
      </Modal>
    </>
  );
}
