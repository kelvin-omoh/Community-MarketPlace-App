// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCTna89SXaWXGA3IRKrMIQXRbAKqLyMFFw",
    authDomain: "redux-21dee.firebaseapp.com",
    databaseURL: "https://redux-21dee-default-rtdb.firebaseio.com",
    projectId: "redux-21dee",
    storageBucket: "redux-21dee.appspot.com",
    messagingSenderId: "422168044138",
    appId: "1:422168044138:web:620fc7b287b90ff0f12013",
    measurementId: "G-23YDBB2C24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
