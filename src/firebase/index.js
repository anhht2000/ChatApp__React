import firebase from "firebase";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyD3CKINtI5At72ggBNFdU3yY2cPoLde0m4",
  authDomain: "chat-app-2870a.firebaseapp.com",
  projectId: "chat-app-2870a",
  storageBucket: "chat-app-2870a.appspot.com",
  messagingSenderId: "309039714230",
  appId: "1:309039714230:web:3b3f80206b62e30501fb17",
  measurementId: "G-ZVCGJN4GMB",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

//emulator la tao cac account gia
// auth.useEmulator("http://localhost:9099");
// if (window.location.hostname === "localhost") {
//   db.useEmulator("localhost", "8080");
// }

export { auth, db };
