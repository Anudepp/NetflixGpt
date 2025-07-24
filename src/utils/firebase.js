// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDer3UCv5PirUwDL_dadIYSc8DrDIJlk5w",
  authDomain: "netflixgpt-7af15.firebaseapp.com",
  projectId: "netflixgpt-7af15",
  storageBucket: "netflixgpt-7af15.firebasestorage.app",
  messagingSenderId: "485482965387",
  appId: "1:485482965387:web:d448487da678378cc3678e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
