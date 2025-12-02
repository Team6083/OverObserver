"use client";
import { useParams } from "next/navigation";

import { useMatch, useMatchScoutData } from "@/app/hooks";

export default function MatchPage() {
  const params = useParams<{ eventKey: string; matchKey: string }>();

  const { data: match, error: matchError, isLoading: matchLoading } = useMatch(params.eventKey, params.matchKey);
  const { data: scoutData, error: scoutDataError, isLoading: scoutDataLoading } = useMatchScoutData(params.eventKey, params.matchKey);

  return (
    <>
      <h1>Match Page</h1>

      {matchLoading && <p>Loading...</p>}
      {matchError && <p>Error: {matchError.message}</p>}

      <div>
        {match && (
          <>
            <h2>
              Match {match.matchNumber} at Event {params.eventKey}
            </h2>
            <p>
              {match.alliances.red.teamKeys.join(", ")} vs {match.alliances.blue.teamKeys.join(", ")}
            </p>
            <p>
              Score: {match.alliances.red.score} - {match.alliances.blue.score}
            </p>
          </>
        )}
      </div>

      <h1>Scout Data</h1>

      {scoutDataLoading && <p>Loading scout data...</p>}
      {scoutDataError && <p>Error loading scout data: {scoutDataError.message}</p>}

      <div>
        {scoutData && scoutData.length === 0 ? (
          <p>No scout data available for this match.</p>
        ) : (
          <ul>
            {scoutData?.map((data) => (
              <li key={data.id}>
                Team {data.teamKey}: {JSON.stringify(data.data)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
