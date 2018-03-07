function addMatchList(match, teams, size) {
  var tr = "<tr>";
  if (size == 0) {
    tr += "<th scope=\"row\" rowspan=\"2\">" + match.split("_")[1] + "</th>";
    for (var i = 0; i < 3; i++) {
      if (teams.red[i.toString()].finish) {
        tr += "<td class=\"table-danger\">";
        tr += teams.red[i.toString()].num;
        tr += "</td>";
      } else {
        tr += "<td class=\"table-danger font-weight-bold\">";
        tr += "<a href=\"/teamform.html?team="+teams.red[i.toString()].num+"&match="+match+"\" class=\"text-dark\">";
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
        tr += "<a href=\"/teamform.html?team="+teams.blue[i.toString()].num+"&match="+match+"\" class=\"text-dark\">";
        tr += teams.blue[i.toString()].num;
        tr += "</a>"
        tr += "</td>";
      }
    }
  } else {
    tr += "<th scope=\"row\">";
    tr += match.split("_")[1];
    tr += "</th>"
    for (var i = 0; i < 3; i++) {
      if (teams.red[i.toString()].finish) {
        tr += "<td class=\"table-danger\">";
        tr += teams.red[i.toString()].num;
        tr += "</td>";
      } else {
        tr += "<td class=\"table-danger font-weight-bold\">";
        tr += "<a href=\"/teamform.html?team="+teams.red[i.toString()].num+"&match="+match+"\" class=\"text-dark\">";
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
        tr += "<a href=\"/teamform.html?team="+teams.blue[i.toString()].num+"&match="+match+"\" class=\"text-dark\">";
        tr += teams.blue[i.toString()].num;
        tr += "</a>"
        tr += "</td>";
      }
    }
  }
  tr += "</tr>";
  return tr;
}
