import styled from "styled-components/native";
import { colors } from "../colors";
import { ScreenHeight, StatusBarHeight } from "../shared";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { primary, secondary, accent } = colors;

const IconBg = styled.View`
  background-color: ${secondary};
  width: ${ScreenHeight * 0.15}px;
  height: ${ScreenHeight * 0.15}px;
  border-radius: ${ScreenHeight * 0.2}px;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

const IconHeader = ({ name, size, color, ...props }) => {
  return (
    <IconBg style={{ ...props.style }}>
      <MaterialCommunityIcons
        name={name}
        size={ScreenHeight * 0.08}
        color={color ? color : accent}
      />
    </IconBg>
  );
};

export default IconHeader;
