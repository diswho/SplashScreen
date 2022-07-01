import { Ionicons, Octicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { useContext, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { colors } from "../components/colors";
import KeyboardAvoidingWrapper from "../components/Containers/KeyboardAvoidingWrapper";
import { CredentialsContext } from "../components/CredentialsContext";
import { baseAPIUrl } from "../components/shared";
import {
  InnerContainer,
  PageLogo,
  StyledContainer,
  PageTitle,
  SubTitle,
  StyledFormArea,
  LeftIcon,
  StyledInputLabel,
  StyledTextInput,
  RightIcon,
  MsgBox,
  StyledButton,
  ButtonText,
  Line,
  ExtraView,
  TextLink,
  TextLinkContent,
  ExtraText,
} from "../components/styles";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { primary, darkLight, brand } = colors;

const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

  const handleMessage = (message, type = "FAILED") => {
    setMessage(message);
    setMessageType(type);
  };

  const handleLogin = (credentials, setSubmitting) => {
    handleMessage(null);
    const url = `${baseAPIUrl}/user/signin/`;
    // const url = "http://115.84.121.41:6768/user/signin/";
    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        const { status, message, data } = result;
        // if (status == "PENDING") {
        //   handleMessage(message, status);
        //   persistLogin({ ...data }, message, status);
        //   navigation.navigate("OTPVerification", { ...data })
        // } else 
        if (status !== "SUCCESS"){
          handleMessage(message, status);
        }
        else {
          persistLogin({ ...data[0] }, message, status);
        }
        setSubmitting(false);
      })
      .catch((error) => {
        setSubmitting(false);
        console.error(error);
        handleMessage(error.response.data.message);
      });
  };

  const persistLogin = (credentials, message, status) => {
    AsyncStorage.setItem(
      "humanResourceCredentials",
      JSON.stringify(credentials)
    )
      .then((response) => {
        handleMessage(message, status);
        setStoredCredentials(credentials);
      })
      .catch((error) => {
        console.error(error);
        handleMessage("An error occurred while Persisting Login failed");
      });
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageLogo source={require("../assets/img/4565.jpg")} />
          <PageTitle>My Page</PageTitle>
          <SubTitle>Account Login</SubTitle>

          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, { setSubmitting }) => {
              if (values.email == "" || values.password == "") {
                handleMessage("Please fill all the fiedld");
                setSubmitting(false);
              } else {
                handleLogin(values, setSubmitting);
              }
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              isSubmitting,
            }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Email Address"
                  icon="mail"
                  placeholder="your_email@address.dot"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <MyTextInput
                  label="Password"
                  icon="lock"
                  placeholder="* * * * * * * * * * * * "
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                  autoCapitalize="none"
                />
                <MsgBox type={messageType}>{message}</MsgBox>
                {!isSubmitting && (
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Login</ButtonText>
                  </StyledButton>
                )}
                {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </StyledButton>
                )}

                <Line />

                <ExtraView>
                  <ExtraText>Don't have an Account already? </ExtraText>
                  <TextLink onPress={() => navigation.navigate("Signup")}>
                    <TextLinkContent>Sign Up</TextLinkContent>
                  </TextLink>
                </ExtraView>
                <ExtraView>
                  <ExtraText>Forgot Password? </ExtraText>
                  <TextLink onPress={() => navigation.navigate("ForgotPassword")}>
                    <TextLinkContent>Reset Password</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const MyTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? "md-eye-off" : "md-eye"}
            size={30}
            color={hidePassword ? darkLight : brand}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default Login;
