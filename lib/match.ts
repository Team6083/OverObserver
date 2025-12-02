import { collection, DocumentData, Firestore, getDocs } from "firebase/firestore";
import { Match } from "./types";

function mapDocumentToMatch(data: DocumentData, docId: string): Match & { id: string } {
  return {
    id: docId,

    key: data.key,
    eventKey: data.eventKey,
    compLevel: data.compLevel,
    setNumber: data.setNumber,
    matchNumber: data.matchNumber,

    time: data.time.toDate(),
    predictedTime: data.predictedTime?.toDate(),
    actualTime: data.actualTime?.toDate(),
    postResultTime: data.postResultTime?.toDate(),

    alliances: {
      red: {
        teamKeys: data.alliances.red.teamKeys,
        score: data.alliances.red.score,
        surrogateTeamKeys: data.alliances.red.surrogateTeamKeys,
        dqTeamKeys: data.alliances.red.dqTeamKeys,
      },
      blue: {
        teamKeys: data.alliances.blue.teamKeys,
        score: data.alliances.blue.score,
        surrogateTeamKeys: data.alliances.blue.surrogateTeamKeys,
        dqTeamKeys: data.alliances.blue.dqTeamKeys,
      },
    },
    winningAlliance: data.winningAlliance,
  };
}

export async function getMatchesForEvent(db: Firestore, eventKey: string): Promise<(Match & { id: string })[]> {
  const querySnapshot = await getDocs(collection(db, "events", eventKey, "matches"));
  const docs = querySnapshot.docs.map((docSnapshot) => mapDocumentToMatch(docSnapshot.data(), docSnapshot.id));
  return docs;
}
