import { Ionicons } from '@expo/vector-icons';
import { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from './Dashboard';
import SavedJobScreen from './Saved';
import ProfileScreen from './Profile';
import AppliedJobScreen from './Applied';
import JobCategoryScreen from './JobCategory';
import { Image,View,TouchableOpacity } from 'react-native'


const Tab = createBottomTabNavigator();
const BackButton =({navigation})=>{
  return(
    <View style={{ flexDirection: "row",borderRadius:10,backgroundColor:'#bddfff' }}>
       <TouchableOpacity onPress={()=> navigation.navigate("Home")} >
       <Ionicons name="chevron-back-sharp" size={24} color="#6b76ff" />
        </TouchableOpacity>
    </View>
  )
}

export default class Home extends Component {
  constructor(props){
    super(props)
  }

  render(){
  return (
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
            } else if (route.name === 'Favourite Job') {
              return (
                <Ionicons
                  name={focused ? 'bookmark' : 'bookmark-outline'}
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === 'Applied Job') {
                return (
                  <Ionicons
                    name={focused ? 'md-briefcase' : 'md-briefcase-outline'}
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
          name="Home"
          component={DashboardScreen}
        />
           <Tab.Screen
          name="Applied Job"
          component={AppliedJobScreen}
        />
        <Tab.Screen name="Favourite Job" component={SavedJobScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
  );
      }
}