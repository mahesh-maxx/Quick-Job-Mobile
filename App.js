import React, { createRef } from 'react';
import { Component } from 'react';
import 'react-native-gesture-handler'
import { Alert,View,TouchableOpacity,SafeAreaView,Text } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import FlashScreen from './components/FlashScreen'
import LoginScreen from './components/LoginScreen'
import RegisterScreen from './components/RegisterScreen';
import ForgetpasswordScreen from './components/ForgetPassword';
import { Ionicons } from '@expo/vector-icons'; 
import NotificationScreen from './components/Notifications';
import ProfileScreen from './components/Profile';
import SavedJobScreen from './components/Saved';
import ChatScreen from './components/Chat';
import AppIntro from './components/Appintro';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import {DrawerItems} from 'react-navigation-drawer'
import { HomeScreenNavigator} from './components/helper/CustomNavigation'

export const navigationRef = createRef()

export function navigate(name, params) {
    navigationRef.current?._navigation.navigate(name, params);
}

function logout(){
  AsyncStorageLib.removeItem("currentUserId");
    AsyncStorageLib.removeItem("userToken");
    AsyncStorageLib.removeItem("userName");
    navigate("Login",{})
}

const originalFetch = global.fetch;

global.apifetch = async (...args) => {
    let [resource, config ] = args;
    // request interceptor here
    const response = await originalFetch(resource, config);
    
    if(response.status == '400'){
      Alert.alert(
        'Token Expired',
       'Your Token has been expired. Please login again.',
       [
         
          {text: 'OK', onPress: () => logout()
    
     },
         
       ],
       {cancelable: false})
    }
   
    // response interceptor here
    return response;
};

const user ={}
AsyncStorageLib.getItem('UserName').then((name)=>{
  user['name']=name
})
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

function setTitle(navigation) {
  console.log("nava ",JSON.stringify(navigation))
  const { params } = navigation.state;
  const title = params && params.title  ? `Hello ${params.title}` : user?.name != null ? `Hello ${user.name}` : "Hello User"
  return title
}

class ContentComponent extends Component {

   logOut=()=> {
    AsyncStorageLib.removeItem("currentUserId");
    AsyncStorageLib.removeItem("userToken");
    AsyncStorageLib.removeItem("userName");
    Alert.alert(
      "Logout",
      "You have been logged out.",
      [
        {
          text: "OK",
          onPress: () => this.props.navigation.navigate("Login"),
        },
      ],
      { cancelable: false }
    );
  }
  
  onloggedout=()=> {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => this.logOut() },
      ],
      { cancelable: false }
    );
  }
  render(){return (
          <View style={{flex:1}}>
              <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                  <DrawerItems {...this.props} />
                 <TouchableOpacity style={{flexDirection:'row',marginTop:8}} onPress={this.onloggedout}>
                 <Ionicons style={{marginLeft:17}} name="exit" size={25} color="#653ef0" />
                  <Text style={{marginLeft:30,fontSize:14,fontWeight:'700'}}  >Log Out</Text>
                 </TouchableOpacity>
              </SafeAreaView>
          </View>
  )
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
      screen: HomeScreenNavigator,
      navigationOptions: ({ navigation }) => ({
        title: setTitle(navigation),
        headerLeft:  () =>  <NavigationDrawerStructure navigationProps={navigation} />,
        headerRight: () =>  <NotificationButton navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: "#653ef0",
        },
        headerTintColor: "#fff",
      })
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
        options:{drawerItemStyle: { height: 0 } }
      }
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
    },
    
},
{
  contentComponent: props => <ContentComponent {...props} />
},
{
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
  Login:{screen:LoginScreen,navigationOptions: { headerShown: false }}


});

const AppStack = DrawerNavigator

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Flash: FlashScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "Flash"
    }
  )
)
export default class App extends React.Component {

  render() {
    return (
      <AppContainer
        ref={navigationRef}
      />
    );
  }
}


