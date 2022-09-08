// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJLlLkyyadIrGwona2_ihrFfMeU4OCsHY",
  authDomain: "medium-colne.firebaseapp.com",
  projectId: "medium-colne",
  storageBucket: "medium-colne.appspot.com",
  messagingSenderId: "1001845859963",
  appId: "1:1001845859963:web:70116e2474d2ecd6f124de",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
