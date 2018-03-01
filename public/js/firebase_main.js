
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
var loginUser;

firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		loginUser = user;
		console.log("User is logined", user)
	} 
	else {
		loginUser = null;
		console.log("User is not logined yet.");
	}
});


function signout(){
	firebase.auth().signOut().then(function() {
		// Sign-out successful.
		console.log("User sign out!");
	}).catch(function(error) {
		// An error happened.
		console.log("User sign out error!");
	});
}

