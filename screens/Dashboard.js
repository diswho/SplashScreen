import { Text, View } from "react-native";
import styled from "styled-components/native";
import { colors } from "../components/colors";
import MainContainer from "../components/Containers/MainContainer";
import { ScreenHeight } from "../components/shared";
import Entypo from '@expo/vector-icons/Entypo';
import BigText from "../components/BigText";
const { primary, darkGray, success } = colors;

const TopBg = styled.View`
    background-color: ${darkGray};
    width: 100%;
    height: ${ScreenHeight * 0.3}px;
    border-radius: 30px;
    position: absolute;
    top: -30px;
`
const Dashboard = () => {
    return (
        <MainContainer style={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0 }}>
            <TopBg />
            <MainContainer style={{ backgroundColor: "transparent" }}>
                <BigText style={{ marginBottom: 25, fontWeight: "bold" }}>
                    Hello World
                </BigText>                
            </MainContainer>
        </MainContainer>
    )
}
export default Dashboard