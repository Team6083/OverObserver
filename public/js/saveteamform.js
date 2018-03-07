function writeTeamForm(event, match, team, data) {
  firebase.database().ref("matchs/"+event+"/"+match+"/teamCollect/"+team).update(data);
}

$("#sendConfBtn").click(function(){
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
  data["climb-success"] = $("#climb-success").parent().hasClass("active");
  data["drive-tech"] = $("#drive-tech").val();
  data["specialThing"] = $("#specialThing").val();
  console.log(data);
  writeTeamForm(eventId, matchId, teamId, data);
  window.location = "/";
});
