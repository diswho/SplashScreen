import { useState } from "react";
import { colors } from "../components/colors";
const { primary, secondary, lightGray } = colors;

const OTPVerification = ({ route }) => {
    const MAX_CODE_LENGTH = 4;
    const [code, setCode] = useState("");
    const [pinReady, setPinReady] = useState(false);

    const [message, setMessage] = useState("");
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);
    const [verifying, setVerifying] = useState(false);

    const [activeResend, setActiveResend] = useState(false);
    const [resendStatus, setResendStatus] = useState("Resend");
    const [resendingEmail, setResendingEmail] = useState(false);

    // modalVisible, buttonHandler, type, headerText, message, buttonText
    const [modalVisible, setModalVisible] = useState(false)
    const [modalMessageType, setModalMessageType] = useState('')
    const [headerText, setHeaderText] = useState('')
    const [modalMessage, setModalMessage] = useState('')
    const [buttonText, setButtonText] = useState('')
    const buttonHandler = () => {
        if (modalMessageType === 'success') {
            // todo
        }
        setModalVisible(false)
    }

    const showModal = (type, headerText, message, buttonText) => {
        setModalMessageType(type)
        setHeaderText(headerText)
        setModalMessage(message)
        setButtonText(buttonText)
        setModalVisible(true)
    }
    const resendEmail = async (triggerTimer) => {
        try {
            setResendingEmail(true);
            // setResendStatus()
            setResendingEmail(false);
            setTimeout(() => {
                setResendStatus("Resend");
                setActiveResend(false);
                triggerTimer();
            }, 5000);
        } catch (error) {
            setResendingEmail(false);
            setResendStatus("Failed!");
            alert("Email Resend Failed: " + error.message);
        }
    };
    const handleEmailVerification = async () => {
        try {
            setVerifying(true);
            // call backend
            setVerifying(false);
            return showModal('success', 'All Good!', 'Your account has been verified.', 'Proceed')
            // setSubmitting(false);
        } catch (error) {
            setVerifying(false);
            return showModal('failed', 'Failed!', error.message, 'Close')
            // setMessage("Login failed: " + error.message);
            // setSubmitting(false);
        }
    };
    return (
        <></>
        // <MainContainer>
        //     <KeyboardAvoidingContainer>
        //         <IconHeader name="lock-open" style={{ marginBottom: 30 }} />
        //         <RegularText style={{ textAlign: "center" }}>
        //             Enter the 4-digit code sent to your email address
        //         </RegularText>
        //         <StyledCodeInput
        //             code={code}
        //             setCode={setCode}
        //             maxLength={MAX_CODE_LENGTH}
        //             setPinReady={setPinReady}
        //         />
        //         {!verifying && pinReady && (
        //             <RegularButton onPress={handleEmailVerification}>
        //                 Verify
        //             </RegularButton>
        //         )}
        //         {!verifying && !pinReady && (
        //             <RegularButton
        //                 disabled={true}
        //                 style={{ backgroundColor: secondary }}
        //                 textStyle={{ color: lightGray }}
        //             >
        //                 Verify
        //             </RegularButton>
        //         )}
        //         {verifying && (
        //             <RegularButton disabled={true}>
        //                 <ActivityIndicator size="small" color={primary} />
        //             </RegularButton>
        //         )}
        //         <ResendTimer
        //             activeResend={activeResend}
        //             setActiveResend={setActiveResend}
        //             resendStatus={resendStatus}
        //             resendingEmail={resendingEmail}
        //             resendEmail={resendEmail}
        //         />
        //         <MessageModal modalVisible={modalVisible} buttonHandler={buttonHandler} type={modalMessageType} headerText={headerText}
        //             message={modalMessage} buttonText={buttonText} />
        //     </KeyboardAvoidingContainer>
        // </MainContainer>
    )
}

export default OTPVerification;