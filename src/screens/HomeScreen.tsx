import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamlist, UserData } from "../types";
import { useEffect, useState } from "react";
import { StyledPressable, StyledSafeAreaView, StyledText, StyledView } from "../styled";
import { ActivityIndicator, FlatList, InteractionManager, Modal, Pressable, View } from "react-native";
import SetNickname from "../modals/SetNickname";
import { User } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { getAllUser, getUserName, setUserName } from "../firebase/firestore";

export default function HomeScreen({ route, navigation }: NativeStackScreenProps<RootStackParamlist, "Home">) {
  const [user, setUser] = useState<User | null>();
  const [nickname, setNickname] = useState<string>();
  const [isSetName, setIsSetName] = useState<boolean>(false);
  const [users, setUsers] = useState<UserData[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        navigation.navigate("Login");
      }
    });
    InteractionManager.runAfterInteractions(() => {
      if (user) {
        getUserName(user.uid)
          .then((data) => {
            if (data) {
              setNickname(data.name);
            } else {
              setIsSetName(true);
            }
          })
          .then(() => {
            getAllUser().then((data) => {
              setUsers(data);
              setIsLoading(false);
            });
          });
      }
    });
  }, [user]);

  const handleSetNickName = (name: string) => {
    if (!user) {
      return;
    }
    setUserName(name, user.uid)
      .then(() => {
        setNickname(name);
        setIsSetName(false);
      })
      .catch((e) => {
        throw e;
      });
  };

  const handleChatBtn = (name: string, uid: string) => {
    if (!user) {
      return;
    }

    if (!nickname) {
      return;
    }

    const friend: UserData = {
      name,
      uid,
    };

    const me: UserData = {
      name: nickname,
      uid: user.uid,
    };

    const array = [friend, me].sort((a, b) => a.uid.localeCompare(b.uid));
    let id = "chat-";

    array.forEach((data, index) => {
      if (index === 0) {
        id += data.uid;
        id += "-";
        return;
      }
      id += data.uid;
    });

    navigation.navigate("Chat", { me, friend, id });
  };

  const userRender = (name: string, uid: string, handleChatBtn: (name: string, uid: string) => void, myUid: string | undefined) => {
    if (uid == myUid) {
      return <></>;
    }

    return (
      <StyledView className="flex-row border-2 border-indigo-500 rounded-xl mx-7 mb-3 relative">
        <StyledText className="p-3">{name}</StyledText>
        <StyledPressable
          className="absolute right-0"
          onPress={() => {
            handleChatBtn(name, uid);
          }}
        >
          <StyledText className="p-3 ">Click to chat</StyledText>
        </StyledPressable>
      </StyledView>
    );
  };

  return (
    <StyledSafeAreaView className="flex-1 items-center justify-center">
      <StyledView className="inline-flex w-screen items-center justify-center">
        <StyledText className="text-2xl relative ">Chat-{nickname}</StyledText>
        <StyledPressable
          onPress={() => {
            auth.signOut();
          }}
          className="absolute right-5 border-2 border-indigo-500 rounded-xl p-1"
        >
          <StyledText>Sign out</StyledText>
        </StyledPressable>
      </StyledView>
      {isLoading ? (
        <StyledView style={{ flex: 1, alignSelf: "stretch", justifyContent: "center" }}>
          <ActivityIndicator />
        </StyledView>
      ) : (
        <>
          <StyledView style={{ flex: 1, alignSelf: "stretch" }}>
            <FlatList
              data={users}
              renderItem={(data) => {
                return userRender(data.item.name, data.item.uid, handleChatBtn, user?.uid);
              }}
              keyExtractor={(item) => item.uid}
              contentContainerStyle={{ flex: 1, justifyContent: "center" }}
            />
          </StyledView>
          <Modal visible={isSetName}>
            <SetNickname handleSetNickName={handleSetNickName} />
          </Modal>
        </>
      )}
    </StyledSafeAreaView>
  );
}
