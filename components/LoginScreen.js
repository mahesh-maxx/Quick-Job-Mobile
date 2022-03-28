import { Component } from 'react';
import { StyleSheet, Text, View,Button, TouchableOpacity, Image, TextInput,Alert,Dimensions } from 'react-native';
import CheckBox from 'expo-checkbox';
import { EvilIcons,Entypo } from '@expo/vector-icons';
const win = Dimensions.get('window');

export default class LoginScreen extends Component {
    constructor(props){
      super(props);
      this.state = {
        email:"",
        password:"",
        showPass:false,
        baseUrl:global.baseUrl
      }
    }

    render(){
        return (
          <View style={{ flex: 1, marginTop:30,backgroundColor:'white'}}>
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
              <TextInput placeholder="Username / Email Address" background="transparent" style={styles.input}
              value={this.state.email}
              onChangeText={(email) => this.setState({ email })} />
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
         style={styles.button}
         onPress={() => this.props.navigation.navigate('Dashboard')}
       >
         <Text style={{color:'#fff'}}> Login </Text>
 </TouchableOpacity>
 </View>
          </View>
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