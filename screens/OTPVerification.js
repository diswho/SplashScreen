import { useContext, useEffect, useState } from "react";
import { colors } from "../components/colors";
import KeyboardAvoidingWrapper from "../components/Containers/KeyboardAvoidingWrapper";
import {
  BottomHalf,
  ButtonText,
  EmphasisText,
  IconBg,
  InfoText,
  Line,
  PageTitle,
  StyledButton,
  StyledContainer,
  TopHalf,
} from "../components/styles";
import { StatusBar } from "expo-status-bar";
import { Ionicons, Octicons } from "@expo/vector-icons";
import CodeInputField from "../components/CodeInputField";
import { CredentialsContext } from "../components/CredentialsContext";
import { ActivityIndicator } from "react-native";
import ResendTimer from "../components/Timers/ResendTimer";
import VerificationModal from "../components/VerificationModal";
import { baseAPIUrl } from "../components/shared";
const { primary, lightGreen, gray, brand, green } = colors;

const OTPVerification = ({ route }) => {
  const [code, setCode] = useState("");
  const [pinReady, setPinReady] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const MAX_CODE_LENGTH = 4;

  const [modalVisible, setModalVisible] = useState(false);
  const [verificationSuccessful, setVerificationSuccessful] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");

  const [timeLeft, setTimeLeft] = useState(null);
  const [targetTime, setTargetTime] = useState(null);
  const [activeResend, setActiveResend] = useState(false);

  const [resendingEmail, setResendingEmail] = useState(false);
  const [resendStatus, setResendStatus] = useState("Resend! ");

  let resendTimerInterval;
  const { email, _id } = route?.params;

  const triggerTimer = (targetTimeInSeconds = 30) => {
    setTargetTime(targetTimeInSeconds);
    setActiveResend(false);
    const finalTime = +new Date() + targetTimeInSeconds * 1000;
    resendTimerInterval = setInterval(() => caculateTimeLeft(finalTime), 1000);
  };

  const caculateTimeLeft = (finalTime) => {
    const difference = finalTime - +new Date();
    if (difference >= 0) {
      setTimeLeft(Math.round(difference / 1000));
    } else {
      clearInterval(resendTimerInterval);
      setActiveResend(true);
      setTimeLeft(null);
    }
    // console.log(`====difference: ${Math.round(difference / 1000)}`);
    // console.log(`====_id: ${_id}`);
  };

  useEffect(() => {    
    triggerTimer();
    return () => {
      clearInterval(resendTimerInterval);
    };
  }, []);

  const resendEmail = async () => {
    setResendingEmail(true);
    const url = `${baseAPIUrl}/user/resentOTPVerificationCode/`;
    try {
      await axios.post(url, { email, userId });
      setResendStatus("Resent!");
    } catch (error) {
      setResendStatus("Failed!");
      alert("Resending verification email failed");
    }

    setResendingEmail(false);

    setTimeout(() => {
      setResendStatus("Resend");
      setActiveResend(false);
      triggerTimer();
    }, 5000);
  };

  const submitOtpVerification = async () => {
    try {
      setVerifying(true);
      const url = `${baseAPIUrl}/user/verifiOTP/`;
      const payload = JSON.stringify({
        userId: _id,
        otp: code,
      });
      const result = await axios.post(url, { userId: _id, otp: code });
      // console.log(`==== submitOtpVerification:${JSON.stringify(result)}`);
      const { data } = result;
      if (data.status !== "VERIFIED") {
        setVerificationSuccessful(false);
        setRequestMessage(data.message);
      } else {
        setVerificationSuccessful(true);
      }
      setModalVisible(true);
      setVerifying(false);
    } catch (error) {
      setRequestMessage(error.message);
      setVerificationSuccessful(false);
      setModalVisible(true);
      setVerifying(false);
    }
  };

  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

  const persistLoginAfterOTPVerification = async () => {
    try {
      const tempUser = await AsyncStorage.getItem("humanResourceCredentials");
      console.log(`==== Verification-tempUser: ${tempUser}`);
      // console.log(`==== Verification-tempUser: ${JSON.stringify(tempUser)}`);
      await AsyncStorage.setItem("humanResourceCredentials", tempUser);
      setStoredCredentials(tempUser);
      // setStoredCredentials(JSON.stringify(tempUser));
    } catch (error) {
      alert(`Error with persist user data. ${error.message}`);
    }
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer style={{ alignItems: "center" }}>
        <TopHalf>
          <IconBg>
            <StatusBar style="dark" />
            <Octicons name="lock" size={125} color={brand} />
          </IconBg>
        </TopHalf>
        <BottomHalf>
          <PageTitle style={{ fontSize: 25 }}>Account Verification</PageTitle>
          <InfoText>
            Please enter the 4 digits code send
            <EmphasisText>{` ${email}`}</EmphasisText>
          </InfoText>
          <CodeInputField
            setPinReady={setPinReady}
            code={code}
            setCode={setCode}
            maxLength={MAX_CODE_LENGTH}
          />
          {!verifying && pinReady && (
            <StyledButton
              style={{ backgroundColor: green, flexDirection: "row" }}
              onPress={submitOtpVerification}
            >
              <ButtonText>Verify </ButtonText>
              <Ionicons name="checkmark-circle" size={25} color={primary} />
            </StyledButton>
          )}
          {!verifying && !pinReady && (
            <StyledButton
              disabled={true}
              style={{ backgroundColor: lightGreen, flexDirection: "row" }}
              onPress={submitOtpVerification}
            >
              <ButtonText style={{ color: gray }}>Verify </ButtonText>
              <Ionicons name="checkmark-circle" size={25} color={gray} />
            </StyledButton>
          )}
          {verifying && (
            <StyledButton
              disabled={true}
              style={{ backgroundColor: green, flexDirection: "row" }}
              onPress={submitOtpVerification}
            >
              <ActivityIndicator size="large" color={primary} />
            </StyledButton>
          )}
          <Line />
          {verificationSuccessful}
          <ResendTimer
            activeResend={activeResend}
            resendingEmail={resendingEmail}
            resendStatus={resendStatus}
            timeLeft={timeLeft}
            targetTime={targetTime}
            resendEmail={resendEmail}                      
          />
        </BottomHalf>
        <VerificationModal
          successful={verificationSuccessful}
          setModalVisible={setModalVisible}
          requestMessage={requestMessage}
          modalVisible={modalVisible}          
          persistLoginAfterOTPVerification={persistLoginAfterOTPVerification}
        />
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

export default OTPVerification;
