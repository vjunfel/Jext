// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "jext-v01.firebaseapp.com",
  projectId: "jext-v01",
  storageBucket: "jext-v01.appspot.com",
  messagingSenderId: "456056451397",
  appId: "1:456056451397:web:068a790a0044400fcf8e2c",
  measurementId: "G-1YXTFWSWN3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);