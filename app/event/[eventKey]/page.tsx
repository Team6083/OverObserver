"use client";

import { useEvent, useMatches } from "@/app/hooks";
import { useParams } from "next/navigation";

export default function EventPage() {
  const params = useParams<{ eventKey: string }>();

  const { data: event, error: eventError, isLoading: eventIsLoading } = useEvent(params.eventKey);
  const { data: matches, error: matchesError, isLoading: matchesIsLoading } = useMatches(params.eventKey);

  return <>
    <h1>Event Page for {params.eventKey}</h1>

    {eventIsLoading && <p>Loading event data...</p>}
    {eventError && <p style={{ color: 'red' }}>Error loading event: {eventError.message}</p>}

    {event && (
      <div>
        <h2>{event.year} {event.name} ({event.key})</h2>
        <p>
          Location: {event.city}, {event.stateProv}, {event.country}<br />
          Dates: {event.startDate.toDateString()} to {event.endDate.toDateString()}<br />
          Timezone: {event.timezone}<br />
          Week: {event.week}<br />
          Event Code: {event.eventCode}<br />
          Archived: {event.archived ? "Yes" : "No"}
        </p>
      </div>
    )}

    <h2>Matches</h2>
    {matchesIsLoading && <p>Loading matches...</p>}
    {matchesError && <p style={{ color: 'red' }}>Error loading matches: {matchesError.message}</p>}

    {matches && (
      <ul>
        {matches.map((match) => (
          <li key={match.id}>
            Match {match.matchNumber}{" - "}
            {match.alliances.red.teamKeys.join(", ")} vs {match.alliances.blue.teamKeys.join(", ")}{" - "}
            Score: {match.alliances.red.score} to {match.alliances.blue.score}
          </li>
        ))}
      </ul>
    )}
  </>;
}
