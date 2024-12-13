// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_SCgoyD6rf6ZKtop-GwmdTX-e08A7nMA",
  authDomain: "url-shortener-35029.firebaseapp.com",
  databaseURL:
    "https://url-shortener-35029-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "url-shortener-35029",
  storageBucket: "url-shortener-35029.firebasestorage.app",
  messagingSenderId: "904574150035",
  appId: "1:904574150035:web:2c4c84a4975549c5a43466",
  measurementId: "G-XHLQWH2CCN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication
export const auth = getAuth(app);
export default app;
