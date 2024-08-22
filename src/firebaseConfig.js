// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBVxoUjJEXtC2ejwgOBiQ-cL5Nwx6sOQDY",
  authDomain: "vue-3-2024-d35b0.firebaseapp.com",
  projectId: "vue-3-2024-d35b0",
  storageBucket: "vue-3-2024-d35b0.appspot.com",
  messagingSenderId: "32718254758",
  appId: "1:32718254758:web:f6c8dacff036fb92e73a67",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth();

export { auth };
