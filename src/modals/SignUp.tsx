import { useState } from "react";
import { StyledPressable, StyledText, StyledTextInput, StyledView } from "../styled";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamlist } from "../types";
import { signUpEmailPassword } from "../firebase/auth";
import { ActivityIndicator } from "react-native";

type SignUpPorpsT = {
  closeSignUp: () => void;
  navigation: NativeStackNavigationProp<RootStackParamlist, "Login", undefined>;
};

export default function SignUp({ closeSignUp, navigation }: SignUpPorpsT) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSigning, setIsSigning] = useState<boolean>(false);

  const handleSignUp = (email: string, password: string) => {
    setIsSigning(true);
    signUpEmailPassword(email, password)
      .then(() => {
        navigation.navigate("Home");
        closeSignUp();
      })
      .catch((error) => {
        console.log(error);
        setIsSigning(true);
        return;
      });
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
      <StyledView className=" items-center w-screen">
        <StyledText className="mb-2  w-2/3 px-3">password</StyledText>
        <StyledTextInput
          autoCapitalize={"sentences"}
          className="items-center justify-center py-3 px-3 rounded-xl border-2 border-indigo-500 mb-3 w-2/3"
          value={password}
          placeholder="password"
          onChangeText={setPassword}
          secureTextEntry={true}
        />
      </StyledView>
      <StyledPressable
        className="items-center justify-center py-2 rounded-xl border-2 border-indigo-500 mb-3 w-2/3"
        onPress={() => {
          handleSignUp(email, password);
        }}
      >
        {isSigning ? <ActivityIndicator size={17} /> : <StyledText className="text-20">{"Sign Up"}</StyledText>}
      </StyledPressable>
      <StyledPressable
        className="items-center justify-center py-2 rounded-xl border-2 border-indigo-500 w-2/3"
        onPress={() => {
          closeSignUp();
        }}
      >
        <StyledText className="text-20">Go back</StyledText>
      </StyledPressable>
    </StyledView>
  );
}
