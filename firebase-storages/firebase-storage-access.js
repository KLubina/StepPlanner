import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { stepPlannerConfig } from "./firebase-configs.js";

const app = initializeApp(stepPlannerConfig, "stepPlanner");

export const db = getFirestore(app);
export const auth = getAuth(app);

export { app };

export {
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  orderBy,
  query,
  where,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
