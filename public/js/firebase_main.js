
console.log("Initing firebase")
// Initialize Firebase
var config = {
    apiKey: "AIzaSyC-yolVgQcAADYtVjA0-P5hKeVLVV23G6s",
    authDomain: "frc-event-reseearch.firebaseapp.com",
    databaseURL: "https://frc-event-reseearch.firebaseio.com",
    projectId: "frc-event-reseearch",
    storageBucket: "frc-event-reseearch.appspot.com",
    messagingSenderId: "350707716743"
  };
firebase.initializeApp(config);
var database = firebase.database();

function signin(account, pwd){
  console.log(account);
  firebase.auth().signInWithEmailAndPassword(account, pwd).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    if(errorCode == "auth/wrong-password"){

    }
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
