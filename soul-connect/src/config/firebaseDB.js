import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyDXsV--5RzyM4GzaPItN4MHR8KIpw9oY0o",
  authDomain: "soulconnect-chat.firebaseapp.com",
  projectId: "soulconnect-chat",
  storageBucket: "soulconnect-chat.appspot.com",
  messagingSenderId: "848954878617",
  appId: "1:848954878617:web:dd3ed15a97d92d82516608",
  measurementId: "G-2QVS4XWZKK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
