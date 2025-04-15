import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD6arXBsGBqU855Cffd6302sU8gWyUXkP0",
    authDomain: "gotime-44111.firebaseapp.com",
    databaseURL: "https://gotime-44111-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "gotime-44111",
    storageBucket: "gotime-44111.firebasestorage.app",
    messagingSenderId: "375063856058",
    appId: "1:375063856058:web:732b9125f26bbb5af4d383",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };