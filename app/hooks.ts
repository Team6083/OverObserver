import useSWR from "swr";

import { getAllEvents, getEventByKey } from "@/lib/event";
import { Event } from "@/lib/types";
import { useFirebase } from "./firebase-ctx";
import { getMatchesForEvent } from "@/lib/match";
import { getScoutDataForMatch, getScoutDataForMatchAndTeam } from "@/lib/scout-data";

export function useEvents() {
  const { db } = useFirebase();

  return useSWR("event", () => getAllEvents(db));
}

export function useEvent(key: string) {
  const { db } = useFirebase();

  return useSWR(["event", key], async (args): Promise<Event> => {
    const event = await getEventByKey(db, args[1]);
    if (!event) {
      throw new Error(`Event with key ${key} not found`);
    }
    return event;
  });
}

export function useMatches(eventKey: string) {
  const { db } = useFirebase();

  return useSWR(["matches", eventKey], (args) => getMatchesForEvent(db, args[1]));
}

export function useMatch(eventKey: string, matchKey: string) {
  const { db } = useFirebase();

  return useSWR(["match", eventKey, matchKey], async (args) => {
    const matches = await getMatchesForEvent(db, args[1]);
    const match = matches.find(m => m.key === args[2]);
    if (!match) {
      throw new Error(`Match with key ${matchKey} not found`);
    }
    return match;
  });
}

export function useMatchScoutData(eventKey: string, matchKey: string) {
  const { db } = useFirebase();

  return useSWR(
    ["scoutData", eventKey, matchKey],
    (args) => getScoutDataForMatch(db, args[1], args[2]),
  );
}

export function useMatchScoutDataForTeam(eventKey: string, matchKey: string, teamKey: string) {
  const { db } = useFirebase();

  return useSWR(
    ["scoutData", eventKey, matchKey, teamKey],
    (args) => getScoutDataForMatchAndTeam(db, args[1], args[2], args[3]),
  );
}
