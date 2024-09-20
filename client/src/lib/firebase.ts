// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxG7YbiiLY3RLZJit72jvAVk-ItQTT4DE",
  authDomain: "electrahub-1607.firebaseapp.com",
  projectId: "electrahub-1607",
  storageBucket: "electrahub-1607.appspot.com",
  messagingSenderId: "231743316666",
  appId: "1:231743316666:web:1bf8f434179d80d2cb1883",
  measurementId: "G-VJ7MZSMP5W"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();