import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView } from "react-native";
import { colors } from "../colors";
const { primary } = colors;

const KeyboardAvoidingContainer = (props) => {
    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundcolor: "transparent" }}
            behavior={Platform.OS === 'ios' ? "padding" : "height"}
            keyboardVerticalOffset={60}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <Pressable onPress={Keyboard.dismiss}>{props.children}</Pressable>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
export default KeyboardAvoidingContainer;