function fetchEvent(eventKey){
    $.when(ajaxEvent(eventKey)).done(function(event) {
        firebase.database().ref("events/"+eventKey).update(event);
        console.log(event);
    });
}

function fetchEventMatchs(eventKey){
    $.when(ajaxEventMatchSimple(eventKey)).done(function(matchs) {
        for(let i=0; i<matchs.length; i++){
            firebase.database().ref("matchs/"+matchs[i].event_key+"/"+matchs[i].key).update(matchs[i]);
        }
    })
}

function fetchEventTeams(eventKey){
    $.when(ajaxEventTeamsSimple(eventKey)).done(function(teams) {
        for(let i=0; i<teams.length; i++){
            firebase.database().ref("teams/"+teams[i].key+"/inf").update(teams[i]);
        }
    });
}