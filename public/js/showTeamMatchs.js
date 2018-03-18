function setColors(val, EleId) {
  if (val >= 4) {
    $(EleId).addClass("text-success");
  } else if (val < 4 && val > 1) {
    $(EleId).addClass("text-warning");
  } else if (val <= 2 && val >= 0) {
    $(EleId).addClass("text-danger");
  }
}

function putData(key, max, min, sum, count) {
  $("#" + key + "-max").html(max[key]);
  $("#" + key + "-min").html(min[key]);
  $("#" + key + "-avg").html(sum[key] / count);
  setColors(max[key], "#" + key + "-max");
  setColors(min[key], "#" + key + "-min");
  setColors(sum[key] / count, "#" + key + "-avg");
}

function teamData(max, min, sum, count, successCount){
  putData("auto-scale", max, min, sum, count);
  putData("auto-scale-try", max, min, sum, count);
  putData("auto-switch", max, min, sum, count);
  putData("auto-switch-try", max, min, sum, count);
  putData("tele-scale", max, min, sum, count);
  putData("tele-scale-try", max, min, sum, count);
  putData("tele-switch", max, min, sum, count);
  putData("tele-switch-try", max, min, sum, count);
  putData("tele-exchange", max, min, sum, count);
  putData("tele-exchange-try", max, min, sum, count);
  $("#auto-success").html(successCount["auto-success"]);
  $("#climb-success").html(successCount["climb-success"]);
}

function teamStat(eventId, teamId) {
  firebase.database().ref("matchs/" + eventId).orderByChild('time').once('value', function(snapshot) {
    var max = {};
    var min = {};
    var count = 0;
    var sum = {};
    var successCount = {};
    successCount["climb-success"] = 0;
    successCount["auto-success"] = 0;
    var first = true;
    snapshot.forEach(function(childSnapshot) {
      if (childSnapshot.child('teamCollect/' + teamId).exists()) {
        if (childSnapshot.child('teamCollect/' + teamId + '/notShow').val() == false) {
          count++;
          if (first) {
            if(childSnapshot.child("teamCollect/" + teamId + "/auto-success").val()){
              successCount["auto-success"]++;
            }
            if(childSnapshot.child("teamCollect/" + teamId + "/climb-success").val()){
              successCount["climb-success"]++;
              console.log(childSnapshot.key);
            }
            childSnapshot.child('teamCollect/' + teamId).forEach(function(child) {
              if (typeof child.val() != 'number') return;
              max[child.key] = child.val();
              min[child.key] = child.val();
              sum[child.key] = child.val();
              first = false;
            });
          } else {
            if(childSnapshot.child("teamCollect/" + teamId + "/auto-success").val()){
              successCount["auto-success"]++;
            }
            if(childSnapshot.child("teamCollect/" + teamId + "/climb-success").val()){
              successCount["climb-success"]++;
              console.log(childSnapshot.key);
            }

            childSnapshot.child('teamCollect/' + teamId).forEach(function(child) {
              if (typeof child.val() == 'number'){
                if (max[child.key] < child.val()) {
                  max[child.key] = child.val();
                }

                if (min[child.key] > child.val()) {
                  min[child.key] = child.val();
                }

                sum[child.key] = child.val() + sum[child.key];
              }

            });
          }
        }
      }
    });
    console.log(successCount);
    console.log(count);
    teamData(max, min, sum, count, successCount);
  });
}

function actionStat(eventId, actionName) {
  firebase.database().ref("matchs/" + eventId).orderByChild('time').once('value', function(snapshot) {
    var max = {};
    var min = {};
    var count = 0;
    var sum = {};
    var first = true;
    snapshot.forEach(function(childSnapshot) {
      childSnapshot.forEach(function(teamSnapshot){

      });
      if (childSnapshot.child('teamCollect/' + teamId).exists()) {
        if (childSnapshot.child('teamCollect/' + teamId + '/notShow').val() == false) {
          count++;
          if (first) {
            childSnapshot.child('teamCollect/' + teamId).forEach(function(child) {
              if (typeof child.val() != 'number') return;
              max[child.key] = child.val();
              min[child.key] = child.val();
              sum[child.key] = child.val();
              first = false;
            });
          } else {
            childSnapshot.child('teamCollect/' + teamId).forEach(function(child) {
              if (typeof child.val() != 'number') return;
              if (max[child.key] < child.val()) {
                max[child.key] = child.val();
              }

              if (min[child.key] > child.val()) {
                min[child.key] = child.val();
              }

              sum[child.key] = child.val() + sum[child.key];
            });
          }
        }
      }
    });

    console.log(count);
  });
}
