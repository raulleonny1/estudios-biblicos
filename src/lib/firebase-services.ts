import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { firebaseApp } from "./firebase";

export const auth = getAuth(firebaseApp);
const firestoreDatabaseId = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_ID;

export const db = firestoreDatabaseId
  ? getFirestore(firebaseApp, firestoreDatabaseId)
  : getFirestore(firebaseApp);
