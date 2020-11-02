import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'

 const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "event-social-network-1f0f3.firebaseapp.com",
    databaseURL: "https://event-social-network-1f0f3.firebaseio.com",
    projectId: "event-social-network-1f0f3",
    storageBucket: "event-social-network-1f0f3.appspot.com",
    messagingSenderId: process.env.APP_MESSAGING,
    appId: process.env.APP_ID,
    measurementId: process.env.APP_MEASUREMENT
 }
 
 firebase.initializeApp(firebaseConfig);
 firebase.firestore();

 export default firebase;
