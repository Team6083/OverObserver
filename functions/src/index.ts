/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {setGlobalOptions} from "firebase-functions";
import {onRequest} from "firebase-functions/https";
import {beforeUserCreated} from "firebase-functions/identity";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({maxInstances: 10});

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// Accept webhook POSTs from The Blue Alliance
export const tbaWebhook = onRequest(async (request, response) => {
  const data = request.body;

  if (!data || typeof data !== "object" || !data.message_type) {
    response.status(400).send("Invalid TBA webhook payload");
    return;
  }

  const messageType = data.message_type;

  switch (messageType) {
  case "match_score": {
    // TODO: re-implement this
    const matchData = data.message_data.match;
    delete matchData["score_breakdown"];

    matchData["alliances"].red.team_keys = matchData["alliances"].red.teams;
    matchData["alliances"].blue.team_keys = matchData["alliances"].blue.teams;
    delete matchData["alliances"].red.teams;
    delete matchData["alliances"].blue.teams;

    await admin.database().ref("/matchs")
      .child(data.message_data.match.event_key)
      .child(data.message_data.match.key)
      .update(matchData);

    break;
  }
  default:
    await admin.database().ref("/webhooks").push({
      type: messageType,
      data: data.message_data,
      time: new Date().toUTCString(),
    });
  }

  response.status(201).end();
});

export const addUserData = beforeUserCreated(async (event) => {
  const uid = event.data?.uid;
  if (!uid) {
    logger.error("No uid found in user creation event");
    return;
  }

  logger.log("New user created with uid:", uid);

  return admin.database().ref("/users")
    .child(uid).set({
      name: event.data?.displayName || "unknow",
      level: 1,
      email: event.data?.email,
    });
});


