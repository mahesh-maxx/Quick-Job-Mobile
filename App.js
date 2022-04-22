import React from 'react';
import { Component } from 'react';
import 'react-native-gesture-handler'
import { Image,View,TouchableOpacity } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import FlashScreen from './components/FlashScreen'
import LoginScreen from './components/LoginScreen'
import RegisterScreen from './components/RegisterScreen';
import ForgetpasswordScreen from './components/ForgetPassword';
import { Ionicons } from '@expo/vector-icons'; 
import Home from './components/Home';
import NotificationScreen from './components/Notifications';
import ProfileScreen from './components/Profile';
import SavedJobScreen from './components/Saved';
import ChatScreen from './components/Chat';
import AppIntro from './components/Appintro';

class NavigationDrawerStructure extends Component {

  toggleDrawer = () => {
    this.props.navigationProps.openDrawer();
  };
  
  render() {
    return (
      <View style={{ flexDirection: "row" ,justifyContent:'space-around' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          {/*Donute Button Image */}
          <Ionicons name="menu" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      
    );
  }
}

class NotificationButton extends Component {

  render() {
    return (
      <View style={{ flexDirection: "row",justifyContent:'space-around' }}>
        <TouchableOpacity style={{ marginRight: 10 }} >
        <Ionicons name="search" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginRight: 10 }} onPress={()=>this.props.navigationProps.navigate('Notification')} >
        <Ionicons name="notifications" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
      
    );
  }
}

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
    Forget: ForgetpasswordScreen
  }
); 

const DashboardStackNavigator = createStackNavigator(
  {
    Dashboard:{
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        title: "Hello John,",
        headerLeft:  () =>  <NavigationDrawerStructure navigationProps={navigation} />,
        headerRight: () =>  <NotificationButton navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: "#653ef0",
        },
        headerTintColor: "#fff",
      }),
    }
  }
); 

const ProfileStackNavigator = createStackNavigator(
  {
    Dashboard:{
      screen: ProfileScreen,
      navigationOptions: ({ navigation }) => ({
        title: "My Profile",
        headerLeft:  () =>  <NavigationDrawerStructure navigationProps={navigation} />,
        headerRight: () =>  <NotificationButton navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: "#653ef0",
        },
        headerTintColor: "#fff",
      }),
    }
  }
); 

const SavedStackNavigator = createStackNavigator(
  {
    Dashboard:{
      screen: SavedJobScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Saved Job",
        headerLeft:  () =>  <NavigationDrawerStructure navigationProps={navigation} />,
        headerRight: () =>  <NotificationButton navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: "#653ef0",
        },
        headerTintColor: "#fff",
      }),
    }
  }
); 

const ChatStackNavigator = createStackNavigator(
  {
    Dashboard:{
      screen: ChatScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Messages",
        headerLeft:  () =>  <NavigationDrawerStructure navigationProps={navigation} />,
        headerRight: () =>  <NotificationButton navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: "#653ef0",
        },
        headerTintColor: "#fff",
      }),
    }
  }
); 

const Drawer = createDrawerNavigator(
  {
    Screen1: {
      screen: DashboardStackNavigator,
      navigationOptions: {
        drawerLabel: "DashBoard",
        drawerIcon: (
          <Ionicons
          name={'home-sharp'}
          size={25}
          color="#653ef0"
        />
        ),
      },  
    },
    screen2:{
      screen: ProfileStackNavigator,
      navigationOptions: {
        drawerLabel: "My Profile",
        drawerIcon: (
          <Ionicons
                  name={'person'}
                  size={25}
                  color="#653ef0"
                />
        ),
      }, 
    },
    screen3:{
      screen: SavedStackNavigator,
      navigationOptions: {
        drawerLabel: "Saved Job",
        drawerIcon: (
          <Ionicons
                  name={'bookmark'}
                  size={25}
                  color="#653ef0"
                />
        ),
      }, 
    },
    screen4:{
      screen: ChatStackNavigator,
      navigationOptions: {
        drawerLabel: "Messages",
        drawerIcon: (
          <Ionicons
                  name={'chatbubbles'}
                  size={25}
                  color="#653ef0"
                />
        ),
      }, 
    }
},{
  drawerPosition:'left',
  contentOptions:{
    itemStyle:{
      marginTop:20,
      alignItems:'center'
    }
  }
});

const DrawerNavigator = createStackNavigator({
  Drawer: { screen: Drawer, navigationOptions: { headerShown: false } },
  Notification:{screen:NotificationScreen,navigationOptions: { title: "Notifications" }},
  AppIntro:{screen:AppIntro,navigationOptions: { headerShown: false }},
  Profile:{screen:ProfileScreen,navigationOptions: { title: "Profile" }},


});

const AppStack = DrawerNavigator

export default createAppContainer(
  createSwitchNavigator(
    {
      Flash: FlashScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "Flash",
    }
  )
);



