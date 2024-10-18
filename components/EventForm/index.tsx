import { useState, useCallback, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { convertForHoursMins } from "@/lib/Event";

export type EventData = {
  name: string;
  startTime: string;
  endTime: string;
  guests: string[];
};

type EventFormProps = {
  currentDate: string;
};

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

const formatTime = (hour: number, minute: number): string => {
  const isPM = hour >= 12;
  const displayHour = hour % 12 || 12;
  const displayMinute = minute === 0 ? "00" : minute;
  const period = isPM ? "PM" : "AM";
  return `${displayHour}:${displayMinute} ${period}`;
};

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

const CreateEventForm: React.FC<EventFormProps> = ({ currentDate }) => {
  const { session, email } = useAuth();
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(currentDate);
  const [endDate, setEndDate] = useState(currentDate);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guests, setGuests] = useState<string[]>(email ? [email] : []);

  useEffect(() => {
    console.log(startDate, endDate, "?");
    if (new Date(endDate) < new Date(startDate)) {
      setEndDate(startDate);
    }
  }, [startDate, endDate]);

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

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (convertTo24Hour(endTime) <= convertTo24Hour(startTime)) {
        alert("End time must be after the start time.");
        return;
      }

      if (name && startTime && endTime && guests.length > 0) {
        const [startYear, startMonth, startDay] = startDate
          .split("-")
          .map(Number);
        const [endYear, endMonth, endDay] = endDate.split("-").map(Number);
        const [startHour, startMin] = convertForHoursMins(startTime);
        const [endHour, endMin] = convertForHoursMins(endTime);
        const startDateApi = new Date(
          startYear,
          startMonth - 1,
          startDay,
          startHour,
          startMin
        );

        const endDateApi = new Date(
          endYear,
          endMonth - 1,
          endDay,
          endHour,
          endMin
        );
        fetch("/events", {
          method: "POST",
          body: JSON.stringify({
            name,
            user_id: session?.user.id,
            start_time: startDateApi.getTime(),
            end_time: endDateApi.getTime(),
            guests,
          }),
        })
          .then((res) => res.json())
          .then((res) => console.log(res, "response from api"));
      } else {
        alert("Please fill out all fields and add at least one guest.");
      }
    },
    [startTime, endTime, endDate, guests, name, session?.user.id, startDate]
  );

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

      <div>
        <label>Start Date</label>
        <input
          onChange={(e) => setStartDate(e.target.value)}
          value={startDate}
          type="date"
          required
        />
      </div>
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
        <label>End Date</label>
        <input
          onChange={(e) => setEndDate(e.target.value)}
          value={endDate}
          type="date"
          required
        />
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
