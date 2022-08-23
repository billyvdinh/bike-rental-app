import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "../../utils/firebase";

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
