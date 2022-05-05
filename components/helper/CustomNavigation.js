import React from 'react'
import LoginScreen from '../LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import Home from '../Home';
import JobCategoryScreen from '../JobCategory';

const Stack = createNativeStackNavigator()

const HomeScreenNavigator = () => {
    return(
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="JobCategory" component={JobCategoryScreen} />
            <Stack.Screen name="Main" component={Home} options={{ headerShown: false }} />
        </Stack.Navigator>
    </NavigationContainer>
    )
}
export {HomeScreenNavigator}
