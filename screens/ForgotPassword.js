import { Formik } from "formik";
import KeyboardAvoidingContainer from "../components/Containers/KeyboardAvoidingContainer";
import MainContainer from "../components/Containers/MainContainer";
import StyledTextInput from "../components/Inputs/StyledTextInput";
import RegularText from "../components/Texts/RegularText";
import { useState } from "react";
import MsgBox from "../components/Texts/MsgBox";
import RegularButton from "../components/Buttons/RegularButton";
import { ActivityIndicator } from "react-native";
import { colors } from "../components/colors";
import IconHeader from "../components/icons/IconHeader";

const { primary } = colors;

const ForgotPassword = () => {
    const [message, setMessage] = useState("");
    const [isSuccessMessage, setIsSuccessMessage] = useState("");

    const handleOnSubmit = async (credentials, setSubmitting) => {
        try {
            setMessage(null);

            // Call Backend

            // move to next page

            setSubmitting(false);
        } catch (error) {
            setMessage("Request failed: " + error.message);
            setSubmitting(false);
        }
    };

    return (
        <MainContainer>
            <KeyboardAvoidingContainer>
                <IconHeader name="key" style={{ marginBottom: 30 }} />
                <RegularText style={{ marginBottom: 25 }}>
                    Provide the details below to begin the process
                </RegularText>
                <Formik
                    initialValues={{ email: "" }}
                    onSubmit={(values, { setSubmitting }) => {
                        if (values.email == "" || values.password == "") {
                            setMessage("Please fill in all fields");
                            setSubmitting(false);
                        } else {
                            handleOnSubmit(values, setSubmitting);
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
                                label="Email Address"
                                icon="email-variant"
                                placeholder="yourmail@gmail.com"
                                keyboardType="email-address"
                                onChangeText={handleChange("email")}
                                onBlur={handleBlur("email")}
                                value={values.email}
                                isPassword={false}
                                style={{ marginBottom: 25 }}
                            />
                            <MsgBox style={{ marginBottom: 25 }} success={isSuccessMessage}>
                                {message || " "}
                            </MsgBox>
                            {!isSubmitting && (
                                <RegularButton onPress={handleSubmit}>Submit</RegularButton>
                            )}
                            {isSubmitting && (
                                <RegularButton>
                                    <ActivityIndicator size="small" color={primary} />
                                </RegularButton>
                            )}
                        </>
                    )}
                </Formik>
            </KeyboardAvoidingContainer>
        </MainContainer>
    );
};

export default ForgotPassword;
