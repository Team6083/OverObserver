import { collection, doc, DocumentData, Firestore, getDoc, getDocs } from "firebase/firestore";

import { Event } from "./types";

function mapDocumentToEvent(data: DocumentData, docId: string): Event & { id: string } {
  return {
    id: docId,

    key: data.key,
    year: data.year,
    eventCode: data.eventCode,
    eventType: data.eventType,
    week: data.week,

    name: data.name,
    shortName: data.shortName,

    country: data.country,
    stateProv: data.stateProv,
    city: data.city,
    address: data.address,

    startDate: data.startDate.toDate(),
    endDate: data.endDate.toDate(),
    timezone: data.timezone,

    scoutForm: data.scoutForm,
    archived: data.archived,
  };
}

export async function getAllEvents(db: Firestore): Promise<(Event & { id: string })[]> {
  const querySnapshot = await getDocs(collection(db, "events"));
  const docs = querySnapshot.docs.map((docSnapshot) => mapDocumentToEvent(docSnapshot.data(), docSnapshot.id));
  return docs;
}

export async function getEventByKey(db: Firestore, key: string): Promise<(Event & { id: string }) | null> {
  const documentSnapshot = await getDoc(doc(collection(db, "events"), key));
  const data = documentSnapshot.data();

  if (!documentSnapshot.exists() || !data) {
    return null;
  }

  return mapDocumentToEvent(data, documentSnapshot.id);
}
