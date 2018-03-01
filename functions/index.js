// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.TBAWebhook = functions.https.onRequest((req, res) => {
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  var data = req.body;
  var type = data.message_type;
  switch(type){
    case 'match_score':
      return admin.database().ref('/matchs').push(data.message_data);
    default:
      return admin.database().ref('/webhooks').push({type: type, data: data.message_data});
  }
});
