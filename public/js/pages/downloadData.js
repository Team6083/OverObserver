let teamsList = [];

// load events list
database.ref("events").once('value').then(function (snapshot) {
    $("#exportEvents").removeAttr("disabled");
    snapshot.forEach((childSnapshot) => {
        let o = document.createElement("option");
        o.innerText = childSnapshot.child("key").val();
        $("#exportEvents").append(o);
    });
});

$("#exportEvents").change(function () {
    if($(this).val() === "notSelect") return;
    $.when(ajaxEventTeamsSimple($(this).val())).done(function (teams) {
        teamsList = [];
        for(let i in teams){
            teamsList.push(teams[i].key);
        }
        updateTeamSelect();
    });
});

function updateTeamSelect(){
    let select = $('#teamSelect');
    select.empty();
    for(let i in teamsList){
        let o = document.createElement("option");
        o.innerText = teamsList[i];
        select.append(o).multiSelect('refresh');
    }
}

$("#downloadBtn").click(function () {
    $('#collapseOptions').collapse('hide');




    $('#collapseExport').collapse('show');
});


function getTeamsData(eventId, teamId, callBack) {
    let outData = [];
    firebase.database().ref("matchs/" + eventId).orderByChild('time').once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            if (childSnapshot.child('teamCollect/' + teamId).exists()) {
                if (childSnapshot.child('teamCollect/' + teamId + '/notShow').val() === false) {
                    outData.push(childSnapshot.child('teamCollect/' + teamId).val());
                }
            }
        });
        callBack(outData);
    });
}