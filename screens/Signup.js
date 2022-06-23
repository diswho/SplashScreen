import { useState } from "react";
import KeyboardAvoidingContainer from "../components/Containers/KeyboardAvoidingContainer";
import MainContainer from "../components/Containers/MainContainer";
import RegularText from "../components/Texts/RegularText";
import { Formik } from "formik";
import StyledTextInput from "../components/Inputs/StyledTextInput";
import MsgBox from "../components/Texts/MsgBox";
import RegularButton from "../components/Buttons/RegularButton";
import PressableText from "../components/Texts/PressableText";

const Signup = () => {
    const [message, setMessage] = useState("");
    const [isSuccessMessage, setIsSuccessMessage] = useState("");

    const handleSignup = async (credentials, setSubmitting) => {
        try {
            setMessage(null);
            setSubmitting(false);
        } catch (error) {
            setMessage("Sign failed: " + error.message);
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
                    initialValues={{
                        fullName: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        if (
                            values.fullName == "" ||
                            values.email == "" ||
                            values.password == "" ||
                            values.confirmPassword == ""
                        ) {
                            setMessage("Please fill in all fields");
                            setSubmitting(false);
                        } else if (values.password !== values.confirmPassword) {
                            setMessage("Password do not match");
                            setSubmitting(false);
                        } else {
                            handleSignup(values, setSubmitting);
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
                        <>
                            <StyledTextInput
                                label="Full Name"
                                icon="account"
                                placeholder="yourmail@gmail.com"
                                keyboardType="email-address"
                                onChangeText={handleChange("fullName")}
                                onBlur={handleBlur("fullName")}
                                value={values.fullName}
                                isPassword={false}
                                style={{ marginBottom: 15 }}
                            />
                            <StyledTextInput
                                label="Email Address"
                                icon="email-variant"
                                placeholder="yourmail@gmail.com"
                                keyboardType="email-address"
                                onChangeText={handleChange("email")}
                                onBlur={handleBlur("email")}
                                value={values.email}
                                isPassword={false}
                                style={{ marginBottom: 15 }}
                            />
                            <StyledTextInput
                                label="Password"
                                icon="lock-open"
                                placeholder="* * * * * * * * *"
                                onChangeText={handleChange("password")}
                                onBlur={handleBlur("password")}
                                value={values.password}
                                isPassword={true}
                                style={{ marginBottom: 15 }}
                            />
                            <StyledTextInput
                                label="Confirm Password"
                                icon="lock-open"
                                placeholder="* * * * * * * * *"
                                onChangeText={handleChange("confirmPassword")}
                                onBlur={handleBlur("confirmPassword")}
                                value={values.confirmPassword}
                                isPassword={true}
                                style={{ marginBottom: 15 }}
                            />
                            <MsgBox style={{ marginBottom: 25 }} success={isSuccessMessage}>
                                {message || " "}
                            </MsgBox>
                            {!isSubmitting && (
                                <RegularButton onPress={handleSubmit}>Signup</RegularButton>
                            )}
                            {isSubmitting && (
                                <RegularButton>
                                    <ActivityIndicator size="small" color={primary} />
                                </RegularButton>
                            )}
                            <PressableText style={{ paddingVertical: 15 }} onPress={() => { }}>
                                Sign in to an existing account
                            </PressableText>
                        </>
                    )}
                </Formik>
            </KeyboardAvoidingContainer>
        </MainContainer>
    )
}
export default Signup;