import { useState, FormEvent } from "react";
export type EventData = {
  name: string;
  startTime: string;
  endTime: string;
  guests: string[];
};

type EventFormProps = {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (eventData: EventData) => boolean;
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

const convertForHoursMins = (time: string) => {
  const [hoursMinutes, period] = time.split(" ");
  let [hours, minutes] = hoursMinutes.split(":").map(Number);
  if (period === "PM" && hours !== 12) {
    hours += 12;
  } else if (period === "AM" && hours === 12) {
    hours = 0;
  }
  return [hours, minutes];
};

const CreateEventForm: React.FC<EventFormProps> = ({
  currentDayLabel,
  currentDate,
}) => {
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
      const [year, month, day] = currentDate.split("-").map(Number); // Assuming currentDay is in "YYYY-MM-DD" format
      console.log(currentDate, "current date");

      const [startHour, startMinute] = convertForHoursMins(startTime);
      const startDate = new Date(year, month, day, startHour, startMinute);
      const startTimeStamp = startDate.getTime();
      console.log(startTimeStamp, "start time stamp");

      console.log(startHour, startMinute, "start");
      const [endHour, endMinute] = convertForHoursMins(endTime);
      const endDate = new Date(year, month, day, endHour, endMinute);
      const endTimeStamp = endDate.getTime();
      console.log(endTimeStamp, "end time stamp");
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
