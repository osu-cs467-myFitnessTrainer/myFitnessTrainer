import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Avatar from "./src/components/Avatar";
import SettingsButton from "./src/components/SettingsButton";
import DashboardScreen from "./src/screens/DashboardScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import CreateNewPlanScreen from "./src/screens/CreateNewPlanScreen";
import WorkoutSummaryScreen from "./src/screens/WorkoutSummaryScreen";
import WorkoutScreen from "./src/screens/WorkoutScreen";
import AvatarScreen from './src/screens/AvatarScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Avatar"
                    component={AvatarScreen} 
                    options={{ headerTitleAlign: "center" }}
                />
                <Stack.Screen
                    name="Dashboard"
                    component={DashboardScreen}
                    options={{
                        headerTitleAlign: "center",
                        headerLeft: () => <Avatar />,
                        headerRight: () => <SettingsButton />,
                    }}
                />
                {/* <Stack.Screen
                    name="SignIn"
                    component={SignInScreen}
                    options={{
                        title: "myFitnessTrainer",
                        headerTitleAlign: "center",
                    }}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUpScreen}
                    options={{
                        title: "myFitnessTrainer",
                        headerTitleAlign: "center",
                    }}
                />
                <Stack.Screen
                    name="Dashboard"
                    component={DashboardScreen}
                    options={{
                        headerTitleAlign: "center",
                        headerLeft: () => <Avatar />,
                        headerRight: () => <SettingsButton />,
                    }}
                />
                <Stack.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{ headerTitleAlign: "center" }}
                />
                <Stack.Screen
                    name="Create Fitness Plan"
                    component={CreateNewPlanScreen}
                    options={{ headerTitleAlign: "center" }}
                />
                <Stack.Screen
                    name="Workout Summary"
                    component={WorkoutSummaryScreen}
                    options={{ headerTitleAlign: "center" }}
                />
                <Stack.Screen
                    name="Workout"
                    component={WorkoutScreen}
                    options={{ headerTitleAlign: "center" }}
                /> */}
            </Stack.Navigator>
        </NavigationContainer>
        
    );
}
