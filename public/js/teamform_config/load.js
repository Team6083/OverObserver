var ffield = {
  'frc_2018':{
    year: 2018,
    fields: {
      autoTime:{
        'auto-scale': {
          'type': 'int',
          'displayName': '<span class="badge badge-pill badge-dark">Scale</span>成功次數'
        },
        'auto-scale-try': {
          'type': 'int',
          'displayName': '<span class="badge badge-pill badge-dark">Scale</span>嘗試次數'
        },
        'auto-switch': {
          'type': 'int',
          'displayName': '<span class="badge badge-pill badge-dark">Switch</span>成功次數'
        },
        'auto-switch-try': {
          'type': 'int',
          'displayName': '<span class="badge badge-pill badge-dark">Switch</span>嘗試次數'
        },
        'autoLine':{
          'type':'boolean',
          'displayName':'Auto line',
          'displayT':'成功',
          'displayF':'失敗',
          'Ttag':'auto-success',
          'Ftag':'auto-fail'
        }
      },
      teleopTime:{
        'tele-scale': {
          'type': 'int',
          'displayName': '<span class="badge badge-pill badge-dark">Scale</span>成功次數'
        },
        'tele-scale-try': {
          'type': 'int',
          'displayName': '<span class="badge badge-pill badge-dark">Scale</span>嘗試次數'
        },
        'tele-switch': {
          'type': 'int',
          'displayName': '<span class="badge badge-pill badge-dark">Switch</span>成功次數'
        },
        'tele-switch-try': {
          'type': 'int',
          'displayName': '<span class="badge badge-pill badge-dark">Switch</span>嘗試次數'
        },
        'tele-exchange':{
          'type':'int',
          'displayName': '<span class="badge badge-pill badge-dark">Exchange</span>成功次數'
        },
        'tele-exchange-try':{
          'type':'int',
          'displayName': '<span class="badge badge-pill badge-dark">Exchange</span>嘗試次數'
        },
        'climb':{
          'type':'boolean',
          'displayName':'爬升',
          'displayT':'成功',
          'displayF':'失敗',
          'Ttag':'climb-success',
          'Ftag':'climb-fail'
        },
        'drive-tech':{
          'type':'int',
          'displayName':'駕車技術'
        }
      },
      summary:{
        'specialThing':{
          'type':'textarea',
          'displayName':'特殊表現',
          'row':4
        }
      }
    }
  }
};

$("#tfc_drop").append('<a class="dropdown-item tfcdropdown" selectYear="'+2018+'">'+2018+'</a>');
