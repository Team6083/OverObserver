function getTeamform(eventId, callback){
  firebase.database().ref("events/" + eventId + "/teamform").once('value').then(function(snapshot) {
    if (snapshot.exists()) {
      const data = snapshot.val();
      callback(data);
    }
  });
}

function reloadNumberBtn() {
  $(".numInput").bootstrapNumber({
    upClass: 'primary',
    downClass: 'danger',
    center: true
  });
}