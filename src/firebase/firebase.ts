import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.EXPO_APP_API_KEY,
  authDomain: process.env.EXPO_APP_AUTH_DOMAIN,
  projectId: process.env.EXPO_APP_PROJECT_ID,
  databaseURL: process.env.EXPO_APP_DATABASE_URL,
  storageBucket: process.env.EXPO_APP_STROAGE_BUCKET,
  messagingSenderId: process.env.EXPO_APP_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_APP_APP_ID,
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const FirestoreDb = getFirestore(firebaseApp);
export const RealTimeDb = getDatabase(firebaseApp);
