import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

import CalendarEvent from "@/lib/Event";

export type EventData = {
  name: string;
  startTime: string;
  endTime: string;
  guests: string[];
};

type EventFormProps = {
  currentDayLabel: string;
  currentDate: string;
};

// Generate times in 30-minute intervals
const generateTimes = () => {
  const times: string[] = [];
  const startHour = 0;
  const endHour = 24;
  for (let hour = startHour; hour < endHour; hour++) {
    times.push(formatTime(hour, 0));
    times.push(formatTime(hour, 30));
  }
  return times;
};

// Format the time to 12-hour AM/PM format
const formatTime = (hour: number, minute: number): string => {
  const isPM = hour >= 12;
  const displayHour = hour % 12 || 12;
  const displayMinute = minute === 0 ? "00" : minute;
  const period = isPM ? "PM" : "AM";
  return `${displayHour}:${displayMinute} ${period}`;
};

// Convert 12-hour time to 24-hour time for comparison
const convertTo24Hour = (time: string) => {
  const [hoursMinutes, period] = time.split(" ");
  let [hours, minutes] = hoursMinutes.split(":").map(Number);
  if (period === "PM" && hours !== 12) {
    hours += 12;
  } else if (period === "AM" && hours === 12) {
    hours = 0;
  }
  return hours * 60 + minutes;
};

const CreateEventForm: React.FC<EventFormProps> = ({
  currentDayLabel,
  currentDate,
}) => {
  const { session } = useAuth();
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guests, setGuests] = useState<string[]>([]);

  const times = generateTimes();

  const handleAddGuest = () => {
    if (guestEmail && !guests.includes(guestEmail)) {
      setGuests([...guests, guestEmail]);
      setGuestEmail("");
    }
  };

  const handleRemoveGuest = (email: string) => {
    setGuests(guests.filter((guest) => guest !== email));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation: Check if the end time is after the start time
    if (convertTo24Hour(endTime) <= convertTo24Hour(startTime)) {
      alert("End time must be after the start time.");
      return;
    }

    if (name && startTime && endTime && guests.length > 0) {
      const event = new CalendarEvent(
        name,
        currentDate,
        startTime,
        endTime,
        guests
      );
      fetch("/events", {
        method: "POST",
        body: JSON.stringify({
          name,
          user_id: session?.user.id,
          start_time: event.startTimeStamp,
          end_time: event.endTimeStamp,
          guests,
        }),
      })
        .then((res) => res.json())
        .then((res) => console.log(res, "response from api"));
      // console.log(event.startTimeStamp, event.endTimeStamp, "event");
    } else {
      alert("Please fill out all fields and add at least one guest.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Event Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>{currentDayLabel}</div>
      <div>
        <label>Start Time</label>
        <select
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        >
          <option value="" disabled>
            Select Start Time
          </option>
          {times.map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>End Time</label>
        <select
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        >
          <option value="" disabled>
            Select End Time
          </option>
          {times.map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Guests</label>
        <div>
          <input
            type="email"
            value={guestEmail}
            onChange={(e) => setGuestEmail(e.target.value)}
            placeholder="Guest email"
          />
          <button type="button" onClick={handleAddGuest}>
            Add Guest
          </button>
        </div>
        <ul>
          {guests.map((guest, index) => (
            <li key={index}>
              {guest}{" "}
              <button type="button" onClick={() => handleRemoveGuest(guest)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button type="submit">Create Event</button>
    </form>
  );
};

export default CreateEventForm;
