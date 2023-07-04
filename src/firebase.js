import {initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
   // Firebase configuration
};

const app = initializeApp(firebaseConfig)

export const firestore = getFirestore(app);
export const storage = getStorage(app);
