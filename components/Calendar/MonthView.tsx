"use client";
import { useState, useEffect, useMemo } from "react";
import { FaChevronRight, FaPlus, FaMinus } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa6";
import Modal from "../Modal";
import EventForm from "../EventForm";
import LoginButton from "../AuthForm/button";
import { useView } from "@/context/ViewContext";

export default function MonthView() {
  const {
    setView,
    calendar,
    setCalendar,
    activeDay,
    setActiveDay,
    activeWeek,
    eventsForThisMonth,
  } = useView();

  const [creatingEvent, setCreatingEvent] = useState(false);
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);

  const highlightedWeek = useMemo(() => {
    const highlightedDays: number[] = [];

    const isSequential = activeWeek.every((day, index) => {
      if (index === 0) return true;
      return day === activeWeek[index - 1] + 1;
    });

    if (!isSequential) {
      activeWeek.forEach((day) => {
        if (activeDay > 20 && day > 20) {
          highlightedDays.push(day);
        } else if (activeDay < 10 && day < 10) {
          highlightedDays.push(day);
        }
      });
    } else {
      return activeWeek;
    }

    return highlightedDays;
  }, [activeDay, activeWeek]);

  const daysArray = Array.from(
    { length: calendar.numOfDaysInMonth },
    (_, i) => {
      return {
        day: i + 1,
        activeWeek: highlightedWeek.includes(i + 1),
        activeDay: i + 1 === activeDay,
      };
    }
  );

  useEffect(() => {
    if (activeDay > calendar.numOfDaysInMonth) {
      setActiveDay(calendar.numOfDaysInMonth);
    }
  }, [calendar, activeDay, setActiveDay]);

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
  }, [eventsForThisMonth, creatingEvent, setView, daysArray, setActiveDay]);

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
