// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   updateProfile,
// } from 'firebase/auth';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBqK28xd5iW5Y8R_DOwyDWmx3Eq2O4ZTso',
  authDomain: 'react-firebase-chat-app-3f548.firebaseapp.com',
  projectId: 'react-firebase-chat-app-3f548',
  storageBucket: 'react-firebase-chat-app-3f548.appspot.com',
  messagingSenderId: '840356853044',
  appId: '1:840356853044:web:120a9bc38a82fa07eb2161',
  measurementId: 'G-9BWGDQPK93',
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
// const authService = getAuth();

export default firebase;
