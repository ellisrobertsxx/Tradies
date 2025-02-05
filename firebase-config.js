import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsMJmO13r-awrhdyCGt7YeW3QSfiA8zNE",
  authDomain: "tradies-ellis-ally.firebaseapp.com",
  databaseURL: "https://tradies-ellis-ally-default-rtdb.firebaseio.com",
  projectId: "tradies-ellis-ally",
  storageBucket: "tradies-ellis-ally.appspot.com",
  messagingSenderId: "719572900736",
  appId: "1:719572900736:web:8f7fed0db3e212cd07bf65",
  measurementId: "G-NNFJSQHPDX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
