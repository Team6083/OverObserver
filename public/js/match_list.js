function addMatchList(match, teams, size) {
  var tr = "<tr>";
  if (size == 0) {
    tr += "<th scope=\"row\" rowspan=\"2\">" + match + "</th>";
    for (var i = 0; i < 3; i++) {
      console.log(teams.red[i]);
      if (teams.red[i].finish) {
        tr += "<td class=\"table-danger\">";
        tr += teams.red[i].num;
        tr += "</td>";
      } else {
        tr += "<td class=\"table-danger font-weight-bold\">";
        tr += teams.red[i].num;
        tr += "</td>";
      }
    }
    tr += "</tr><tr>";
    for (var i = 0; i < 3; i++) {
      if (teams.blue[i].finish) {
        tr += "<td class=\"table-primary\">";
        tr += teams.blue[i].num;
        tr += "</td>";
      } else {
        tr += "<td class=\"table-primary font-weight-bold\">";
        tr += teams.blue[i].num;
        tr += "</td>";
      }
    }
  } else {
    tr += "<th scope=\"row\">";
    tr += match;
    tr += "</th>"
    for (var i = 0; i < 3; i++) {
      if (teams.red[i].finish) {
        tr += "<td class=\"table-danger\">";
        tr += teams.red[i].num;
        tr += "</td>";
      } else {
        tr += "<td class=\"table-danger font-weight-bold\">";
        tr += teams.red[i].num;
        tr += "</td>";
      }
    }
    for (var i = 0; i < 3; i++) {
      if (teams.blue[i].finish) {
        tr += "<td class=\"table-primary\">";
        tr += teams.blue[i].num;
        tr += "</td>";
      } else {
        tr += "<td class=\"table-primary font-weight-bold\">";
        tr += teams.blue[i].num;
        tr += "</td>";
      }
    }
  }
  tr += "</tr>";
  return tr;
}
