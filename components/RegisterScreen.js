import { Component } from 'react';
import { StyleSheet, Text, View,Button, TouchableOpacity, Image, TextInput,Alert,Dimensions,ScrollView } from 'react-native';
import CheckBox from 'expo-checkbox';
import { EvilIcons, Entypo, MaterialIcons, AntDesign } from '@expo/vector-icons';
const win = Dimensions.get('window');

export default class RegisterScreen extends Component {
    constructor(props){
      super(props);
      this.state = {
        email:"",
        username:"",
        name:"",
        password:"",
        userType:1,
        baseUrl:global.baseUrl,
        agree_for_term:false
      }
    }

    render(){
        return (
            <ScrollView >
          <View style={{ flex: 1,backgroundColor:'white'}}>
            <View style={{alignItems: 'center',marginTop: 60}}>
              <Text style={{textAlign: 'center',width:300, fontSize:20,marginTop:30}}>Let's create your account!</Text>
              <Text style={{textAlign: 'center', fontSize:14,marginTop:10,marginBottom:30}}>Already have an account ?
              <Text style={{color:'#6b76ff',fontWeight:'900',paddingLeft:10}} onPress={()=>{this.props.navigation.navigate('Login')}}> Log In!</Text>
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
            <View style={{alignItems:'center',marginTop:20,flexDirection:'row',justifyContent:'space-around'}}>
            <TouchableOpacity
            style={[styles.userType,this.state.userType == 1?styles.selectedUser: styles.unSelectedUser]}
            onPress={() => this.setState({ userType:1})}
            >
                <AntDesign name="user" size={24} color={this.state.userType == 1?'white': 'black'} style={{paddingBottom:7,paddingLeft:5,marginRight:5}} />
         <Text style={{color:this.state.userType == 1?'white': 'black',paddingBottom:7}}> Job Seeker </Text>
 </TouchableOpacity>
 <TouchableOpacity
         style={[styles.userType,this.state.userType == 2?styles.selectedUser: styles.unSelectedUser]}
         onPress={() => this.setState({ userType:2})}
       >
           <MaterialIcons name="business-center" size={24} color={this.state.userType == 2?'white': 'black'}  style={{paddingBottom:7,paddingLeft:5,marginRight:5}} />
         <Text style={{color:this.state.userType == 2?'white': 'black',paddingBottom:7}}> Employer </Text>
 </TouchableOpacity>
 </View>
            <View style={styles.usernameSection}>
            <EvilIcons name="user" size={28} color="black" style={styles.userIcon} />
              <TextInput placeholder="Full Name" background="transparent" style={styles.input}
              value={this.state.name}
              onChangeText={(name) => this.setState({ name })} />
            </View>
            <View style={styles.usernameSection}>
            <EvilIcons name="user" size={28} color="black" style={styles.userIcon} />
              <TextInput placeholder="Username" background="transparent" style={styles.input}
              value={this.state.username}
              onChangeText={(username) => this.setState({ username })} />
            </View>
            <View style={styles.usernameSection}>
            <MaterialIcons name="email" size={26} color="black" style={styles.userIcon} />
              <TextInput placeholder="Email Address" background="transparent" style={styles.input}
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
            <View style={{marginLeft:20,marginRight:20, marginTop:20, display:'flex', flexDirection:'row'}}>
      <CheckBox
          value={this.state.agree_for_term}
          onValueChange={() => this.setState({ showPass:!this.state.agree_for_term })}
        />
        <Text style={{marginLeft:10}}>By clicking on “Register” button you are agree to our Terms & Condition</Text>
      </View>
            <View style={{flex:1,alignItems:'center',marginTop:20,marginBottom:40}}>
            <TouchableOpacity
         style={styles.button}
       >
         <Text style={{color:'#fff'}}> Register </Text>
 </TouchableOpacity>
 </View>
          </View>
          </ScrollView>
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
userType:{
  alignItems: 'center',
  textAlignVertical:'center',
  width:(win.width / 2) - 20, 
  paddingTop:8,
  color:'#fff',
  height:40,
  borderRadius:5,
  flexDirection:'row'
},
selectedUser:{
    backgroundColor:'#47bb67',
},
unSelectedUser:{
    backgroundColor:'#f2f2f2',
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