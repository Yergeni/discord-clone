import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyCVv99K1z1md-1AKf4gv6eqfN0gqEm3PiE",
	authDomain: "discord-clone-c3c10.firebaseapp.com",
	databaseURL: "https://discord-clone-c3c10.firebaseio.com",
	projectId: "discord-clone-c3c10",
	storageBucket: "discord-clone-c3c10.appspot.com",
	messagingSenderId: "231555138928",
	appId: "1:231555138928:web:38162584a5445e7880fbb5",
	measurementId: "G-RV73JJ62EP",
};

// Initialize the app
firebase.initializeApp(firebaseConfig);

// DATABASE (Firestore)
const auth = firebase.auth();
const firestore = firebase.firestore();
// Provider
const googleProvider = new firebase.auth.GoogleAuthProvider();
// Sign In with google
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

// exporting
export { auth };
export default firestore;
