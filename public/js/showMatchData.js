var matchId = findGetParameter("match");
var eventId = findGetParameter("match").split("_")[0];
$("#matchId").html(matchId.split("_")[1]);
$("#eventId").html(eventId);
firebase.database().ref("matchs/" + eventId + "/" + matchId + "/alliances").once('value').then(function(snapshot) {
  var teamData = {};
  if (snapshot.val() != null) {
    teamData["red"] = snapshot.child("red/team_keys").val();
    teamData["blue"] = snapshot.child("blue/team_keys").val();
    teamData["red"].score = snapshot.child("red/score").val();
    teamData["blue"].score = snapshot.child("blue/score").val();
    $("#teamsTbody").append(addMatchList(matchId, teamData, 1));

    for (var i = 0; i < 3; i++) {
      $("#red" + (i + 1).toString() + " .tbody").attr("name", teamData.red[i.toString()]);
      $("#blue" + (i + 1).toString() + " .tbody").attr("name", teamData.blue[i.toString()]);
      $("#red" + (i + 1).toString() + " .title").html(teamData.red[i.toString()]);
      $("#blue" + (i + 1).toString() + " .title").html(teamData.blue[i.toString()]);
      $("#red" + (i + 1).toString() + " .editBtn").attr("href", "/teamform.html?edit=true&team=" + teamData.red[i.toString()] + "&match=" + matchId);
      $("#blue" + (i + 1).toString() + " .editBtn").attr("href", "/teamform.html?edit=true&team=" + teamData.blue[i.toString()] + "&match=" + matchId);
      $("#red" + (i + 1).toString()).attr("name", teamData.red[i.toString()]);
      $("#blue" + (i + 1).toString()).attr("name", teamData.blue[i.toString()]);
    }
    firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/level").once('value').then(function(snapshot) {
      if (snapshot.val() >= 4) {
        for (var i = 0; i < 3; i++) {
          $("#red" + (i + 1).toString() + "_editBtn").removeClass("d-none");
          $("#blue" + (i + 1).toString() + "_editBtn").removeClass("d-none");
        }
      }
    });
  }

});

function ajaxMatch() {
  return $.ajax({
    url: "https://www.thebluealliance.com/api/v3/match/" + matchId,
    accept: 'application/json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("X-TBA-Auth-Key", "IcTRNsZoayVbU8wgZ3xRETwnw6O9kvJg4hPC6XXGHbXfDYX8COi1fTW6DCrtBTNy");
    },
    type: 'GET'
  });
}

function addMatchResult(red, title, blue) {
  var tr = "<tr>";
  tr += "<td class=\"table-danger\">";
  te += red;
  tr += "</td>";
  tr += "<td>";
  te += title;
  tr += "</td>";
  tr += "<td class=\"table-primary\">";
  te += blue;
  tr += "</td>";
  return tr;
}

$.when(ajaxMatch()).done(function(match) {
  for (var k in match.score_breakdown.red) {
    var tr = "<tr>";
    tr += "<td class='table-danger'>"
    tr += match.score_breakdown.red[k];
    tr += "</td><td>";
    tr += k;
    tr += "</td><td class='table-primary'>";
    tr += match.score_breakdown.blue[k];
    tr += "</td>";
    tr += "</tr>";
    $("#matchResultTbody").append(tr);
  }
  $("#plateAssign").html(match.score_breakdown.red.tba_gameData);
});

getTeamform(eventId, function(data) {
  firebase.database().ref("matchs/" + eventId + "/" + matchId + "/teamCollect").once('value').then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        $("[name=\"" + childSnapshot.key + "\"] .recorder").html(childSnapshot.child('recorder').val());
        if (childSnapshot.child("notShow").val()) {
          console.log(childSnapshot.key);
          $("[name=\"" + childSnapshot.key + "\"] .notShow").removeClass("d-none");
        } else {
          function addTr(title, value) {
            return "<tr><td>" + title + "</td><td>" + value + "</td></tr>";
          }

          var auto = "";
          var teleop = "";
          var summary = "";
          for (var k in data.fields) {
            var f = data.fields[k];
            var tr = "";
            if(f.type == "boolean"){
              tr = addTr(f.displayName, childSnapshot.child(k).val() ? f.displayT : f.displayF);
            }
            else if(f.type == "int") {
              tr = addTr(f.displayName, childSnapshot.child(k).val());
            }
            else if (f.type == "textarea") {
              tr = "<strong>" + childSnapshot.child(k).val() + "</strong><br>";
            }

            if(f.mode == "auto"){
              auto += tr;
            }
            else if(f.mode == "teleop"){
              teleop += tr;
            }
            else if(f.mode == "summary"){
              summary += tr;
            }
          }
          $("tbody[name=\"" + childSnapshot.key + "\"]").append(auto);
          $("tbody[name=\"" + childSnapshot.key + "\"]").append(teleop);
          $("tbody[name=\"" + childSnapshot.key + "\"]").parent().parent().append(summary);
        }
    });
  });
});
