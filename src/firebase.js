import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";
// Оставлю свои токены для вашего теста
const firebaseConfig = {
  apiKey: "AIzaSyBpBVLqfo2mYgK4C-x3EHBgNCvXLnUIxOw",
  authDomain: "simple-coin-c5360.firebaseapp.com",
  projectId: "simple-coin-c5360",
  storageBucket: "simple-coin-c5360.appspot.com",
  messagingSenderId: "917493648442",
  appId: "1:917493648442:web:3e732f0614f6e7bacc7903"
}


export const app = initializeApp(firebaseConfig)

export const db = getFirestore(app);