// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDKOmpQ1Q61B6sdWq3QW-Y-RjZQOyyQcZM",
    authDomain: "cartelle-cliniche-zbav.firebaseapp.com",
    databaseURL: "https://cartelle-cliniche-zbav-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "cartelle-cliniche-zbav",
    storageBucket: "cartelle-cliniche-zbav.appspot.com",
    messagingSenderId: "598060716297",
    appId: "1:598060716297:web:19ac31cb677634d50ac3d8",
    measurementId: "G-GEXX3XR09B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);