"use client";
import { useState, useEffect } from "react";
import { FaChevronRight, FaPlus, FaMinus } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa6";
import Modal from "../Modal";
import EventForm from "../EventForm";
import { EventData } from "../EventForm";
import Calendar from "@/lib/Calendar";
import { FiLogIn } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { clientSupabase } from "@/lib/supabase";
import Login from "../Login";
import LoginButton from "../Login/button";

interface CalendarComponentProps {
  date?: Date;
}

/* export async function getServerSideProps() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log(session, " from get serverside props session");
  return {
    props: {
      session,
    },
  };
} */

function onSubmit(eventData: EventData) {
  console.log(eventData);
  return true;
}

export default function MonthView({
  date = new Date(),
}: CalendarComponentProps) {
  const [calendar, setCalendar] = useState(new Calendar(date));
  const [activeDay, setActiveDay] = useState(new Date().getDate());
  const [creatingEvent, setCreatingEvent] = useState(false);
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState("");
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const getSession = async () => {
    const {
      data: { session },
    } = await clientSupabase.auth.getSession();
    console.log(session);
    if (session?.user.email) {
      setLoggedIn(session.user.email);
    }
    return session;
  };

  useEffect(() => {
    getSession();
  }, []);

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
    <>
      <div id="calendar-container">
        <div className="m-4 flex justify-between text-center lg:p-2">
          <h3 className="mx-2 month-label" role="month-label">
            {calendar.month} {calendar.year}
          </h3>
          <div className="user-controls">
            <button
              onClick={() => setLoginModalOpen(true)}
              className="flex items-center user-button"
            >
              {loggedIn ? <FaRegUser /> : <FiLogIn />}
              {loggedIn ? loggedIn : "Login"}
            </button>
            {/* <LoginButton /> */}
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
                <button
                  onClick={() => setCalendarModalOpen(true)}
                  className="select-event-day"
                >
                  {" "}
                  <FaPlus />
                </button>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
      <Modal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)}>
        <Login />
      </Modal>
      <Modal
        isOpen={calendarModalOpen}
        onClose={() => setCalendarModalOpen(false)}
      >
        <EventForm
          currentDay={calendar.day + ", " + calendar.month + " " + activeDay}
          onSubmit={onSubmit}
        />
      </Modal>
    </>
  );
}
