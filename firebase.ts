// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3Ngjqfmxdign5Fv6dVV7EwjnorN3eico",
  authDomain: "dropbox-clone-763c5.firebaseapp.com",
  projectId: "dropbox-clone-763c5",
  storageBucket: "dropbox-clone-763c5.appspot.com",
  messagingSenderId: "970172365426",
  appId: "1:970172365426:web:6572b7e4156077ac05a0eb",
};

// Initialize Firebase
const app = getApps.length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
