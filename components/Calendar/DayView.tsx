import { useView } from "@/context/ViewContext";
import { FaChevronLeft } from "react-icons/fa6";
import LoginButton from "../AuthForm/button";
import { useMemo, useEffect, useRef } from "react";

export default function DayView() {
  const {
    setView,
    calendar,
    setCalendar,
    activeDay,
    setActiveDay,
    activeWeek,
  } = useView();

  const hoursRef = useRef<HTMLDivElement>(null);

  const hours = useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);

  const currentHour = new Date().getHours();
  const currentMinutes = new Date().getMinutes();

  const formatHour = (hour: number) => {
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour} ${ampm}`;
  };

  useEffect(() => {
    if (hoursRef.current) {
      const currentHourElement = document.getElementById(`hour-${currentHour}`);
      if (currentHourElement) {
        currentHourElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [currentHour]);

  const formatCurrentTime = (hour: number, minutes: number) => {
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  };

  return (
    <div id="day-view">
      <nav className="day-nav flex flex-row justify-between">
        <div
          onClick={() => setView("month")}
          className="month-view-button cursor-pointer flex items-center"
        >
          <FaChevronLeft />
          {calendar.month}
        </div>
        <LoginButton />
      </nav>

      <div className="day-weekdays">
        <div>S</div>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
      </div>

      <div className="day-weekdays">
        {activeWeek.map((day) => {
          return (
            <div>
              <span
                onClick={() => setActiveDay(day)}
                className={`${
                  activeDay === day ? "day-active" : ""
                } day-label cursor-pointer`}
              >
                {day}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center active-day-label">
        {calendar.month} {activeDay}, {calendar.year}
      </div>

      <div className="day-times" ref={hoursRef}>
        {hours.map((hour) => (
          <div key={hour} id={`hour-${hour}`} className="hour">
            <div className="hour-label">{formatHour(hour)}</div>
            <div className="hour-block" style={{ position: "relative" }}>
              {hour === currentHour && (
                <div
                  className="current-time"
                  style={{
                    position: "absolute",
                    top: `${(currentMinutes / 60) * 100}%`, // Position based on how far we are in the hour
                    left: "0",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="current-time-indicator"
                    style={{
                      height: "2px",
                      flexGrow: 1,
                    }}
                  />
                  <div className="current-time-label">
                    {formatCurrentTime(currentHour, currentMinutes)}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
