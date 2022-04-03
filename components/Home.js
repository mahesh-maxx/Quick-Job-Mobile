import { Ionicons } from '@expo/vector-icons';
import { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from './Dashboard';
import SavedJobScreen from './Saved';
import ProfileScreen from './Profile';
import ChatScreen from './Chat';
import JobCategoryScreen from './JobCategory';
import { createStackNavigator } from 'react-navigation-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();

export default class Home extends Component {
  constructor(props){
    super(props)
  }

  render(){
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Home'
        screenOptions={({ route,navigation }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Home') {
              return (
                <Ionicons
                  name={
                    focused
                      ? 'home-sharp'
                      : 'home-outline'
                  }
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === 'Saved') {
              return (
                <Ionicons
                  name={focused ? 'ribbon' : 'ribbon-outline'}
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === 'Chat') {
                return (
                  <Ionicons
                    name={focused ? 'chatbubbles' : 'chatbubbles-outline'}
                    size={size}
                    color={color}
                  />
                );
              }
              else if (route.name === 'Profile') {
                return (
                  <Ionicons
                    name={focused ? 'person' : 'person-outline'}
                    size={size}
                    color={color}
                  />
                );
              }
          },
          tabBarInactiveTintColor: 'gray',
          tabBarActiveTintColor: '#6b76ff',
          headerShown:false,
          tabBarLabel: navigation.isFocused() ? route.name : ''
        })}
      >
           <Tab.Screen
          name="Chat"
          component={ChatScreen}
        />
        <Tab.Screen
          name="Home"
          component={DashboardScreen}
        />
        <Tab.Screen name="Saved" component={SavedJobScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
      }
}