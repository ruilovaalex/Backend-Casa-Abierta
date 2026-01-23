
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDf1L3EIBymEcvSzLljZOCmOdCtKUCkc98",
  authDomain: "casa-abierta-backend.firebaseapp.com",
  projectId: "casa-abierta-backend",
  storageBucket: "casa-abierta-backend.firebasestorage.app",
  messagingSenderId: "1064551565011",
  appId: "1:1064551565011:web:6a2b6ccd7c5d09680cf626"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
