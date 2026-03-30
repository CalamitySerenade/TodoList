import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDFGZrQZcXxv_UPdXPwuS80_bchUpKs84Y",
    authDomain: "todolist-286a3.firebaseapp.com",
    projectId: "todolist-286a3",
    storageBucket: "todolist-286a3.firebasestorage.app",
    messagingSenderId: "155182680063",
    appId: "1:155182680063:web:0bddf050ba3ff042acc9ca"
  };
  

// Initialize Firebase outside the event listener
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 

export {app, auth, db};
