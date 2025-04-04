import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDrq-1bsit9OM6T2luuQ8urvPjZOxH_rGw",
  authDomain: "ummiyah-ai.firebaseapp.com",
  projectId: "ummiyah-ai",
  storageBucket: "ummiyah-ai.firebasestorage.app",
  messagingSenderId: "117812518297",
  appId: "1:117812518297:web:31c1b89d782d75345c0708",
  measurementId: "G-XVFVWEYG0H"
};

// Initialize Firebase only if it hasn't been initialized already
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize Analytics but only on the client side
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Use emulators in development environment
if (process.env.NODE_ENV === 'development') {
  // Connect to auth emulator if it's running
  if (process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === 'true') {
    connectAuthEmulator(auth, 'http://localhost:9099');
    connectFirestoreEmulator(db, 'localhost', 8080);
  }
}

export { app, auth, db, analytics };
