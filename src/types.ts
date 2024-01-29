import { User } from "firebase/auth";

export type RootStackParamlist = {
  Login: undefined;
  Home: undefined;
  Chat: {
    me: UserData;
    friend: UserData;
    id: string;
  };
};

export type UserData = {
  uid: string;
  name: string;
};

export type Chat = {
  id: string;
  who: UserData;
  content: string;
  timestamp: number;
};

export type Chats = {
  [id: string]: Chat;
};

new Date().getTime();
