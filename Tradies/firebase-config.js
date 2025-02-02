import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";


const firebaseConfig = {
    apiKey: "AIzaSyCoBPufyTULSyeWdDvYA_84GhvMP-RXh3Q",
    authDomain: "tradies-ellis.firebaseapp.com",
    databaseURL: "https://tradies-ellis-default-rtdb.firebaseio.com",
    projectId: "tradies-ellis",
    storageBucket: "tradies-ellis.firebasestorage.app",
    messagingSenderId: "489651652980",
    appId: "1:489651652980:web:b646ae5ac2f2fe2696c421",
    measurementId: "G-R3XV9HGM3C"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, set, get, child };