import { useEffect, useRef, useState } from "react";
import {
  CodeInput,
  CodeInputFocused,
  CodeInputsContainer,
  CodeInputSection,
  CodeInputText,
  HiddenTextInput,
} from "./styles";
const CodeInputField = ({ setPinReady, code, setCode, maxLength }) => {
  const codeDigitalsArray = new Array(maxLength).fill(0);
  const textInputRef = useRef(null);
  const [inputContainerIsFocused, setInputContainerIsFocused] = useState(false);

  const handleOnBlur = () => {
    setInputContainerIsFocused(false);
  };

  const handleOnPress = () => {
    setInputContainerIsFocused(true);
    textInputRef?.current?.focus();
  };
  useEffect(() => {
    setPinReady(code.length === maxLength);
    return () => setPinReady(false);
  }, [code]);

  const toCodeDigitInput = (_value, index) => {
    const emptyInputChar = " ";
    const digits = code[index] || emptyInputChar;

    const isCurrentDigit = index === code.length;
    const isLastDigit = index === maxLength - 1;
    const isCodeFull = code.length === maxLength;
    const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFull);
    const StyledCodeInput =
      inputContainerIsFocused && isDigitFocused ? CodeInputFocused : CodeInput;

    return (
      <StyledCodeInput key={index}>
        <CodeInputText>{digits}</CodeInputText>
      </StyledCodeInput>
    );
  };

  return (
    <CodeInputSection>
      <CodeInputsContainer onPress={handleOnPress}>
        {codeDigitalsArray.map(toCodeDigitInput)}
      </CodeInputsContainer>
      <HiddenTextInput
        ref={textInputRef}
        value={code}
        onChangeText={setCode}
        onSubmitEditing={handleOnBlur}
        keyboardType="number-pad"
        returnKeyType="done"
        textContentType="oneTimeCode"
        maxLength={maxLength}
      />
    </CodeInputSection>
  );
};

export default CodeInputField;
