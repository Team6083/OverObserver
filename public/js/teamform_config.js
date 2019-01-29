function getteamform(eventId, callback){
  firebase.database().ref("events/" + eventId + "/teamform").once('value').then(function(snapshot) {
    if (snapshot.exists()) {
      var data = snapshot.val();
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