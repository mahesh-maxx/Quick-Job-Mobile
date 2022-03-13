import { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Dimensions, Image, Button, TextInput,Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
const win = Dimensions.get('window');

export default class ForgetpasswordScreen extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      email:"",
      baseUrl: global.baseUrl
    }
  }

  render() {
    return (
      <View style={{ backgroundColor:'white',flex:1 }}>
        <View style={{ marginTop: 150 }}>
          <Text style={{ marginLeft: 20, fontSize: 18,textAlign: 'center' }}>Forgot Password?</Text>
        </View>
        <View style={{ marginLeft: 20, marginTop: 20,textAlign: 'center' }}>
          <Text>Please enter your email.We will send instuctions at your email to reset your password. </Text>
        </View>
        <View style={styles.usernameSection}>
            <MaterialIcons name="email" size={26} color="black" style={styles.userIcon} />
              <TextInput placeholder="Email Address" background="transparent" style={styles.input}
              value={this.state.email}
              onChangeText={(email) => this.setState({ email })} />
            </View>
        <TouchableOpacity style={{ marginTop: 20,flexDirection:'row',justifyContent:'center', height:35 }}>
          <Text style={{padding:5,fontSize:15, color: "#fff",backgroundColor:"#6b76ff", height:35, borderRadius:5}} >Request Password</Text> 
        </TouchableOpacity>
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
    }
})