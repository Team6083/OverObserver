"use client";
import { useParams } from "next/navigation";

import { useMatch } from "@/app/hooks";

export default function MatchPage() {
  const params = useParams<{ eventKey: string; matchKey: string }>();

  const { data: match, error, isLoading } = useMatch(params.eventKey, params.matchKey);

  return (
    <>
      <h1>Match Page</h1>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

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
    </>
  );
}
