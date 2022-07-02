import { Modal } from "react-native";
import {
  ButtonText,
  Colors,
  InfoText,
  ModalContainer,
  ModalView,
  PageTitle,
  StyledButton,
} from "./styles";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

const { primary, green, tertiary, red } = Colors;

const VerificationModal = ({
  modalVisible,
  setModalVisible,
  successful,
  requestMessage,
  persistLoginAfterOTPVerification,
}) => {
  const buttonHandler = () => {
    if (successful) {
      persistLoginAfterOTPVerification();
    }
    setModalVisible(false);
  };
  return (
    <>
      <Modal animationType="slide" visible={modalVisible} transparent={true}>
        <ModalContainer>
          {!successful && (
            <FailContent
              buttonHandler={buttonHandler}
              errorMessage={requestMessage}
            />
          )}
          {successful && <SuccessContent buttonHandler={buttonHandler} />}
        </ModalContainer>
      </Modal>
    </>
  );
};
const SuccessContent = ({ buttonHandler }) => {
  return (
    <ModalView>
      <StatusBar style="dark" />
      <Ionicons name="checkmark-circle" size={100} color={green} />
      <PageTitle style={{ fontSize: 25, color: tertiary, marginBottom: 10 }}>
        Verified!
      </PageTitle>
      <InfoText style={{ marginBottom: 10 }}>
        You have successfully verified your account
      </InfoText>
      <StyledButton
        style={{ backgroundColor: green, flexDirection: "row" }}
        onPress={buttonHandler}
      >
        <ButtonText>Continue </ButtonText>
        <Ionicons name="arrow-forward-circle" size={25} color={primary} />
      </StyledButton>
    </ModalView>
  );
};
const FailContent = ({ errorMessage, buttonHandler }) => {
  return (
    <ModalView>
      <StatusBar style="dark" />
      <Ionicons name="close-circle" size={100} color={red} />
      <PageTitle style={{ fontSize: 25, color: tertiary, marginBottom: 10 }}>
        Failed!
      </PageTitle>
      <InfoText style={{ marginBottom: 10 }}>
        {`Oop! Account verification failed. ${errorMessage}`}
      </InfoText>
      <StyledButton
        style={{ backgroundColor: red, flexDirection: "row" }}
        onPress={buttonHandler}
      >
        <ButtonText>Try again </ButtonText>
        <Ionicons name="arrow-redo-circle" size={25} color={primary} />
      </StyledButton>
    </ModalView>
  );
};

export default VerificationModal;
