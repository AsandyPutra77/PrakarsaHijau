// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_SYaioczBVuzXhfk6v11TqSduJfpGQl4",
  authDomain: "prakarsa-backend.firebaseapp.com",
  projectId: "prakarsa-backend",
  storageBucket: "prakarsa-backend.appspot.com",
  messagingSenderId: "3338122855",
  appId: "1:3338122855:web:4915f34d38b444b744c6c2",
  measurementId: "G-EJ5E81T8B3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth()
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app;