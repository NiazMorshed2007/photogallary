import firebase from 'firebase/compat/app';

const firebaseConfig = {
    apiKey: "AIzaSyB8Xp-OuJ9-x799xLZvMVN25oDMiA2vsB4",
    authDomain: "photogallary-927a9.firebaseapp.com",
    projectId: "photogallary-927a9",
    storageBucket: "photogallary-927a9.appspot.com",
    messagingSenderId: "662839962098",
    appId: "1:662839962098:web:03b6e5e7a88bda7a29a36b"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebase;