var loginSmtBtn = document.getElementById("loginSmtBtn");
loginSmtBtn.addEventListener("click", function() {
  signin($("#account").val(), $("#pwd").val());
}, false);

var signoutSmtBtn = document.getElementById("signoutSmtBtn");
signoutSmtBtn.addEventListener("click", function() {
  firebase.auth().signOut().then(function() {
    console.log("User sign out!");
  }, function(error) {
    console.log("User sign out error!");
  })
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
    loginPanel.modal('hide');
    console.log("User is logined", user)
  } else {
    loginUser = null;
    loginPanel.modal('show');
    console.log("User is not logined yet.");
  }
});
