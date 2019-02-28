const teamId = findGetParameter("team");
$("#thisTeam").html(teamId);

database.ref("settings").once('value').then(function (snapshot) {
    const eventId = snapshot.child("currentEvent").val();
    $("#thisEvent").html(eventId);

    scoutForm["scout-template"].connect("/forms/2019.json", (request) => {
        const formTemplate = request.response;
        let container = document.getElementById("container");

        findMatchWithTeam(eventId, teamId, (matches) => {
            getAllTeamCollect(matches, teamId, (teamCollect) => {
                for (let id in formTemplate.fields) {
                    let s = formTemplate.fields[id];

                    let tr = document.createElement("tr");
                    let th = document.createElement("th");
                    th.setAttribute("scope", "row");
                    let tdMin = document.createElement("td");
                    let tdAvg = document.createElement("td");
                    let tdMax = document.createElement("td");

                    if (s.shortenTitle) {
                        th.innerHTML = s.shortenTitle;
                    } else {
                        th.innerHTML = s.title;
                    }

                    tr.appendChild(th);

                    if (s.type === "title") {
                        container.appendChild(tr);
                        continue;
                    }

                    switch (s.type) {
                        case "number":
                        case "integer":
                            let res = calculateMinAvgMax(id, teamCollect);
                            tdMin.innerText = res.min;
                            tdAvg.innerText = res.avg + " (total: " + res.count + ")";
                            tdMax.innerText = res.max;
                            setTextColor(tdMax, res.max);
                            setTextColor(tdMin, res.min);
                            setTextColor(tdAvg, res.avg);
                            break;
                        case "boolean":
                        case "checkbox":

                            break;
                    }

                    tr.appendChild(tdMax);
                    tr.appendChild(tdMin);
                    tr.appendChild(tdAvg);

                    container.appendChild(tr);
                }
            });

        });
    });

    // teamStat(eventId, teamId);
});

function setTextColor(target, val) {
    if (val >= 4) {
        target.classList.add("text-success");
    } else if (val < 4 && val > 1) {
        target.classList.add("text-warning");
    } else if (val <= 2 && val >= 0) {
        target.classList.add("text-danger");
    }
}

function calculateMinAvgMax(targetId, data) {
    let max = data[0][targetId];
    let min = data[0][targetId];
    let sum = 0;
    let count = 0;
    for (let i in data) {
        let d = data[i];
        if (d[targetId] !== 0) {
            count++;
            sum += d[targetId];

            if (d[targetId] > max) {
                max = d[targetId];
            }

            if (d[targetId] < min) {
                min = d[targetId];
            }

        }
    }

    let avg = 0;
    if (count > 0) {
        avg = sum / count;
    }

    return {"max": max, "min": min, "avg": avg, "count": count};
}


function getAllTeamCollect(targetMatches, team, callback) {
    let data = [];
    let event = targetMatches[0].split('_')[0];

    firebase.database().ref("matchs/" + event).once('value', function (snapshot) {
        let matches = snapshot.val();
        for (let i in targetMatches) {
            let match = targetMatches[i];
            if (snapshot.child(match + "/teamCollect/" + team).exists()) {
                data.push(snapshot.child(match + "/teamCollect/" + team).val());
            }
        }
        callback(data);
    });
}

function findMatchWithTeam(eventId, teamId, callback) {
    let matchsKey = [];
    firebase.database().ref("matchs/" + eventId).orderByChild('time').once('value', function (snapshot) {
        snapshot.forEach(function (singleMatch) {
            let red = singleMatch.child("alliances/red/team_keys").val();
            for (let i in red) {
                if (red[i] === teamId) {
                    matchsKey.push(singleMatch.key);
                    return;
                }
            }

            let blue = singleMatch.child("alliances/blue/team_keys").val();
            for (let i in blue) {
                if (blue[i] === teamId) {
                    matchsKey.push(singleMatch.key);
                    return;
                }
            }
        });
        callback(matchsKey);
    });
}