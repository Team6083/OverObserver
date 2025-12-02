import { collection, doc, DocumentData, Firestore, getDoc, getDocs } from "firebase/firestore";

import { ScoutData } from "./types";

function mapDocumentToScoutData(data: DocumentData, id: string): ScoutData & { id: string } {
  return {
    id,

    matchKey: data.matchKey,
    teamKey: data.teamKey,

    userId: data.userId,
    data: data.data,
  }
}

export async function getScoutDataForMatch(
  db: Firestore, eventKey: string, matchKey: string,
): Promise<(ScoutData & { id: string })[]> {
  const querySnapshot = await getDocs(collection(db, "events", eventKey, "matches", matchKey, "scoutData"));
  const docs = querySnapshot.docs.map((docSnapshot) => mapDocumentToScoutData(docSnapshot.data(), docSnapshot.id));
  return docs;
}

export async function getScoutDataForMatchAndTeam(
  db: Firestore, eventKey: string, matchKey: string, teamKey: string,
): Promise<(ScoutData & { id: string }) | null> {
  const documentSnapshot = await getDoc(doc(collection(db, "events", eventKey, "matches", matchKey, "scoutData"), teamKey));

  const data = documentSnapshot.data();
  if (!documentSnapshot.exists() || !data) {
    return null;
  }

  return mapDocumentToScoutData(data, documentSnapshot.id);
}
