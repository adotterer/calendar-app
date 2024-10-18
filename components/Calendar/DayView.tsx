import { useView } from "@/context/ViewContext";
import { FaChevronLeft } from "react-icons/fa6";
import { useMemo, useEffect, useRef } from "react";

interface CalendarComponentProps {
  date?: Date;
}

export default function DayView({ date = new Date() }: CalendarComponentProps) {
  const { setView } = useView();
  const hoursRef = useRef<HTMLDivElement>(null); // Reference to the scrollable container

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
      <nav>
        <div
          onClick={() => setView("month")}
          className="cursor-pointer flex items-center"
        >
          <FaChevronLeft />
          October
        </div>
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
        <div>13</div>
        <div>14</div>
        <div>15</div>
        <div>16</div>
        <div>17</div>
        <div>18</div>
        <div>19</div>
      </div>

      <div className="flex justify-center active-day-label">
        Friday October 8, 2024
      </div>

      <div className="day-times" ref={hoursRef}>
        {/* Map over the hours array to dynamically create the hour blocks */}
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
                  <div
                    className="current-time-label"
                    style={
                      {
                        // marginLeft: "10px",
                      }
                    }
                  >
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
