function writeTeamForm(event, match, team, data) {
  firebase.database().ref("matchs/" + event + "/" + match + "/teamCollect/" + team).update(data, function(error) {
    if (error != null) {
      alert(error.code);
    }
  });
}

$("#sendConfBtn").click(function() {
  var data = {};
  data["auto-success"] = $("#auto-success").parent().hasClass("active");
  data["auto-scale"] = $("#auto-scale").val();
  data["auto-scale-try"] = $("#auto-scale-try").val();
  data["auto-switch"] = $("#auto-switch").val();
  data["auto-switch-try"] = $("#auto-switch-try").val();
  data["tele-scale"] = $("#tele-scale").val();
  data["tele-scale-try"] = $("#tele-scale-try").val();
  data["tele-switch"] = $("#tele-switch").val();
  data["tele-switch-try"] = $("#tele-switch-try").val();
  data["tele-exchange"] = $('#tele-exchange').val();
  data["tele-exchange-try"] = $('#tele-exchange-try').val();
  data["climb-success"] = $("#climb-success").parent().hasClass("active");
  data["drive-tech"] = $("#drive-tech").val();
  data["specialThing"] = $("#specialThing").val();
  data["notShow"] = false;
  if (editing != 'true') {
    data["recorder"] = firebase.auth().currentUser.displayName;
  }
  writeTeamForm(eventId, matchId, teamId, data);
  if (editing != 'true') {
    window.location = "/";
  } else {
    window.location = '/showMatchData.html?match=' + matchId;
  }
});

$("#notShowBtn").click(function() {
  var data = {};
  if (editing != 'true') {
    data["recorder"] = firebase.auth().currentUser.displayName;
  }
  data["specialThing"] = $("#specialThing").val();
  data["notShow"] = true;
  writeTeamForm(eventId, matchId, teamId, data);
  if (editing != 'true') {
    window.location = "/";
  } else {
    window.location = '/showMatchData.html?match=' + matchId;
  }

});
