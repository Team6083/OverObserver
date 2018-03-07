var loginSmtBtn = document.getElementById("loginSmtBtn");
loginSmtBtn.addEventListener("click", function() {
  signin($("#account").val(), $("#pwd").val());
}, false);

var loginPanel = $('#loginPanel');
loginPanel.modal({
  keyboard: false,
  backdrop: 'static',
  show: false
});

var loginUser;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    loginUser = user;
    $("#navUser").html(user.displayName);
    $("#signoutSmtBtn").removeClass("disabled");
    loginPanel.modal('hide');
    console.log("User is logined", user);
    if(location.assign.pathname == "/" || location.assign.pathname == "/index.html"){
      readList();
    }
  } else {
    loginUser = null;
    loginPanel.modal('show');
    $("#navUser").html("");
    $("#signoutSmtBtn").addClass("disabled");
    console.log("User is not logined yet.");
  }
});
