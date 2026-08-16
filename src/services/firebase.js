// Firebase configuration for DeepGuard+
// Using Firebase Auth for Google/GitHub/Microsoft login
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "deepguard-plus.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "deepguard-plus",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "deepguard-plus.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "000000000000",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:000000000000:web:000000000000",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const microsoftProvider = new OAuthProvider('microsoft.com');

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const signInWithGitHub = () => signInWithPopup(auth, githubProvider);
export const signInWithMicrosoft = () => signInWithPopup(auth, microsoftProvider);

export const logOut = () => signOut(auth);

export const onAuthChange = (callback) => onAuthStateChanged(auth, callback);

export { auth };
export default app;
