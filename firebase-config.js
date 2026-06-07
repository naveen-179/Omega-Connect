// Firebase Configuration — Omega Connect
const firebaseConfig = {
    apiKey: "AIzaSyBiuuJTYTsT5YmcIuDIUUyHJQ2LwHPnbIE",
    authDomain: "omega-8aedf.firebaseapp.com",
    databaseURL: "https://omega-8aedf-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "omega-8aedf",
    storageBucket: "omega-8aedf.firebasestorage.app",
    messagingSenderId: "849396453774",
    appId: "1:849396453774:web:605362eb2475955baa94df",
    measurementId: "G-9GKB9349DM"
};

firebase.initializeApp(firebaseConfig);
window.db = firebase.database();
