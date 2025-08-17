import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCZ4z7ciGcINlc2SzThwKvJ9BtYQAbmrCg",
  authDomain: "tracksub-app.firebaseapp.com",
  projectId: "tracksub-app",
  storageBucket: "tracksub-app.firebasestorage.app",
  messagingSenderId: "35598700280",
  appId: "1:35598700280:web:4b0a597cb87853d3ebb50d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);