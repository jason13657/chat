import { onValue, ref, set } from "firebase/database";
import { RealTimeDb } from "./firebase";
import { Chat, Chats, UserData } from "../types";

export function addChat(chatId: string, chat: Chat) {
  set(ref(RealTimeDb, "chat/" + chatId + "/" + chat.id), chat);
}

export function onObserveChat(chatId: string, cb: (chats: Chats) => void) {
  const chatRef = ref(RealTimeDb, "chat/" + chatId);
  return onValue(chatRef, (snapshot) => {
    const chats = snapshot.val();
    cb(chats);
  });
}
