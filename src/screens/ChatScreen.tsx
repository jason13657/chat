import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Chat, Chats, RootStackParamlist } from "../types";
import { StyledPressable, StyledSafeAreaView, StyledText, StyledTextInput, StyledView } from "../styled";
import { useEffect, useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, StatusBar } from "react-native";
import uuid from "react-native-uuid";
import { addChat, onObserveChat } from "../firebase/realtime";

export default function ChatScreen({ route, navigation }: NativeStackScreenProps<RootStackParamlist, "Chat">) {
  const [text, setText] = useState<string>("");
  const [data, setData] = useState<Chat[]>();

  useEffect(() => {
    onObserveChat(route.params.id, (chats) => {
      if (!chats) {
        console.log(chats);

        return;
      }
      const _data: Chat[] = [];
      Object.keys(chats).forEach((_key) => {
        _data.push(chats[_key]);
      });
      setData(_data.sort((a, b) => b.timestamp - a.timestamp));
    });
  }, []);

  const renderChat = (chat: Chat) => {
    return (
      <>
        {chat.who.uid === route.params.me.uid ? (
          <StyledView className="flex-row p-1 m-1 items-center justify-end">
            <StyledView>
              <StyledText>me : </StyledText>
            </StyledView>
            <StyledText className="text-xl">{chat.content}</StyledText>
          </StyledView>
        ) : (
          <StyledView className="flex-row p-1 m-1 items-center">
            <StyledView>
              <StyledText>{chat.who.name} : </StyledText>
            </StyledView>
            <StyledText className="text-xl">{chat.content}</StyledText>
          </StyledView>
        )}
      </>
    );
  };

  const handleSend = (text: string) => {
    const chat: Chat = {
      id: uuid.v4().toString(),
      who: route.params.me,
      content: text,
      timestamp: new Date().getTime(),
    };

    addChat(route.params.id, chat);
  };

  return (
    <StyledSafeAreaView className="flex-1" style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}>
      <KeyboardAvoidingView
        style={{ flex: 1, marginTop: 5 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={10}
      >
        {/* header */}
        <StyledView className="justify-center relative flex-row items-center">
          <StyledPressable
            className="absolute left-5 p-1 border-2 border-indigo-500 rounded-xl"
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <StyledText>Back</StyledText>
          </StyledPressable>
          <StyledText className="text-2xl">Chat with {route.params.friend.name}</StyledText>
        </StyledView>
        {/* body */}
        <StyledView className="flex-1 p-3">
          <FlatList
            data={data}
            renderItem={(item) => {
              return renderChat(item.item);
            }}
            keyExtractor={(item) => item.id}
            inverted={true}
          />
        </StyledView>
        {/* footer */}
        <StyledView className="justify-center relative flex-row items-center px-5">
          <StyledTextInput
            value={text}
            onChangeText={setText}
            placeholder="what to say"
            style={{ fontSize: 20 }}
            className="flex-1 text-start px-2 py-1 border-2 border-indigo-500 rounded-xl"
            multiline={true}
          />
          <StyledPressable
            className="p-1 border-2 border-indigo-500 rounded-xl"
            onPress={() => {
              handleSend(text);
              setText("");
            }}
          >
            <StyledText style={{ fontSize: 20 }}>Send</StyledText>
          </StyledPressable>
        </StyledView>
      </KeyboardAvoidingView>
    </StyledSafeAreaView>
  );
}
