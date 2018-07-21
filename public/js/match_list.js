/*
 *  Generate a row of match list with given data
 */
function addMatchList(match, teams, mode) {
  var tr = "<tr>";
  if (mode == 0) {
    tr += "<th id=\""+match+"-small\" scope=\"row\" rowspan=\"2\">" + "<a class=\"text-dark\" href=\"showMatchData.html?match="+match+"\">" + match.split("_")[1] + "</a></th>";
    for (var i = 0; i < 3; i++) {
      if (teams.red[i.toString()].finish) {
        tr += "<td class=\"table-danger\">";
        tr += teams.red[i.toString()].num;
        tr += "</td>";
      } else {
        tr += "<td class=\"table-danger font-weight-bold\">";
        tr += "<a href=\"/teamform.html?team=" + teams.red[i.toString()].num + "&match=" + match + "\" class=\"text-dark\">";
        tr += teams.red[i.toString()].num;
        tr += "</a>"
        tr += "</td>";
      }
    }
    tr += "</tr><tr>";
    for (var i = 0; i < 3; i++) {
      if (teams.blue[i.toString()].finish) {
        tr += "<td class=\"table-primary\">";
        tr += teams.blue[i.toString()].num;
        tr += "</td>";
      } else {
        tr += "<td class=\"table-primary font-weight-bold\">";
        tr += "<a href=\"/teamform.html?team=" + teams.blue[i.toString()].num + "&match=" + match + "\" class=\"text-dark\">";
        tr += teams.blue[i.toString()].num;
        tr += "</a>"
        tr += "</td>";
      }
    }
  } else if (mode == 1) {
    tr = "";
    if(teams.red.score > teams.blue.score){
      tr += "<tr class=\"font-weight-bold\">";
    }else {
      tr += "<tr>";
    }

    for (var i = 0; i < 3; i++) {
      tr += "<td class=\"table-danger\">";
      tr += teams.red[i.toString()];
      tr += "</td>";
    }
    tr += "<td class=\"table-danger\">";
    tr += teams.red.score;
    if(teams.red.score > teams.blue.score){
      tr += "  <span class=\"badge badge-pill badge-success\">Win</span>";
    }
    tr += "</td>";
    tr += "</tr>";

    if(teams.red.score < teams.blue.score){
      tr += "<tr class=\"font-weight-bold\">";
    }else {
      tr += "<tr>";
    }

    for (var i = 0; i < 3; i++) {
      tr += "<td class=\"table-primary\">";
      tr += teams.blue[i.toString()];
      tr += "</td>";
    }
    tr += "<td class=\"table-primary\">";
    tr += teams.blue.score;
    if(teams.red.score < teams.blue.score){
      tr += "  <span class=\"badge badge-pill badge-success\">Win</span>";
    }
    tr += "</td>";
  } else {
    tr += "<th id=\""+match+"-big\" scope=\"row\">";
    tr += "<a class=\"text-dark\" href=\"showMatchData.html?match="+ match + "\">";
    tr += match.split("_")[1];
    tr += "</a></th>"
    for (var i = 0; i < 3; i++) {
      if (teams.red[i.toString()].finish) {
        tr += "<td class=\"table-danger\">";
        tr += teams.red[i.toString()].num;
        tr += "</td>";
      } else {
        tr += "<td class=\"table-danger font-weight-bold\">";
        tr += "<a href=\"/teamform.html?team=" + teams.red[i.toString()].num + "&match=" + match + "\" class=\"text-dark\">";
        tr += teams.red[i.toString()].num;
        tr += "</a>"
        tr += "</td>";
      }
    }
    for (var i = 0; i < 3; i++) {
      if (teams.blue[i.toString()].finish) {
        tr += "<td class=\"table-primary\">";
        tr += teams.blue[i.toString()].num;
        tr += "</td>";
      } else {
        tr += "<td class=\"table-primary font-weight-bold\">";
        tr += "<a href=\"/teamform.html?team=" + teams.blue[i.toString()].num + "&match=" + match + "\" class=\"text-dark\">";
        tr += teams.blue[i.toString()].num;
        tr += "</a>"
        tr += "</td>";
      }
    }
  }
  tr += "</tr>";
  return tr;
}
