//fetch data for edit mode
firebase.database().ref("matchs/" + eventId + "/" + matchId + "/teamCollect/" + teamId).once('value').then(function(snapshot) {
  if (snapshot.exists()) {
    var data = snapshot.val();
    if (!data["notShow"]) {
      if (data["auto-success"]) {
        $("#auto-success").parent().addClass("active");
      } else {
        $("#auto-fail").parent().addClass("active");
      }
      $("#auto-scale").val(data["auto-scale"]);
      $("#auto-scale-try").val(data["auto-scale-try"]);
      $("#auto-switch").val(data["auto-switch"]);
      $("#auto-switch-try").val(data["auto-switch-try"]);
      $("#tele-scale").val(data["tele-scale"]);
      $("#tele-scale-try").val(data["tele-scale-try"]);
      $("#tele-switch").val(data["tele-switch"]);
      $("#tele-switch-try").val(data["tele-switch-try"]);
      if (data["climb-success"]) {
        $("#climb-success").parent().addClass("active");
      } else {
        $("#climb-fail").parent().addClass("active");
      }
      $("#drive-tech").val(data["drive-tech"]);
      $("#specialThing").val(data["specialThing"]);
      $('#tele-exchange').val(data["tele-exchange"]);
      $('#tele-exchange-try').val(data["tele-exchange-try"]);
    }
  }
});

function writeTeamForm(event, match, team, data) {
  firebase.database().ref("matchs/" + event + "/" + match + "/teamCollect/" + team).update(data, function(error) {
    if (error != null) {
      alert(error.code);
    }
  });
}

$("#sendConfBtn").click(function() {
  var data = {};
  for (var k in auto) {
    var f = auto[k];
    data = writeTeamFormData(k,f,data);
  }
  for (var k in teleop) {
    var f = teleop[k];
    data = writeTeamFormData(k,f,data);
  }
  for (var k in summ) {
    var f = summ[k];
    data = writeTeamFormData(k,f,data);
  }

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
