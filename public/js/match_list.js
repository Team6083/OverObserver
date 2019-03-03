/*
 *  Generate a row of match list with given data
 */

function renderMatchList(container, match, teams, mode) {
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    let matchAnchor = document.createElement("a");

    th.id = match;
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
                td.className = "table-danger font-weight-bold";
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
                td.className = "table-primary font-weight-bold";
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
        redScoreTd.innerText = teams.red.score + " ";
        if (teams.red.score > teams.blue.score) {
            let span = document.createElement("span");
            span.innerText = "Win";
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
        blueScoreTd.innerText = teams.blue.score + " ";
        if (teams.red.score < teams.blue.score) {
            let span = document.createElement("span");
            span.innerText = "Win";
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
