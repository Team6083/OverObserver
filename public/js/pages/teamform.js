//fetch data for edit mode
firebase.database().ref("matchs/" + eventId + "/" + matchId + "/teamCollect/" + teamId).once('value').then(function (snapshot) {
    if (snapshot.exists()) {
        if (data["notShow"]) {
            return;
        }
        getTeamformWithEventId(eventId, (fieldData) => {
            const data = snapshot.val();
            for (const key in fieldData.fields) {
                const field = fieldData.fields[key];

                if (field.type === 'boolean') {
                    if (data[field.name]) {
                        $("#" + field.Ttag).parent().addClass("active");
                    } else {
                        $("#" + field.Ftag).parent().addClass("active");
                    }
                } else {
                    $("#" + field.name).val(data[field.name]);
                }
            }
        });
    }
});

function writeTeamFormToDB(event, match, team, data) {
    firebase.database().ref("matchs/" + event + "/" + match + "/teamCollect/" + team).update(data, function (error) {
        if (error != null) {
            alert(error.code);
        }
    });
}

getTeamformWithEventId(eventId, function (data) {
    const yearData = data.fields;
    $("#sendConfBtn").click(function () {
        let data = {};
        for (const k in yearData) {
            const f = yearData[k];
            data = writeTeamFormData(f, data);
        }

        data["notShow"] = false;
        if (editing !== 'true') {
            data["recorder"] = firebase.auth().currentUser.displayName;
        }
        writeTeamFormToDB(eventId, matchId, teamId, data);
        if (editing !== 'true') {
            window.location = "/";
        } else {
            window.location = '/showMatchData.html?match=' + matchId;
        }
    })
});

$("#notShowBtn").click(function () {
    var data = {};
    if (editing !== 'true') {
        data["recorder"] = firebase.auth().currentUser.displayName;
    }
    data["notShow"] = true;
    writeTeamFormToDB(eventId, matchId, teamId, data);
    if (editing !== 'true') {
        window.location = "/";
    } else {
        window.location = '/showMatchData.html?match=' + matchId;
    }

});
