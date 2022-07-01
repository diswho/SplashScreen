import { StatusBar } from "expo-status-bar";
import { useContext, useState } from "react";
import { colors } from "../components/colors";
import { CredentialsContext } from "../components/CredentialsContext";
import { ButtonText, InnerContainer, PageTitle, StyledButton, StyledFormArea, WelcomeContainer, WelcomeImage } from "../components/styles";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { primary, darkGray, success } = colors;

const Dashboard = () => {
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    // console.log(`==== storedCredentials: ${storedCredentials}`)
    // console.log(`==== storedCredentials: ${JSON.stringify(storedCredentials)}`)
    const handleMessage = (message, type = "FAILED") => {
        setMessage(message);
        setMessageType(type);
    };

    const clearLogin = async () => {
        // console.log(" ======== clearLogin ========")
        try {            
            await AsyncStorage.removeItem("humanResourceCredentials");
            setStoredCredentials("");            
            // console.log(`==== storedCredentials: ${JSON.stringify(storedCredentials)}`)
        } catch (error) {
            handleMessage("==== Log Out Error", error);
        }
    }
    return (
        <>
            <StatusBar style="light" />
            <InnerContainer>
                <WelcomeImage
                    resizeMode="cover"
                    source={require("../assets/img/HR_Logo.jpg")}
                />
                <WelcomeContainer>
                    <PageTitle welcome={true}>Dashboard</PageTitle>
                    <StyledFormArea>
                        <StyledButton onPress={clearLogin}>
                            <ButtonText>Logout</ButtonText>
                        </StyledButton>
                    </StyledFormArea>
                </WelcomeContainer>
            </InnerContainer>
        </>
    )
}
export default Dashboard