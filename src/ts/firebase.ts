import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyA1oc5oOL6pa41GfPzZoWXatALrmofPqro",
  authDomain: "bitter-f5272.firebaseapp.com",
  projectId: "bitter-f5272",
  storageBucket: "bitter-f5272.appspot.com",
  messagingSenderId: "134124285342",
  appId: "1:134124285342:web:b11c495dd09a7e1fcc3a8f",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }
