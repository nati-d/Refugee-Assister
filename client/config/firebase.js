import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyBUEVBjaMvdvhlZw-E_Tj90D6kiv6rAoSw",
  authDomain: "assister-cbdd5.firebaseapp.com",
  projectId: "assister-cbdd5",
  storageBucket: "assister-cbdd5.appspot.com",
  messagingSenderId: "153070527143",
  appId: "1:153070527143:web:0832c292af0364394c3182"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)