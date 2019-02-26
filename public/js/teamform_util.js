function renderTeamformDisplay(v) {
    let field = '';
    if (v.type === 'title') {
        field += v.displayName;
    } else {
        field += '<div class="row form-group">';
        field += '<div class="col-6"><label class="col-form-label">';
        field += v.displayName;
        field += '</label></div><div class="col-6">';
        if (v.type === 'boolean') {
            field += '<div class="btn-group btn-group-toggle" data-toggle="buttons"><label class="btn btn-outline-success">';
            field += '<input type="radio" autocomplete="off" name="' + v.Ttag + '" id="' + v.Ttag + '">';
            field += v.displayT;
            field += '</label><label class="btn btn-outline-warning">';
            field += '<input type="radio" autocomplete="off" name="' + v.Ftag + '" id="' + v.Ftag + '">';
            field += v.displayF;
            field += '</label></div>';
        } else if (v.type === 'int') {
            field += '<input type="number" class="form-control numInput" value="0" min="0" name="' + v.name + '" id="' + v.name + '" disabled>';
        } else if (v.type === 'textarea') {
            field += '<textarea class="form-control" id="' + v.name + '" rows="' + v.row + '"></textarea>';
        }
        field += '</div></div>';
    }
    return field;
}

function encodeTeamformData(f, data) {
    if (f.type === 'title') return data;
    if (f.type === 'boolean') {
        data[f.name] = $("#" + f.Ttag).parent().hasClass("active");
    } else if (f.type === 'int') {
        data[f.name] = parseInt($("#" + f.name).val());
    } else {
        data[f.name] = $("#" + f.name).val();
    }
    return data;
}

function getTeamformWithEventId(eventId, callback) {
    firebase.database().ref("events/" + eventId + "/teamform").once('value').then(function (snapshot) {
        if (snapshot.exists()) {
            const data = snapshot.val();
            callback(data);
        }
    });
}
