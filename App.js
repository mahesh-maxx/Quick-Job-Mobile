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
import DashboardScreen from './components/Dashboard';
import { Ionicons } from '@expo/vector-icons'; 
import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './components/Home';
import NotificationScreen from './components/Notifications';
import ProfileScreen from './components/Profile';
import SavedJobScreen from './components/Saved';

class NavigationDrawerStructure extends Component {

  toggleDrawer = () => {
    this.props.navigationProps.openDrawer();
  };
  
  render() {
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={{ marginRight: 10 }} onPress={()=>this.props.navigationProps.navigate('Notification')} >
        <Ionicons name="notifications" size={30} color="#6b76ff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          {/*Donute Button Image */}
          <Image
            source={require("./assets/logo.png")}
            style={{ width: 30, height: 30, marginRight: 7, borderRadius: 50, borderColor:'#6b76ff',borderWidth:1 }}
          />
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
        headerRight:  () =>  <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#6b76ff",
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
        headerRight:  () =>  <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#6b76ff",
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
        headerRight:  () =>  <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#6b76ff",
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
          <Image
            style={{ width: 25, height: 20, marginBottom: 0, marginTop: 10 }}
            source={require("./assets/icon.png")}
          />
        ),
      },  
    },
    screen2:{
      screen: ProfileStackNavigator,
      navigationOptions: {
        drawerLabel: "My Profile",
        drawerIcon: (
          <Image
            style={{ width: 25, height: 20, marginBottom: 0, marginTop: 10 }}
            source={require("./assets/icon.png")}
          />
        ),
      }, 
    },
    screen3:{
      screen: SavedStackNavigator,
      navigationOptions: {
        drawerLabel: "Saved Job",
        drawerIcon: (
          <Image
            style={{ width: 25, height: 20, marginBottom: 0, marginTop: 10 }}
            source={require("./assets/icon.png")}
          />
        ),
      }, 
    }
},{
  drawerPosition:'right',
  contentOptions:{
    itemStyle:{
      marginTop:23,
      alignItems:'center'
    }
  }
});

const DrawerNavigator = createStackNavigator({
  Drawer: { screen: Drawer, navigationOptions: { headerShown: false } },
  Notification:{screen:NotificationScreen,navigationOptions: { title: "Notifications" }},
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



