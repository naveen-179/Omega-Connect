/**
 * Firebase Configuration for StrangerTalk
 *
 * SETUP INSTRUCTIONS:
 * 1. Go to https://console.firebase.google.com/
 * 2. Create a new project (disable Google Analytics if not needed)
 * 3. Go to Project Settings > General > Your apps
 * 4. Click "Add app" and select Web (</>)
 * 5. Register your app name
 * 6. Copy the firebaseConfig values below
 * 7. Enable Realtime Database:
 *    - Go to Realtime Database in sidebar
 *    - Click "Create Database"
 *    - Choose region closest to your users
 *    - Start in TEST mode (we'll add rules later)
 * 8. Set up Database Rules (copy from README.md)
 */

// Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyB-BRf47gAGkxUMkpb_hWtE9SjTgu8URR4",
    authDomain: "omega-8aedf.firebaseapp.com",
    databaseURL: "https://omega-8aedf-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "omega-8aedf",
    storageBucket: "omega-8aedf.firebasestorage.app",
    messagingSenderId: "849396453774",
    appId: "1:849396453774:web:605362eb2475955baa94df",
    measurementId: "G-9GKB9349DM"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Realtime Database
const database = firebase.database();

// Export for use in other scripts
window.db = database;

console.log('🔥 Firebase initialized');
