import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBRISWDkagbTv6bgkIs199kgd53vjtU0m8",
    authDomain: "sampleprojects-65c8b.firebaseapp.com",
    databaseURL: "https://sampleprojects-65c8b.firebaseio.com",
    projectId: "sampleprojects-65c8b",
    storageBucket: "sampleprojects-65c8b.appspot.com",
    messagingSenderId: "886523938334",
    appId: "1:886523938334:web:aa4a19b8d79ff0d6"
}

export const fb = firebase.initializeApp(firebaseConfig);
const baseDb = fb.firestore();
export const db = baseDb;