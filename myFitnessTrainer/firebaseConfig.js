import { initializeApp } from 'firebase/app';


// Optionally import the services that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBj1gTTLeBEFxXOpvSVevhoW_68j3_lydU",
    authDomain: "myfitnesstrainer-94289.firebaseapp.com",
    projectId: "myfitnesstrainer-94289",
    storageBucket: "myfitnesstrainer-94289.appspot.com",
    messagingSenderId: "878461072720",
    appId: "1:878461072720:web:c50cd2b52e9b6ef3e42855",
    measurementId: "G-D4REKPXY76"
  };

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

// Initialize Firebase Auth/Firstore and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app);


export { auth, db };