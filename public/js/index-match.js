var thisEvent;
database.ref("settings/currentEvent").once('value').then(function(snapshot) {
  thisEvent = snapshot.val();
  firebase.database().ref('matchs/' + thisEvent).once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var red = childSnapshot.child("alliances/red/teams").val();
      var blue = childSnapshot.child("alliances/blue/teams").val();
      var teamsData = {
        red: {
          0: {
            finish: false,
            num: ""
          },
          1: {
            finish: false,
            num: ""
          },
          2: {
            finish: false,
            num: ""
          }
        },
        blue: {
          0: {
            finish: false,
            num: ""
          },
          1: {
            finish: false,
            num: ""
          },
          2: {
            finish: false,
            num: ""
          }
        }
      }
      for (var i = 0; i < 3; i++) {
        teamsData.red[i.toString()].num = red[i.toString()];
        teamsData.red[i.toString()].finish = childSnapshot.child("teamCollect/"+red[i.toString()]).exists();
        teamsData.blue[i.toString()].num = blue[i.toString()];
        teamsData.blue[i.toString()].finish = childSnapshot.child("teamCollect/"+blue[i.toString()]).exists();
      }
      
      $("#big-tbody").append(addMatchList(childSnapshot.key,teamsData));
      $("#small-tbody").append(addMatchList(childSnapshot.key,teamsData,0));
    });
  });
});
