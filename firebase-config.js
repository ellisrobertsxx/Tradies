// Import Firebase libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoBPufyTULSyeWdDvYA_84GhvMP-RXh3Q",
  authDomain: "tradies-ellis.firebaseapp.com",
  databaseURL: "https://tradies-ellis-default-rtdb.firebaseio.com",
  projectId: "tradies-ellis",
  storageBucket: "tradies-ellis.appspot.com",
  messagingSenderId: "489651652980",
  appId: "1:489651652980:web:b646ae5ac2f2fe2696c421",
  measurementId: "G-R3XV9HGM3C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
