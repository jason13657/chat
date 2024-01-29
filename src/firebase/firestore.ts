import { DocumentData, addDoc, collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { FirestoreDb } from "./firebase";
import { UserData } from "../types";

export const setUserName = async (name: string, uid: string) => {
  return await setDoc(doc(FirestoreDb, "users", uid), {
    name,
    uid,
  });
};

export const getUserName = async (uid: string) => {
  return await getDoc(doc(FirestoreDb, "users", uid)).then((value) => {
    return value.data();
  });
};

export const getAllUser = async () => {
  const ref = collection(FirestoreDb, "users");

  return await getDocs(ref)
    .then((value) => {
      const users: UserData[] = [];
      value.docs.forEach((doc) => {
        users.push({ uid: doc.data().uid, name: doc.data().name });
      });
      return users;
    })
    .catch((e) => {
      throw e;
    });
};
