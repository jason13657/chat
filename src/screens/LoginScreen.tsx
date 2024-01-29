import { styled } from "nativewind";
import { View, Text, Pressable, TextInput, Modal, ActivityIndicator } from "react-native";
import { RootStackParamlist } from "../types";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyledPressable, StyledText, StyledTextInput, StyledView } from "../styled";
import { signInEmailPassword, signUpEmailPassword } from "../firebase/auth";
import SignUp from "../modals/SignUp";

export default function LoginScreen({ navigation }: NativeStackScreenProps<RootStackParamlist, "Login">) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [isSigning, setIsSigning] = useState<boolean>(false);

  const signIn = (email: string, password: string) => {
    setIsSigning(true);
    signInEmailPassword(email, password)
      .then(() => {
        navigation.navigate("Home");
        setIsSigning(false);
      })
      .catch((error) => {
        console.log(error);
        setIsSigning(false);

        return;
      });
  };

  const closeSignUp = () => {
    setIsSignUp(false);
  };

  return (
    <StyledView className="flex-1 items-center justify-center">
      <StyledView className=" items-center w-screen">
        <StyledText className="mb-2  w-2/3 px-3">email</StyledText>
        <StyledTextInput
          autoCapitalize={"sentences"}
          className="items-center justify-center py-3 px-3 rounded-xl border-2 border-indigo-500 mb-3 w-2/3"
          value={email}
          placeholder="email@email.com"
          onChangeText={setEmail}
        />
      </StyledView>
      <StyledView className="items-center w-screen">
        <StyledText className="mb-2 w-2/3 px-3">password</StyledText>
        <StyledTextInput
          autoCapitalize={"sentences"}
          className="items-center justify-center py-3 px-3 rounded-xl border-2 border-indigo-500 mb-3 w-2/3"
          value={password}
          placeholder="password"
          secureTextEntry={true}
          onChangeText={setPassword}
        />
      </StyledView>
      <StyledPressable
        className="items-center justify-center py-2 rounded-xl border-2 border-indigo-500 mb-3 w-2/3"
        onPress={() => {
          signIn(email, password);
        }}
      >
        {isSigning ? <ActivityIndicator size={17} /> : <StyledText className="text-20">{"Sign In"}</StyledText>}
      </StyledPressable>
      <StyledPressable
        className="items-center justify-center py-2 rounded-xl border-2 border-indigo-500 w-2/3"
        onPress={() => {
          setIsSignUp(true);
        }}
      >
        <StyledText className="text-20">Sign Up</StyledText>
      </StyledPressable>
      <Modal visible={isSignUp}>
        <SignUp closeSignUp={closeSignUp} navigation={navigation} />
      </Modal>
    </StyledView>
  );
}
