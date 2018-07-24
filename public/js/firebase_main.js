
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
  firebase.auth().signInWithEmailAndPassword(account, pwd).catch(function(error) {
    // Handle error
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    if(errorCode == "auth/wrong-password"){
      loginError("密碼錯誤");
    }
    else if(errorCode == "auth/invalid-email" || errorCode == "auth/user-not-found"){
      loginError("請輸入正確email");
    }
    else{
      loginError(errorCode);
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
