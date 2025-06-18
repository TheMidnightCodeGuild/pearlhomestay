// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXNZY5FG9kOIrdIeAlxCAayHtieRgUSdo",
  authDomain: "pearlhomestay-7a13d.firebaseapp.com",
  projectId: "pearlhomestay-7a13d",
  storageBucket: "pearlhomestay-7a13d.firebasestorage.app",
  messagingSenderId: "900995876415",
  appId: "1:900995876415:web:cb13ebcc8d588749691a8a",
  measurementId: "G-G1ZW3NNQYZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };