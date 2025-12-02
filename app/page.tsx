"use client";
import { useState } from "react";

import { useEvents } from "./hooks";

export default function Home() {
  const { data, error, isLoading } = useEvents();

  const [fetchKey, setFetchKey] = useState("");

  return (<>
    <h1>Home</h1>

    <input type="text" placeholder="Event Key to Update" value={fetchKey} onChange={(e) => setFetchKey(e.target.value)} />
    <button onClick={() => { }}>Update Event</button>

    <h2>All Events</h2>

    {isLoading && <p>Loading events...</p>}
    {error && <p>Error loading events: {error.message}</p>}

    {data && (
      <ul>
        {data.map((event) => (
          <li key={event.id}>
            {event.name} ({event.key}){" - "}
            {event.city}, {event.stateProv}, {event.country}{" "}
            [{event.startDate.toDateString()} to {event.endDate.toDateString()}]
          </li>
        ))}
      </ul>
    )}
  </>);
}
