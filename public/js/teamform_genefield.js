function genetfform(k, v) {
  var field = '<div class="row form-group">';
  field += '<div class="col-6"><label class="col-form-label">';
  field += v.displayName;
  field += '</label></div><div class="col-6">';
  if (v.type == 'boolean') {
    field += '<div class="btn-group btn-group-toggle" data-toggle="buttons"><label class="btn btn-outline-success">';
    field += '<input type="radio" autocomplete="off" name="' + v.Ttag + '" id="' + v.Ttag + '">';
    field += v.displayT;
    field += '</label><label class="btn btn-outline-warning">';
    field += '<input type="radio" autocomplete="off" name="' + v.Ftag + '" id="' + v.Ftag + '">';
    field += v.displayF;
    field += '</label></div>';
  } else if (v.type == 'int') {
    field += '<input type="number" class="form-control numInput" value="0" min="0" name="' + k + '" id="' + k + '" disabled>';
  } else if (v.type == 'textarea') {
    field += '<textarea class="form-control" id="' + k + '" rows="' + v.row + '"></textarea>';
  }
  field += '</div></div>';
  return field;
}

function writeTeamFormData(k,f,data){
  if(f.type == 'boolean'){
    data[k] = $("#"+k).parent().hasClass("active");
  }
  else if(f.type == 'int'){
    data[k] = parseInt($("#"+k).val());
  }
  else{
    data[k] = $("#"+k).val();
  }
  return data;
}
