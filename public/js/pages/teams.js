const teamId = findGetParameter("team");
$("#thisTeam").html(teamId);

database.ref("settings").once('value').then(function (snapshot) {
    const eventId = snapshot.child("currentEvent").val();
    $("#thisEvent").html(eventId);

    scoutForm["scout-template"].connect("/forms/2019.json", (request) => {
        const formTemplate = request.response.fields;
        const teamStatTemplate = request.response.teamStat;
        let container = document.getElementById("container");

        findMatchWithTeam(eventId, teamId, (matches) => {
            getAllTeamCollect(matches, teamId, (teamCollect) => {

                // remove broken match
                for (let i in teamCollect) {
                    let s = teamCollect[i];
                    if (s[teamStatTemplate.robotBrokeId]) {
                        teamCollect.pop(s);
                    }
                }

                for (let id in teamStatTemplate.dataSet) {
                    let s = teamStatTemplate.dataSet[id];

                    let tr = document.createElement("tr");
                    let th = document.createElement("th");
                    th.setAttribute("scope", "row");
                    let tdMin = document.createElement("td");
                    let tdAvg = document.createElement("td");
                    let tdMax = document.createElement("td");

                    if (s.type === "default") {
                        s = formTemplate[id];
                    }

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
                            tdAvg.innerText = res.avg;
                            tdMax.innerText = res.max;
                            setTextColor(tdMax, 0);
                            setTextColor(tdMin, 0);
                            setTextColor(tdAvg, 0);
                            tdAvg.innerText = res.avg + " (total: " + res.count + ")";
                            break;
                        case "successRate":
                            let successRateRes = calculateSuccessRate(s.successId, s.failId, teamCollect);
                            let maxMinAvg = calculateMinAvgMax(s.successId, teamCollect);
                            console.log(successRateRes);
                            tdMin.innerText = maxMinAvg.min;
                            tdMax.innerText = maxMinAvg.max;
                            tdAvg.innerText = successRateRes.successRate;
                            setTextColor(tdMax, 0);
                            setTextColor(tdMin, 0);
                            setTextColor(tdAvg, 1);
                            tdMin.innerText = tdMin.innerText + "/" + successRateRes.count;
                            tdMax.innerText = tdMax.innerText + "/" + successRateRes.count;
                            break;
                        case "count":
                        case "boolean":
                        case "checkbox":
                            let count = 0;
                            for (let i in teamCollect) {
                                let d = teamCollect[i];
                                if (typeof d === 'boolean' && d) {
                                    count++;
                                } else if (typeof d === 'number') {
                                    count += d;
                                }
                            }
                            tdAvg.innerText = count;
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
});

function setTextColor(target, mode) {
    let val = parseFloat(target.innerText);

    let successLimit = 4;
    let warningLimit = 2;

    if (mode === 1) {
        successLimit = 0.7;
        warningLimit = 0.3;
    }

    if (val >= successLimit) {
        target.classList.add("text-success");
    } else if (val < successLimit && val >= warningLimit) {
        target.classList.add("text-warning");
    } else if (val < warningLimit) {
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

            if (d[targetId] < min || data[0][targetId] === 0) {
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

function calculateSuccessRate(successId, failId, data) {
    let totalCount = 0;
    let successCount = 0;
    let failCount = 0;
    for (let i in data) {
        let d = data[i];
        totalCount += d[successId] + d[failId];
        successCount += d[successId];
        failCount += d[failId];
    }

    return {
        "successRate": successCount / totalCount,
        "count": totalCount,
        "failCount": failCount,
        "successCount": successCount
    };
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