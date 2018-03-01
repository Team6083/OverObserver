window.onload = function() {

  var account = document.getElementById("account");
  var pwd = document.getElementById("pwd");
  var loginSmtBtn = document.getElementById("loginSmtBtn");
  loginSmtBtn.addEventListener("click", function() {
    console.log(account.value);
    firebase.auth().signInWithEmailAndPassword(account.value, pwd.value).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
			if(errorCode == "auth/wrong-password"){

			}
    });
  }, false);

  var userLogin;
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      userLogin = user;
      $('#loginPanel').modal('hide')
      console.log("User is logined", user)
    } else {
      userLogin = null;
      $('#loginPanel').modal('show')
      console.log("User is not logined yet.");
    }
  });

  var signoutSmtBtn = document.getElementById("signoutSmtBtn");
  signoutSmtBtn.addEventListener("click", function() {
    firebase.auth().signOut().then(function() {
      console.log("User sign out!");
    }, function(error) {
      console.log("User sign out error!");
    })
  }, false);
}
