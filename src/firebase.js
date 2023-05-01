import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAEI-4zcfxk5vEHQ1FzltIG85s9rmVHUgk",
  authDomain: "portfolio-works-aa532.firebaseapp.com",
  projectId: "portfolio-works-aa532",
  storageBucket: "portfolio-works-aa532.appspot.com",
  messagingSenderId: "337533827997",
  appId: "1:337533827997:web:edb808da88952068f6cd74"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth()
const provider = new GoogleAuthProvider()
export const storage = getStorage(app)
export const db = getFirestore(app)

export const signInWithGoogle = () => signInWithPopup(auth, provider)