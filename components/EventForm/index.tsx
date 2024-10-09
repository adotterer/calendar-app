import React, { useState } from "react";

type EventFormProps = {
  onSubmit: (eventData: EventData) => void; // Function to handle form submission
};

type EventData = {
  name: string;
  startTime: string; // Using ISO string format for start and end times
  endTime: string;
  guests: string[]; // List of guest email addresses
};

const CreateEventForm: React.FC<EventFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guests, setGuests] = useState<string[]>([]);

  const handleAddGuest = () => {
    if (guestEmail && !guests.includes(guestEmail)) {
      setGuests([...guests, guestEmail]);
      setGuestEmail(""); // Clear the input field after adding a guest
    }
  };

  const handleRemoveGuest = (email: string) => {
    setGuests(guests.filter((guest) => guest !== email));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation
    if (name && startTime && endTime && guests.length > 0) {
      const eventData: EventData = {
        name,
        startTime,
        endTime,
        guests,
      };
      onSubmit(eventData); // Submit the form data
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

      <div>
        <label>Start Time</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
      </div>

      <div>
        <label>End Time</label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
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
