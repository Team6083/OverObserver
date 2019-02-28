let thisEvent;
let matchType;
$("#big-tbody").html("");
$("#small-tbody").html("");

database.ref("settings").once('value').then(function (snapshot) {
    thisEvent = snapshot.child("currentEvent").val();
    matchType = snapshot.child("matchLevel").val();
    $("#thisEvent").html(thisEvent);

    firebase.database().ref('matchs/' + thisEvent).orderByChild("time").once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            const red = childSnapshot.child("alliances/red/team_keys").val();
            const blue = childSnapshot.child("alliances/blue/team_keys").val();
            if (matchType !== "a" || matchType !== "A") {
                if (matchType !== childSnapshot.child("comp_level").val()) {
                    return;
                }
            }

            let teamsData = {
                red: {
                    0: {
                        finish: false,
                        num: ""
                    },
                    1: {
                        finish: false,
                        num: ""
                    },
                    2: {
                        finish: false,
                        num: ""
                    }
                },
                blue: {
                    0: {
                        finish: false,
                        num: ""
                    },
                    1: {
                        finish: false,
                        num: ""
                    },
                    2: {
                        finish: false,
                        num: ""
                    }
                }
            };

            for (let i = 0; i < 3; i++) {
                teamsData.red[i.toString()].num = red[i.toString()];
                teamsData.red[i.toString()].finish = childSnapshot.child("teamCollect/" + red[i.toString()]).exists();
                teamsData.blue[i.toString()].num = blue[i.toString()];
                teamsData.blue[i.toString()].finish = childSnapshot.child("teamCollect/" + blue[i.toString()]).exists();
            }

            renderMatchList(document.getElementById("big-tbody"), childSnapshot.key, teamsData);
            renderMatchList(document.getElementById("small-tbody"), childSnapshot.key, teamsData, 0);

            if (childSnapshot.child("alliances/red/score").val() > childSnapshot.child("alliances/blue/score").val()) {
                $("#" + childSnapshot.key + "-small").addClass("table-danger");
                $("#" + childSnapshot.key + "-big").addClass("table-danger");
            } else if (childSnapshot.child("alliances/red/score").val() < childSnapshot.child("alliances/blue/score").val()) {
                $("#" + childSnapshot.key + "-small").addClass("table-primary");
                $("#" + childSnapshot.key + "-big").addClass("table-primary");
            }
        });
    });
});

function renderMatchList(container, match, teams, mode) {
    let tr = document.createElement("tr");
    let th = document.createElement("th");

    th.id = match;
    let matchAnchor = document.createElement("a");
    matchAnchor.className = "text-dark";
    matchAnchor.href = "showMatchData.html?match=" + match;
    matchAnchor.innerText = match.split("_")[1];
    th.appendChild(matchAnchor);

    if (mode === 0) {
        th.id = match + "-small";
        th.setAttribute("scope", "row");
        th.setAttribute("rowspan", 2);
        tr.appendChild(th);

        for (let i = 0; i < 3; i++) {
            let td = document.createElement("td");
            if (teams.red[i.toString()].finish) {
                td.className = "table-danger";
                td.innerText = teams.red[i.toString()].num;
                tr.appendChild(td);
            } else {
                td.className = "table-danger";
                let a = document.createElement("a");
                a.className = "text-dark";
                a.href = "matchScout.html?team=" + teams.red[i.toString()].num + "&match=" + match;
                a.innerText = teams.red[i.toString()].num;
                td.appendChild(a);
                tr.appendChild(td);
            }
        }
        container.appendChild(tr);

        tr = document.createElement("tr");
        for (let i = 0; i < 3; i++) {
            let td = document.createElement("td");
            if (teams.blue[i.toString()].finish) {
                td.className = "table-primary";
                td.innerText = teams.blue[i.toString()].num;
                tr.appendChild(td);
            } else {
                td.className = "table-primary";
                let a = document.createElement("a");
                a.className = "text-dark";
                a.href = "matchScout.html?team=" + teams.blue[i.toString()].num + "&match=" + match;
                a.innerText = teams.blue[i.toString()].num;
                td.appendChild(a);
                tr.appendChild(td);
            }
        }
        container.appendChild(tr);
    } else if (mode === 1) {
        if (teams.red.score > teams.blue.score) {
            tr.className = "font-weight-bold";
        }

        for (var i = 0; i < 3; i++) {
            let td = document.createElement("td");
            td.className = "table-danger";
            td.innerText = teams.red[i.toString()];
            tr.appendChild(td);
        }

        let redScoreTd = document.createElement("td");
        redScoreTd.className = "table-danger";
        redScoreTd.innerText = teams.red.score;
        if (teams.red.score > teams.blue.score) {
            let span = document.createElement("span");
            span.className = "badge badge-pill badge-success";
            redScoreTd.appendChild(span);
        }
        tr.appendChild(redScoreTd);
        container.appendChild(tr);

        tr = document.createElement("tr");
        if (teams.red.score < teams.blue.score) {
            tr.className = "font-weight-bold";
        }

        for (var i = 0; i < 3; i++) {
            let td = document.createElement("td");
            td.className = "table-primary";
            td.innerText = teams.blue[i.toString()];
            tr.appendChild(td);
        }


        let blueScoreTd = document.createElement("td");
        blueScoreTd.className = "table-primary";
        blueScoreTd.innerText = teams.blue.score;
        if (teams.red.score < teams.blue.score) {
            let span = document.createElement("span");
            span.className = "badge badge-pill badge-success";
            blueScoreTd.appendChild(span);
        }
        tr.appendChild(blueScoreTd);
        container.appendChild(tr);
    } else {
        th.id = match + "-big";
        tr.appendChild(th);

        for (let i = 0; i < 3; i++) {
            if (teams.red[i.toString()].finish) {
                let td = document.createElement("td");
                td.className = "table-danger";
                td.innerText = teams.red[i.toString()].num;
                tr.appendChild(td);
            } else {
                let td = document.createElement("td");
                td.className = "table-danger font-weight-bold";
                let a = document.createElement("a");
                a.className = "text-dark";
                a.href = "/matchScout.html?team=" + teams.red[i.toString()].num + "&match=" + match;
                a.innerText = teams.red[i.toString()].num;
                td.appendChild(a);
                tr.appendChild(td);
            }
        }

        for (let i = 0; i < 3; i++) {
            if (teams.blue[i.toString()].finish) {
                let td = document.createElement("td");
                td.className = "table-primary";
                td.innerText = teams.blue[i.toString()].num;
                tr.appendChild(td);
            } else {
                let td = document.createElement("td");
                td.className = "table-primary font-weight-bold";
                let a = document.createElement("a");
                a.className = "text-dark";
                a.href = "/matchScout.html?team=" + teams.blue[i.toString()].num + "&match=" + match;
                a.innerText = teams.blue[i.toString()].num;
                td.appendChild(a);
                tr.appendChild(td);
            }
        }
        container.appendChild(tr);
    }
}