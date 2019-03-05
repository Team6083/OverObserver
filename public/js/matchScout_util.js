function getScoutFormPathWithEventId(eventId, callback) {
    firebase.database().ref("events/" + eventId).once('value').then(function (snapshot) {
        if (snapshot.child("scoutForm").exists()) {
            const data = snapshot.child("scoutForm").val();
            callback(data);
        } else {
            if (snapshot.child("year").exists()) {
                const year = snapshot.child("year").val();
                callback("/forms/"+year+".json");
            }
        }
    });
}