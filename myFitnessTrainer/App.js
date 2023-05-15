import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsButton from "./src/components/SettingsButton";
import DashboardScreen from "./src/screens/DashboardScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import CreateNewPlanScreen from "./src/screens/CreateNewPlanScreen";
import WorkoutSummaryScreen from "./src/screens/WorkoutSummaryScreen";
import WorkoutScreen from "./src/screens/WorkoutScreen";
import AvatarScreen from "./src/screens/AvatarScreen";
import ExitWorkoutButton from "./src/components/ExitWorkoutButton";
import ViewWorkoutPlanScreen from "./src/screens/ViewWorkoutPlanScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="SignIn"
                    component={SignInScreen}
                    options={{
                        title: "myFitnessTrainer",
                        headerTitleAlign: "center",
                        headerBackVisible: false
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
                        // TODO:
                        // 0. reimport 'import Avatar from "./src/components/Avatar";'
                        // 1. get user's avatar's storage location in Firebase
                        // 2. getDownloadURL from avatar's storage location and use as imageSource
                        // 3. determine pixelSize
                        // 4. then, we can have something like the following:
                        // headerLeft: () => <Avatar imgSource={imgSource} pixelSize={200} />,
                        headerRight: () => <SettingsButton />,
                    }}
                />
                <Stack.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{ headerTitleAlign: "center" }}
                />
                <Stack.Screen
                    name="Create Workout Plan"
                    component={CreateNewPlanScreen}
                    options={{ headerTitleAlign: "center" }}
                />
                <Stack.Screen
                    name="Select An Avatar"
                    component={AvatarScreen}
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
                    options={{
                        headerTitleAlign: "center",
                        gestureEnabled: false,
                        headerLeft: () => <ExitWorkoutButton />,
                    }}
                />
                <Stack.Screen
                    name="Avatar"
                    component={AvatarScreen}
                    options={{ headerTitleAlign: "center" }}
                />
                <Stack.Screen
                    name="View Workout Plan"
                    component={ViewWorkoutPlanScreen} 
                    options={{ headerTitleAlign: "center" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
