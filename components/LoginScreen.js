import { Component } from 'react';
import { StyleSheet, Text, View,Button, TouchableOpacity, Image, TextInput,Alert,Dimensions } from 'react-native';
import CheckBox from 'expo-checkbox';
import { EvilIcons,Entypo } from '@expo/vector-icons';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const win = Dimensions.get('window');

export default class LoginScreen extends Component {
    constructor(props){
      super(props);
      this.state = {
        username:"",
        password:"",
        showPass:false,
        baseUrl:global.baseUrl
      }
    }

    getProfileData=(userid,token)=>{
      var url = this.state.baseUrl + '/profile';
      let data = new FormData()
      data.append('userid',userid);
      data.append('user_type','user');
      var httpHeaders = { 'Authorization' : `bearer ${token}`};
      var myHeaders = new Headers(httpHeaders);
      apifetch(url, {
        method: 'POST',
        body: data,
        headers:myHeaders
      }).then(function (response) {
        return response.json();
      }).then((result)=>{
        AsyncStorageLib.setItem('UserName',`${result.result.firstname}`)
        const userName=  `${result.result.firstname}`
        this.props.navigation.navigate("Dashboard",{title:userName})
      }).catch((err)=>{
        console.log("err ",err)
      })
      
    }

    login=()=>{
      var url = this.state.baseUrl + '/login';
      let data = new FormData()
      data.append('username',this.state.username);
      data.append('password',this.state.password);
      apifetch(url, {
        method: 'POST',
        body: data
      }).then(function (response) {
        return response.json();
      }).then((result)=>{
        if(result.message== 'User Login Successfully.'){
          AsyncStorageLib.setItem('userToken',result.token)
          AsyncStorageLib.setItem('currentUserId',result.user_id.toString())
          this.getProfileData(result.user_id,result.token)
        } else if(result.message === 'Password mismatch' ||result.message === 'User does not exist'){
          Alert.alert(
            'Login Error',
           'The username` or password you entered is not valid',
           [
             
              {text: 'OK', onPress: () => console.log('Cancel Pressed'), 
        
         },
             
           ],
           {cancelable: false})
        }
      }).catch((err)=>{
        console.log("err ",err)
      })
    }

    render(){
        return (
          <KeyboardAwareScrollView>
          <View style={{ flex: 1,backgroundColor:'white'}}>
            <View style={{alignItems: 'center',marginTop: 60}}>
              <Text style={{textAlign: 'center',width:300, fontSize:20,marginTop:30}}>Welcome Back!</Text>
              <Text style={{textAlign: 'center', fontSize:14,marginTop:10,marginBottom:30}}>Don't have an account? 
              <Text style={{color:'#6b76ff',fontWeight:'900',paddingLeft:10}} onPress={()=>{this.props.navigation.navigate('Register')}}> SignUp Now!</Text>
              </Text>
            </View>

            <View style={{alignItems:'center',marginTop:20,flexDirection:'row',justifyContent:'space-around'}}>
            <TouchableOpacity
            style={[styles.facebook]}
            >
                <EvilIcons name="sc-facebook" size={20} color="#4267B2" style={{paddingBottom:7,paddingLeft:5,marginRight:5,paddingTop:5}} />
         <Text style={{color:'#4267B2',paddingBottom:7,fontSize:10,paddingTop:5}}> Log In via Facebook </Text>
 </TouchableOpacity>
 <TouchableOpacity
         style={[styles.google]}
       >
           <EvilIcons name="sc-google-plus" size={20} color="#DB4437" style={{paddingBottom:7,paddingLeft:5,marginRight:5,paddingTop:5}} />
         <Text style={{color:'#DB4437',paddingBottom:7,fontSize:10,paddingTop:5}}> Log In via Google </Text>
 </TouchableOpacity>
 </View>
 <View style={{alignItems: 'center',}}>
              <Text style={{textAlign: 'center',width:300, fontSize:14,letterSpacing:-1,marginTop:10}}>----------------------- or -----------------------</Text>
              </View>
          
            <View style={styles.usernameSection}>
            <EvilIcons name="user" size={28} color="black" style={styles.userIcon} />
              <TextInput placeholder="Username" background="transparent" style={styles.input}
              value={this.state.username}
              onChangeText={(username) => this.setState({ username })} />
            </View>
            <View style={styles.usernameSection}>
            <Entypo name="eye-with-line" size={24} color="black" style={styles.userIcon} />
              <TextInput placeholder="Password" background="transparent" style={styles.input} 
              secureTextEntry={!this.state.showPass}
              value={this.state.password}
              onChangeText={(password) => this.setState({ password })}/>
            </View>
            <View style={{alignItems:'flex-start', marginTop:25,  marginLeft:15 }}>
            <Text style={{fontWeight: 'bold'}} onPress={() => this.props.navigation.navigate('Forget')}>Forget Password ?</Text> 
            </View>
            <View style={{flex:1,alignItems:'center',marginTop:20}}>
            <TouchableOpacity
            disabled={this.state.password == "" || this.state.username == ""}
         style={styles.button}
         onPress={this.login}
       >
         <Text style={{color:'#fff'}}> Login </Text>
 </TouchableOpacity>
 </View>
          </View>
          </KeyboardAwareScrollView>
        );
        }
}

const styles = StyleSheet.create({
  usernameSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth:1,
    borderRadius:3,
    marginTop:25,
    height:40,
    marginLeft:15,
    marginRight:15
},
userIcon: {
    padding: 7,
    marginRight:5,
    backgroundColor:'#faf7f7'
},
input: {
    flex: 1,
    paddingTop: 7,
    paddingRight: 7,
    paddingBottom: 7,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
    borderRadius:3
},
button: {
  alignItems: 'center',
  backgroundColor:'#6b76ff',
  width:win.width-40, 
  paddingTop:8,
  color:'#fff',
  height:40,
  borderRadius:5
},
google:{
    borderColor:'#DB4437',
    borderRadius:5,
    borderWidth:1,
    height:30,
    flexDirection:'row',
    textAlignVertical:'center',
    alignItems: 'center'
},
facebook:{
    borderColor:'#4267B2',
    borderRadius:5,
    borderWidth:1,
    height:30,
    flexDirection:'row',
    textAlignVertical:'center',
    alignItems: 'center'
}
})