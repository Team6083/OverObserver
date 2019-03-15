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

function ajaxTeamSimple(teamKey) {
  return $.ajax({
    url: "https://www.thebluealliance.com/api/v3/team/" + teamKey + "/simple",
    accept: 'application/json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("X-TBA-Auth-Key", "IcTRNsZoayVbU8wgZ3xRETwnw6O9kvJg4hPC6XXGHbXfDYX8COi1fTW6DCrtBTNy");
    },
    type: 'GET'
  });
}
