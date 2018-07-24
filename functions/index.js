// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.TBAWebhook = functions.https.onRequest((req, res) => {
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  var data = req.body;
  var type = data.message_type;
  switch (type) {
    case 'match_score':
      var matchData = data.message_data.match;
      delete matchData["score_breakdown"];
      delete matchData["alliances"].teams;
      return admin.database().ref('/matchs').child(data.message_data.event_key).child(data.message_data.match.key).update(matchData);
    default:
      return admin.database().ref('/webhooks').push({
        type: type,
        data: data.message_data
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

exports.updateNumber = functions.database.ref("/matchs/{eventId}/{matchId}/teamCollect/{teamId}").onWrite((change, event) => {
  var sourceData = change.after.val();
  if(!change.after.exists()) return;
  var data = {};
  data["auto-scale"] = parseInt(sourceData["auto-scale"]);
  data["auto-scale-try"] = parseInt(sourceData["auto-scale-try"]);
  data["auto-switch"] = parseInt(sourceData["auto-switch"]);
  data["auto-switch-try"] = parseInt(sourceData["auto-switch-try"]);
  data["tele-scale"] = parseInt(sourceData["tele-scale"]);
  data["tele-scale-try"] = parseInt(sourceData["tele-scale-try"]);
  data["tele-switch"] = parseInt(sourceData["tele-switch"]);
  data["tele-switch-try"] = parseInt(sourceData["tele-switch-try"]);
  data["tele-exchange"] = parseInt(sourceData["tele-exchange"]);
  data["tele-exchange-try"] = parseInt(sourceData["tele-exchange-try"]);
  data["drive-tech"] = parseInt(sourceData["drive-tech"]);
  return admin.database().ref("/matchs/" + event.params.eventId + "/" + event.params.matchId + "/teamCollect/" + event.params.teamId).update(data);
});
