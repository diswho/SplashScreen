import { Ionicons, Octicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { useContext, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { colors } from "../components/colors";
import KeyboardAvoidingWrapper from "../components/Containers/KeyboardAvoidingWrapper";
import { CredentialsContext } from "../components/CredentialsContext";
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

const { primary, darkLight, brand } = colors;

const ForgotPassword = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

  const handleMessage = (message, type = "FAILED") => {
    setMessage(message);
    setMessageType(type);
  };

  const handleReset = (credentials, setSubmitting) => {
    handleMessage(null);
    const url = "http://115.84.121.41:6768/user/signin/";
    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        const { status, message, data } = result;
        if (status !== "SUCCESS") {
          handleMessage(message, status);
        } else {
          persistReset({ ...data[0] }, message, status);
        }
        setSubmitting(false);
      })
      .catch((error) => {
        setSubmitting(false);
        console.error(error);
        handleMessage(error.response.data.message);
      });
  };

  const persistReset = (credentials, message, status) => {
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
          {/* <PageLogo source={require("../assets/img/4565.jpg")} /> */}
          <PageTitle>Reset Password</PageTitle>
          <SubTitle>Account Login</SubTitle>

          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, { setSubmitting }) => {
              if (values.email == "" || values.password == "") {
                handleMessage("Please fill all the fiedld");
                setSubmitting(false);
              } else {
                handleReset(values, setSubmitting);
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
                <MsgBox type={messageType}>{message}</MsgBox>
                {!isSubmitting && (
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Submit</ButtonText>
                  </StyledButton>
                )}
                {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </StyledButton>
                )}
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
      
    </View>
  );
};

export default ForgotPassword;
