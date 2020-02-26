  import firebase from 'firebase/app'
  import 'firebase/firestore'
  import 'firebase/auth'
  import 'firebase/storage'
  
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDSzDumBPKE8vkukjK1g9rVgqD4LiQg-Sw",
    authDomain: "boomapp-8d7cc.firebaseapp.com",
    databaseURL: "https://boomapp-8d7cc.firebaseio.com",
    projectId: "boomapp-8d7cc",
    storageBucket: "gs://boomapp-8d7cc.appspot.com",
    messagingSenderId: "1086007910938",
    appId: "1:1086007910938:web:bf3e6f8c92b186cfda67a3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  firebase.firestore();

  const storage = firebase.storage();

  export {
    storage, firebase as default
  }