import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CredentialsContext } from "../components/CredentialsContext";
import { colors } from "../components/colors";
import Dashboard from "../screens/Dashboard";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import OTPVerification from "../screens/OTPVerification";
import ForgotPassword from "../screens/ForgotPassword";
import ResetPassword from "../screens/ResetPassword";

const Stack = createNativeStackNavigator();
const { primary, tertiary } = colors;
const RootStack = (props) => {
    props.onLayout()
    return (
        <CredentialsContext.Consumer>
            {({ storedCredentials }) => (
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerStyle: {
                                backgroundColor: "transparent",
                            },
                            headerTintColor: tertiary,
                            headerTransparent: true,
                            headerTitle: "",
                            headerLeftContainerStyle: {
                                paddingLeft: 20,
                            },
                        }}
                        initialRouteName="Login">
                        {storedCredentials ? (<Stack.Screen name="Dashboard" component={Dashboard} />) :
                            (<>
                                <Stack.Screen name="ResetPassword" component={ResetPassword} />
                                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                                <Stack.Screen name="OTPVerification" component={OTPVerification} />
                                <Stack.Screen name="Signup" component={Signup} />
                                <Stack.Screen name="Login" component={Login} />
                            </>)}
                    </Stack.Navigator>
                </NavigationContainer>
            )}
        </CredentialsContext.Consumer>

    )
}
export default RootStack