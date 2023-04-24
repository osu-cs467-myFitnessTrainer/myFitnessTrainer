import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DashboardScreen from './src/screens/DashboardScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import AvatarScreen from './src/screens/AvatarScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{title: 'myFitnessTrainer'}}
        />
        <Stack.Screen 
          name="SignUp" 
          component={SignUpScreen} 
          options={{title: 'myFitnessTrainer'}}
          />
        <Stack.Screen name="Dashboard" component={DashboardScreen} /> */}
        <Stack.Screen name="Avatar" component={AvatarScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
