import { useState } from "react";
import { StyledPressable, StyledText, StyledTextInput, StyledView } from "../styled";

type SetNicknamePropsT = {
  handleSetNickName: (name: string) => void;
};

export default function SetNickname({ handleSetNickName }: SetNicknamePropsT) {
  const [name, setName] = useState<string>("");

  return (
    <StyledView className="flex-1 items-center justify-center">
      <StyledView className=" items-center w-screen">
        <StyledText className="mb-2  w-2/3 px-3">Set your chat name</StyledText>
        <StyledTextInput
          autoCapitalize={"sentences"}
          className="items-center justify-center py-3 px-3 rounded-xl border-2 border-indigo-500 mb-3 w-2/3"
          value={name}
          placeholder="name"
          onChangeText={setName}
        />
        <StyledPressable
          className="items-center justify-center py-2 rounded-xl border-2 border-indigo-500 w-2/3"
          onPress={() => {
            handleSetNickName(name);
          }}
        >
          <StyledText className="text-20">Confirm</StyledText>
        </StyledPressable>
      </StyledView>
    </StyledView>
  );
}
