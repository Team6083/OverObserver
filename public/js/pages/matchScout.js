const teamId = findGetParameter("team");
const matchId = findGetParameter("match");
if (teamId != null) {
    $("#teamId").html(findGetParameter("team"));
}

if (matchId != null) {
    $("#matchId").html(findGetParameter("match").split("_")[1].toUpperCase());
}
const eventId = findGetParameter("match").split("_")[0];
const editing = findGetParameter("edit") === 'true';
// Fetching GET data

if (editing) {
    $("#backToListBtn").attr('href', '/showMatchData.html?match=' + matchId);
}

//render form
let form;

getScoutFormPathWithEventId(eventId, (path) => {
    scoutForm["scout-template"].connect(path, (request) => {
        form = scoutForm["scout-form"].create(request.response);
        console.log(request.response);
        const container = document.getElementById('formContent');

        firebase.database().ref("matchs/" + eventId + "/" + matchId + "/teamCollect/" + teamId).once('value').then(function (snapshot) {
            if (snapshot.exists() && !snapshot.val()["notShow"]) {
                const data = snapshot.val();
                form.render(container, data);
            } else {
                form.render(container);
            }

            $(".integer-input").bootstrapNumber({
                upClass: 'primary',
                downClass: 'danger',
                center: true
            });

            $(".integer-input").attr("disabled", true);
        });
    });
});

function writeScoutResultToDB(event, match, team, data) {
    firebase.database().ref("matchs/" + event + "/" + match + "/teamCollect/" + team).update(data, function (error) {
        if (error != null) {
            alert(error.code);
        }
    });
}

$("#sendConfBtn").click(function () {
    let data = form.getData();

    data["notShow"] = false;
    if (!editing) {
        data["recorder"] = firebase.auth().currentUser.displayName;
    }
    writeScoutResultToDB(eventId, matchId, teamId, data);
    if (!editing) {
        window.location = "/";
    } else {
        window.location = '/showMatchData.html?match=' + matchId;
    }
})

$("#notShowBtn").click(function () {
    let data = {};
    if (!editing) {
        data["recorder"] = firebase.auth().currentUser.displayName;
    }
    data["notShow"] = true;
    writeScoutResultToDB(eventId, matchId, teamId, data);
    if (!editing) {
        window.location = "/";
    } else {
        window.location = '/showMatchData.html?match=' + matchId;
    }
});
