import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export const signInEmailPassword = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signUpEmailPassword = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};
