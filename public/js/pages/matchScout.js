const teamId = findGetParameter("team");
const matchId = findGetParameter("match");
if (teamId != null) {
    $("#teamId").html(findGetParameter("team"));
}

if (matchId != null) {
    $("#matchId").html(findGetParameter("match").split("_")[1].toUpperCase());
}
const eventId = findGetParameter("match").split("_")[0];
const editing = findGetParameter("edit");
// Fetching GET data

if (editing === 'true') {
    $("#backToListBtn").attr('href', '/showMatchData.html?match=' + matchId);
}

//Load form
getTeamformWithEventId(eventId, function(data) {
    for (const key in data.fields) {
        let formItem = data.fields[key];
        console.log(formItem);
        $("#formContent").append(renderTeamformItem(formItem));
    }
    reloadNumberBtn();
});

//fetch data for edit mode
firebase.database().ref("matchs/" + eventId + "/" + matchId + "/teamCollect/" + teamId).once('value').then(function (snapshot) {
    if (snapshot.exists()) {
        if (snapshot.val()["notShow"]) {
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

function writeScoutResultToDB(event, match, team, data) {
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
            data = encodeTeamformData(f, data);
        }

        data["notShow"] = false;
        if (editing !== 'true') {
            data["recorder"] = firebase.auth().currentUser.displayName;
        }
        writeScoutResultToDB(eventId, matchId, teamId, data);
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
    writeScoutResultToDB(eventId, matchId, teamId, data);
    if (editing !== 'true') {
        window.location = "/";
    } else {
        window.location = '/showMatchData.html?match=' + matchId;
    }

});
