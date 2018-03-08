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
      return admin.database().ref('/matchs').child(data.message_data.event_key).child(data.message_data.match.key).set(data.message_data.match);
    default:
      return admin.database().ref('/webhooks').push({
        type: type,
        data: data.message_data
      });
  }
});

exports.addUserData = functions.auth.user().onCreate((event) => {
  var userData = {};

  userData["name"] = "unknow";
  userData["level"] = 1;
  userData["email"] = event.data.email;

  return admin.database().ref('/users').child(event.data.uid).set(userData);
});

exports.removeUserFromDatabase = functions.auth.user().onDelete((event) => {
  // Get the uid of the deleted user.
  var uid = event.data.uid;

  // Remove the user from your Realtime Database's /users node.
  return admin.database().ref("/users/" + uid).remove();
});

exports.updateUserName = functions.database.ref("/users/{userId}/name").onUpdate((event) => {
  var name = event.data.val();
  return admin.auth().updateUser(event.params.userId, {
    displayName: name
  }).catch((error) => {
    console.log("Error fetching user data:", error);
  });
});
