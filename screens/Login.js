import { Formik } from "formik";
import { useState } from "react";
import { colors } from "../components/colors";
import KeyboardAvoidingContainer from "../components/Containers/KeyboardAvoidingContainer";
import MainContainer from "../components/Containers/MainContainer";
import StyledTextInput from "../components/Inputs/StyledTextInput";
import RegularText from "../components/Texts/RegularText";
import MsgBox from "../components/Texts/MsgBox";
import RegularButton from "../components/Buttons/RegularButton";
import RowContainer from "../components/Containers/RowContainer";
import PressableText from "../components/Texts/PressableText";
const { primary } = colors;

const Login = () => {
    const [message, setMessage] = useState("");
    const [isSuccessMessage, setIsSuccessMessage] = useState("");

    const handleLogin = async (credentials, setSubmitting) => {
        try {
            setMessage(null);
            setSubmitting(false);
        } catch (error) {
            setMessage("Login failed: " + error.message);
            setSubmitting(false);
        }
    };

    return (
        <MainContainer>
            <KeyboardAvoidingContainer>
                <RegularText style={{ marginBottom: 25 }}>
                    Enter your account credentials
                </RegularText>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    onSubmit={(values, { setSubmitting }) => {
                        if (values.email == "" || values.password == "") {
                            setMessage("Please fill in all fields");
                            setSubmitting(false);
                        } else {
                            handleLogin(values, setSubmitting);
                        }
                    }}
                >
                    {({ handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        isSubmitting, }) => (
                        <>
                            <StyledTextInput label="Email Address"
                                icon="email-variant"
                                placeholder="yourmail@gmail.com"
                                keyboardType="email-address"
                                onChangeText={handleChange("email")}
                                onBlur={handleBlur("email")}
                                value={values.email}
                                isPassword={false}
                                style={{ marginBottom: 25 }} />
                            <StyledTextInput
                                label="Password"
                                icon="lock-open"
                                placeholder="* * * * * * * * *"
                                onChangeText={handleChange("password")}
                                onBlur={handleBlur("password")}
                                value={values.password}
                                isPassword={true}
                                style={{ marginBottom: 25 }}
                            />
                            <MsgBox style={{ marginBottom: 25 }} success={isSuccessMessage}>
                                {message || " "}
                            </MsgBox>
                            {!isSubmitting && (
                                <RegularButton onPress={handleSubmit}>Login</RegularButton>
                            )}
                            {isSubmitting && (
                                <RegularButton>
                                    <ActivityIndicator size="small" color={primary} />
                                </RegularButton>
                            )}
                            <RowContainer>
                                <PressableText onPress={() => { }}>
                                    New account sign up
                                </PressableText>
                                <PressableText onPress={() => { }}>
                                    Forgot password
                                </PressableText>
                            </RowContainer>
                        </>
                    )}
                </Formik>
            </KeyboardAvoidingContainer>
        </MainContainer>
    )
}
export default Login;