import firebase from "firebase/app";
import 'firebase/auth';        // for authentication
import 'firebase/storage';     // for storage
import 'firebase/database';    // for realtime database
import 'firebase/firestore';   // for cloud firestore
// import 'firebase/messaging';   // for cloud messaging
import 'firebase/functions';   // for cloud functions
import 'firebase/analytics'; 
import { firebaseConfig } from "./secretInfo";


  const firebaseApp = firebase.initializeApp( firebaseConfig );
  firebase.analytics();
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  const storageRef = storage.ref();
  const database = firebase.database();
  const timestamp =  firebase.firestore.FieldValue.serverTimestamp;
  export {
    db,
    auth,
    storage,
    storageRef,
    database,
    timestamp
  }