const teamId = findGetParameter("team");
$("#thisTeam").html(teamId)



$.when(ajaxTeamSimple(teamId)).done(function (team) {
    $("#teamName").html(team.nickname);
});

database.ref("settings").once('value').then(function (snapshot) {
    const eventId = snapshot.child("currentEvent").val();

    $.when(ajaxTeamEventStatus(teamId, eventId)).done(function (team) {
        console.log(team);
        $("#ranking").html(team.qual.ranking.rank);
        $("#overallStatus").html(team.overall_status_str);
        $("#playedMatch").html(team.qual.ranking.matches_played);
    });

    $("#thisEvent").html(eventId);
    getScoutFormPathWithEventId(eventId, (scoutFormPath) => {
        scoutForm["scout-template"].connect(scoutFormPath, (request) => {
            const formTemplate = request.response.fields;
            let teamStatTemplate = request.response.teamStat;
            if (teamStatTemplate === undefined) {
                teamStatTemplate = {};
                teamStatTemplate.dataSet = {};
                for (let id in formTemplate) {
                    teamStatTemplate.dataSet[id] = { "type": "default" }
                }
            }

            let container = document.getElementById("container");

            findMatchWithTeam(eventId, teamId, (matches) => {
                getAllTeamCollect(matches, teamId, (teamCollect) => {

                    // remove broken match
                    for (let i in teamCollect) {
                        let s = teamCollect[i];
                        if (teamStatTemplate.robotBrokeId !== undefined) {
                            if (s[teamStatTemplate.robotBrokeId]) {
                                teamCollect.pop(s);
                            }
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
                            case "average":
                                let res = calculateMinAvgMax(id, teamCollect);
                                tdMin.innerText = res.min;
                                tdAvg.innerText = res.avg;
                                tdMax.innerText = res.max;
                                setTextColor(tdMax, 0);
                                setTextColor(tdMin, 0);
                                setTextColor(tdAvg, 0);
                                tdAvg.innerText = res.avg + " (match count: " + res.countMatch + ")";
                                break;
                            case "successRate":
                                let successRateRes = calculateSuccessRate(s.successId, s.failId, teamCollect);
                                let maxMinAvg = calculateMinAvgMax(s.successId, teamCollect);
                                tdMin.innerText = maxMinAvg.min;
                                tdMax.innerText = maxMinAvg.max;
                                tdAvg.innerText = successRateRes.rate;
                                setTextColor(tdMax, 0);
                                setTextColor(tdMin, 0);
                                setTextColor(tdAvg, 1);
                                if (successRateRes.count !== 0) {
                                    tdAvg.innerText = tdAvg.innerText + " (count: " + successRateRes.count + ")";
                                }
                                break;
                            case "count":
                            case "boolean":
                            case "checkbox":
                                let count = 0;
                                for (let i in teamCollect) {
                                    let d = teamCollect[i][s.targetId];
                                    if (typeof d === 'boolean' && d) {
                                        count++;
                                    } else if (typeof d === 'number') {
                                        count += d;
                                    }
                                }
                                tdAvg.innerText = count;
                                break;
                            case "countEnum":
                                let countEnum = 0;

                                for (let i in teamCollect) {
                                    let d = teamCollect[i][s.targetId];
                                    if (d === s.targetEnum) {
                                        countEnum++;
                                    }
                                }
                                tdAvg.innerText = countEnum;
                                break;
                            case "dumpAll":
                                for (let i in teamCollect) {
                                    console.log(teamCollect[i]);
                                    let d = teamCollect[i][s.targetId];
                                    // console.log(d);
                                    if (d !== "") {
                                        tdAvg.innerHTML = tdAvg.innerHTML + d + "<br>";
                                    }
                                }
                                break;
                            case "countAll":
                                let counts = {};
                                for (let i in teamCollect) {
                                    let d = teamCollect[i][s.targetId];
                                    if (counts[d]) {
                                        counts[d]++;
                                    } else {
                                        counts[d] = 1;
                                    }
                                }

                                let out = "";
                                for (let i in s.targetEnums) {
                                    i = parseInt(i);
                                    let field = s.targetEnums[i];
                                    out += (i !== 0 ? " / " : "") + (counts[field] || 0);
                                }

                                tdAvg.innerHTML = out;
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
    let max = data[0] ? data[0][targetId] : 0;
    let min = data[0] ? data[0][targetId] : 0;
    let sum = 0;
    let countMatch = 0;
    for (let i in data) {
        let d = data[i];
        if (d[targetId] !== 0) {
            countMatch++;
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
    if (countMatch > 0) {
        avg = sum / countMatch;
    }

    return { "max": max, "min": min, "avg": avg, "countMatch": countMatch };
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
        "rate": successCount / totalCount,
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