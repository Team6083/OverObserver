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
      $("#red" + (i + 1).toString() + "_tbody").attr("name", teamData.red[i.toString()]);
      $("#blue" + (i + 1).toString() + "_tbody").attr("name", teamData.blue[i.toString()]);
      $("#red" + (i + 1).toString() + "_title").html(teamData.red[i.toString()]);
      $("#blue" + (i + 1).toString() + "_title").html(teamData.blue[i.toString()]);
      $("#red" + (i + 1).toString() + "_editBtn").attr("href","/teamform.html?team="+teamData.red[i.toString()]+"&match="+matchId);
      $("#blue" + (i + 1).toString() + "_editBtn").attr("href","/teamform.html?team="+teamData.blue[i.toString()]+"&match="+matchId);
    }
    firebase.database().ref("users/"+firebase.auth().currentUser.uid+"/level").once('value').then(function(snapshot){
      if(snapshot.val() >= 4){
        for(var i = 0;i<3;i++){
          $("#red" + (i + 1).toString() + "_editBtn").removeClass("d-none");
          $("#blue" + (i + 1).toString() + "_editBtn").removeClass("d-none");
        }
      }
    });
  }

})

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
  $("#plateAssign").html(match.score_breakdown.red.tba_gameData);
});


firebase.database().ref("matchs/" + eventId + "/" + matchId + "/teamCollect").once('value').then(function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    function addTr(title, value) {
      return "<tr><td>" + title + "</td><td>" + value + "</td></tr>";
    }
    var tr = "";
    tr += addTr("Auto line", childSnapshot.child("auto-success").val() ? "成功" : "失敗");
    tr += addTr("Auto Scale 成功次數", childSnapshot.child("auto-scale").val());
    tr += addTr("Auto Scale 嘗試次數", childSnapshot.child("auto-scale-try").val());
    tr += addTr("Auto Switch 成功次數", childSnapshot.child("auto-switch").val());
    tr += addTr("Auto Switch 嘗試次數", childSnapshot.child("auto-switch-try").val());
    tr += addTr("Scale 成功次數", childSnapshot.child("tele-scale").val());
    tr += addTr("Scale 嘗試次數", childSnapshot.child("tele-scale-try").val());
    tr += addTr("Switch 成功次數", childSnapshot.child("tele-switch").val());
    tr += addTr("Switch 嘗試次數", childSnapshot.child("tele-switch-try").val());
    tr += addTr("爬升", childSnapshot.child("climb-success").val() ? "成功" : "失敗");
    tr += addTr("駕車技術", childSnapshot.child("drive-tech").val());
    $("tbody[name=\"" + childSnapshot.key + "\"]").append(tr);
    $("tbody[name=\"" + childSnapshot.key + "\"]").parent().parent().append("<strong>"+childSnapshot.child("specialThing").val()+"</strong>");

    var recorderEle = $("tbody[name=\"" + childSnapshot.key + "\"]").parent().parent().find("span[name=recorder]");
    var autoScaleEle = $("tbody[name=\"" + childSnapshot.key + "\"]").parent().parent().find("span[name=auto-scale]");
    var autoSwitchEle = $("tbody[name=\"" + childSnapshot.key + "\"]").parent().parent().find("span[name=auto-switch]");
    var teleScaleEle = $("tbody[name=\"" + childSnapshot.key + "\"]").parent().parent().find("span[name=tele-scale]");
    var teleSwitchEle = $("tbody[name=\"" + childSnapshot.key + "\"]").parent().parent().find("span[name=tele-switch]");

    //Success percent
    var autoScaleRate = childSnapshot.child("auto-scale-try").val() == 0 ? (childSnapshot.child("auto-scale").val() == 0?0:-1):(childSnapshot.child("auto-scale").val()/childSnapshot.child("auto-scale-try").val()*100);
    autoScaleEle.html(autoScaleRate.toString()+"%");
    var autoSwitchRate = childSnapshot.child("auto-switch-try").val() == 0?(childSnapshot.child("auto-switch").val() == 0?0:-1):(childSnapshot.child("auto-switch").val()/childSnapshot.child("auto-switch-try").val()*100);
    autoSwitchEle.html(autoSwitchRate.toString()+"%");
    var teleScaleRate = childSnapshot.child("tele-scale-try").val() == 0?(childSnapshot.child("tele-scale").val() == 0?0:-1):(childSnapshot.child("tele-scale").val()/childSnapshot.child("tele-scale-try").val()*100);
    teleScaleEle.html(teleScaleRate.toString()+"%");
    var teleSwitchRate = childSnapshot.child("tele-switch-try").val() == 0?(childSnapshot.child("tele-switch").val() == 0?0:-1):(childSnapshot.child("tele-switch").val()/childSnapshot.child("tele-switch-try").val()*100);
    teleSwitchEle.html(teleSwitchRate.toString()+"%");

    recorderEle.html(childSnapshot.child("recorder").val());
    //Color
    //autoScaleRate
    if(autoScaleRate > 50){
      autoScaleEle.removeClass("badge-light");
      autoScaleEle.addClass("badge-success");
    }
    else if(autoScaleRate < 0){
      autoScaleEle.removeClass("badge-light");
      autoScaleEle.addClass("badge-danger");
    }
    else{
      autoScaleEle.removeClass("badge-light");
      autoScaleEle.addClass("badge-warning");
    }

    //autoSwitchRate
    if(autoSwitchRate > 50){
      autoSwitchEle.removeClass("badge-light");
      autoSwitchEle.addClass("badge-success");
    }
    else if(autoSwitchRate < 0){
      autoSwitchEle.removeClass("badge-light");
      autoSwitchEle.addClass("badge-danger");
    }
    else{
      autoSwitchEle.removeClass("badge-light");
      autoSwitchEle.addClass("badge-warning");
    }

    //teleScaleRate
    if(teleScaleRate > 50){
      teleScaleEle.removeClass("badge-light");
      teleScaleEle.addClass("badge-success");
    }
    else if(teleScaleRate < 0){
      teleScaleEle.removeClass("badge-light");
      teleScaleEle.addClass("badge-danger");
    }
    else{
      teleScaleEle.removeClass("badge-light");
      teleScaleEle.addClass("badge-warning");
    }

    //teleSwitchRate
    if(teleSwitchRate > 50){
      teleSwitchEle.removeClass("badge-light");
      teleSwitchEle.addClass("badge-success");
    }
    else if(teleSwitchRate < 0){
      teleSwitchEle.removeClass("badge-light");
      teleSwitchEle.addClass("badge-danger");
    }
    else{
      teleSwitchEle.removeClass("badge-light");
      teleSwitchEle.addClass("badge-warning");
    }

  });
});
