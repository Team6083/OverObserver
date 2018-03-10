function ajaxEvent(eventKey){
  return $.ajax({
    url: "https://www.thebluealliance.com/api/v3/event/"+eventKey+"/simple",
    accept: 'application/json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("X-TBA-Auth-Key", "IcTRNsZoayVbU8wgZ3xRETwnw6O9kvJg4hPC6XXGHbXfDYX8COi1fTW6DCrtBTNy");
    },
    type: 'GET'
  });
}

function ajaxEventMatchSimple(eventKey) {
  return $.ajax({
    url: "https://www.thebluealliance.com/api/v3/event/" + eventKey + "/matches/simple",
    accept: 'application/json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("X-TBA-Auth-Key", "IcTRNsZoayVbU8wgZ3xRETwnw6O9kvJg4hPC6XXGHbXfDYX8COi1fTW6DCrtBTNy");
    },
    type: 'GET'
  });
}

function ajaxEventTeamsSimple(eventKey) {
  return $.ajax({
    url: "https://www.thebluealliance.com/api/v3/event/" + eventKey + "/teams/simple",
    accept: 'application/json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("X-TBA-Auth-Key", "IcTRNsZoayVbU8wgZ3xRETwnw6O9kvJg4hPC6XXGHbXfDYX8COi1fTW6DCrtBTNy");
    },
    type: 'GET'
  });
}

function addEvent(eventKey){
  $.when(ajaxEvent(eventKey)).done(function(event) {
    firebase.database().ref("events/"+eventKey).update(event);
    console.log(event);
  });
}

function fetchEventMatchs(eventKey){
  $.when(ajaxEventMatchSimple(eventKey)).done(function(matchs) {
    for(var i=0;i<matchs.length;i++){
      firebase.database().ref("matchs/"+matchs[i].event_key+"/"+matchs[i].key).update(matchs[i]);
    }
  })
}

function fetchEventTeams(eventKey){
  $.when(ajaxEventTeamsSimple(eventKey)).done(function(teams) {
    for(var i=0;i<teams.length;i++){
      firebase.database().ref("teams/"+teams[i].key+"/inf").update(teams[i]);
    }
  });
}
