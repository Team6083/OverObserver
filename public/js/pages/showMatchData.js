const matchId = findGetParameter("match");
const eventId = findGetParameter("match").split("_")[0];
$("#matchId").html(matchId.split("_")[1]);
$("#eventId").html(eventId);

firebase.database().ref("matchs/" + eventId + "/" + matchId + "/alliances").once('value').then(function (snapshot) {
    let teamData = {};
    if (snapshot.val() != null) {
        teamData["red"] = snapshot.child("red/team_keys").val();
        teamData["blue"] = snapshot.child("blue/team_keys").val();
        teamData["red"].score = snapshot.child("red/score").val();
        teamData["blue"].score = snapshot.child("blue/score").val();
        $("#teamsTbody").append(addMatchList(matchId, teamData, 1));

        for (let i = 0; i < 3; i++) {
            $("#red" + (i + 1).toString() + " .tbody").attr("name", teamData.red[i.toString()]);
            $("#blue" + (i + 1).toString() + " .tbody").attr("name", teamData.blue[i.toString()]);
            $("#red" + (i + 1).toString() + " .title").html(teamData.red[i.toString()]);
            $("#blue" + (i + 1).toString() + " .title").html(teamData.blue[i.toString()]);
            $("#red" + (i + 1).toString() + " .editBtn").attr("href", "/matchScout.html?edit=true&team=" + teamData.red[i.toString()] + "&match=" + matchId);
            $("#blue" + (i + 1).toString() + " .editBtn").attr("href", "/matchScout.html?edit=true&team=" + teamData.blue[i.toString()] + "&match=" + matchId);
            $("#red" + (i + 1).toString()).attr("name", teamData.red[i.toString()]);
            $("#blue" + (i + 1).toString()).attr("name", teamData.blue[i.toString()]);
        }
        firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/level").once('value').then(function (snapshot) {
            if (snapshot.val() >= 4) {
                for (var i = 0; i < 3; i++) {
                    $("#red" + (i + 1).toString()).children(1).children(2).removeClass("d-none");
                    $("#blue" + (i + 1).toString()).children(1).children(2).removeClass("d-none");
                }
            }
        });
    }
});

function ajaxFetchMatch() {
    return $.ajax({
        url: "https://www.thebluealliance.com/api/v3/match/" + matchId,
        accept: 'application/json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("X-TBA-Auth-Key", "IcTRNsZoayVbU8wgZ3xRETwnw6O9kvJg4hPC6XXGHbXfDYX8COi1fTW6DCrtBTNy");
        },
        type: 'GET'
    });
}

$.when(ajaxFetchMatch()).done(function (match) {
    for (let k in match.score_breakdown.red) {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        td1.className = "table-danger";
        td1.innerText = match.score_breakdown.red[k];
        td2.innerText = k;
        td3.className = "table-primary";
        td3.innerText = match.score_breakdown.blue[k];

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        $("#matchResultTbody").append(tr);
    }
});

getScoutFormPathWithEventId(eventId, (scoutFormPath) => {
    scoutForm["scout-template"].connect("/forms/2019.json", (request) => {
        let formTemplate = request.response;
        firebase.database().ref("matchs/" + eventId + "/" + matchId + "/teamCollect").once('value').then(function (teamCollectSnapshot) {
            teamCollectSnapshot.forEach(function (teamSnapshot) {
                $("[name=\"" + teamSnapshot.key + "\"] .recorder").html(teamSnapshot.child('recorder').val());
                if (teamSnapshot.child("notShow").val()) {
                    $("[name=\"" + teamSnapshot.key + "\"] .notShow").removeClass("d-none");
                } else {
                    let data = teamSnapshot.val();
                    for(let id in formTemplate.fields){
                        let s = formTemplate.fields[id];
                        let tr = document.createElement("tr");
                        let tdTitle = document.createElement("td");
                        let tdValue = document.createElement("td");

                        if(s.shortenTitle){
                            tdTitle.innerHTML = s.shortenTitle;
                        } else {
                            tdTitle.innerHTML = s.title;
                        }

                        tr.appendChild(tdTitle);

                        if(s.type !== 'title'){
                            tdValue.innerText = data[id];
                            tr.appendChild(tdValue);
                        }

                        $("tbody[name=\"" + teamSnapshot.key + "\"]").append(tr);
                    }
                }
            });
        });
    });
});
