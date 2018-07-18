
console.log("Initing firebase")
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCaCf9xHQBtK31cmLTJ_LW3pdIrPSNHUls",
    authDomain: "overobserver-1ed5b.firebaseapp.com",
    databaseURL: "https://overobserver-1ed5b.firebaseio.com",
    projectId: "overobserver-1ed5b",
    storageBucket: "overobserver-1ed5b.appspot.com",
    messagingSenderId: "309928594845"
  };
firebase.initializeApp(config);
var database = firebase.database();

function signin(account, pwd){
  console.log(account);
  $("#loginAlert").addClass("d-none");
  firebase.auth().signInWithEmailAndPassword(account, pwd).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    if(errorCode == "auth/wrong-password"){
      $("#loginAlert").html("密碼錯誤");
    }
    else if(errorCode == "auth/invalid-email"){
      $("#loginAlert").html("請輸入正確email");
    }
    else{
      $("#loginAlert").html(errorCode);
    }
    $("#loginAlert").removeClass("d-none");
  });
}

function signout(){
	firebase.auth().signOut().then(function() {
		// Sign-out successful.
		console.log("User sign out!");
	}).catch(function(error) {
		// An error happened.
		console.log("User sign out error!");
	});
}

function register(account, pwd){
  console.log(account);
  firebase.auth().createUserWithEmailAndPassword(account, pwd).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMsg = error.message;
    console.log(errorCode);
  });
}
