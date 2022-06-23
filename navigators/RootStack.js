import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../screens/Dashboard";
import { colors } from "../components/colors";
import Login from "../screens/Login";
import { CredentialsContext } from "../components/CredentialsContext";
import Signup from "../screens/Signup";
import EmailVerification from "../screens/EmailVerification";
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
                        initialRouteName="ResetPassword">
                        {storedCredentials ? (<Stack.Screen name="Dashboard" component={Dashboard} />) : (<>
                            <Stack.Screen name="ResetPassword" component={ResetPassword} />
                            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                            <Stack.Screen name="EmailVerification" component={EmailVerification} />
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