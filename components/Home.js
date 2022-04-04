import { Ionicons } from '@expo/vector-icons';
import { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from './Dashboard';
import SavedJobScreen from './Saved';
import ProfileScreen from './Profile';
import ChatScreen from './Chat';
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
                  name={focused ? 'bookmark' : 'bookmark-outline'}
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
        <Tab.Screen name="JobCategory" component={JobCategoryScreen} options={({ navigation }) => ({
          title:'What job you want?',
          headerLeft:()=> <BackButton navigation={navigation} />,
          headerShown:true,
          tabBarIcon:null,
          headerStatusBarHeight:2,
          tabBarButton:()=>{return null},
        })} />
      </Tab.Navigator>
    </NavigationContainer>
  );
      }
}