function getScoutFormPathWithEventId(eventId, callback) {
    firebase.database().ref("events/" + eventId + "/scoutForm").once('value').then(function (snapshot) {
        if (snapshot.exists()) {
            const data = snapshot.val();
            callback(data);
        }
    });
}