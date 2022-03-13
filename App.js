import React from 'react';
import { SafeAreaProvider} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FlashScreen from './components/FlashScreen'
import LoginScreen from './components/LoginScreen'
import RegisterScreen from './components/RegisterScreen';
import ForgetpasswordScreen from './components/ForgetPassword';

const Stack = createNativeStackNavigator(); 

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Flash" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Flash" component={FlashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Forget" component={ForgetpasswordScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}


