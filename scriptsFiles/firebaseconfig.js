import * as firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyDlTgeuq2okF2dWLEAMuiSUhBHDnvjI_vI",
    authDomain: "mmsfirebase-8f388.firebaseapp.com",
    databaseURL: "https://mmsfirebase-8f388.firebaseio.com",
    projectId: "mmsfirebase-8f388",
    storageBucket: "mmsfirebase-8f388.appspot.com",
    messagingSenderId: "255692976955",
    appId: "1:255692976955:web:671c49d15c19cf3e773d1e"
};
//Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;