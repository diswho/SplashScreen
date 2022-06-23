import styled from "styled-components/native";
import { colors } from "../colors";
import RegularText from "../Texts/RegularText";

const { primary, accent } = colors;

const StyledPressable = styled.TouchableOpacity`
  padding-vertical: 5px;
  align-self: center;
`;

const PressableText = (props) => {
  return (
    <StyledPressable onPress={props.onPress} {...props}>
      <RegularText style={{ color: accent }}>{props.children}</RegularText>
    </StyledPressable>
  );
};

export default PressableText;
