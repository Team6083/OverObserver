function getTeamsData(eventId, teamId, callBack) {
    var outData = [];
    firebase.database().ref("matchs/" + eventId).orderByChild('time').once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            if (childSnapshot.child('teamCollect/' + teamId).exists()) {
                if (childSnapshot.child('teamCollect/' + teamId + '/notShow').val() == false) {
                    outData.push(childSnapshot.child('teamCollect/' + teamId).val());
                }
            }
        });
        callBack(outData);
    });
}