// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.TBAWebhook = functions.https.onRequest((req, res) => {
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  const data = req.body;
  const type = data.message_type;

  res.status(200).end();

  switch (type) {
    case 'match_score':
      let matchData = data.message_data.match;
      delete matchData["score_breakdown"];

      matchData["alliances"].red.team_keys = matchData["alliances"].red.teams;
      matchData["alliances"].blue.team_keys = matchData["alliances"].blue.teams;
      delete matchData["alliances"].red.teams;
      delete matchData["alliances"].blue.teams;

      return admin.database().ref('/matchs').child(data.message_data.match.event_key).child(data.message_data.match.key).update(matchData);
    default:
      return admin.database().ref('/webhooks').push({
        type: type,
        data: data.message_data,
        time: new Date().toUTCString()
      });
  }
});

exports.addUserData = functions.auth.user().onCreate((user) => {
  var userData = {};

  userData["name"] = "unknow";
  userData["level"] = 1;
  userData["email"] = user.email;
  return admin.database().ref('/users').child(user.uid).set(userData);
});

exports.removeUserFromDatabase = functions.auth.user().onDelete((user) => {
  // Get the uid of the deleted user.
  var uid = user.uid;

  // Remove the user from your Realtime Database's /users node.
  return admin.database().ref("/users/" + uid).remove();
});

exports.updateUserName = functions.database.ref("/users/{userId}/name").onUpdate((change, event) => {
  var data = change.after;
  var name = data.val();
  return admin.auth().updateUser(event.params.userId, {
    displayName: name
  }).catch((error) => {
    console.log("Error fetching user data:", error);
  });
});
