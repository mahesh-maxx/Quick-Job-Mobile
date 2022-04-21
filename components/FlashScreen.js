import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';


export default class FlashScreen extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    setTimeout(()=>{
      this.reDirect()
    },1000)
  }

  async reDirect(){
    const appIntro =  await AsyncStorageLib.getItem('Appintro');
    console.log("App intro ",appIntro)
    appIntro == 'true' ? this.props.navigation.navigate('Login') : this.props.navigation.navigate('AppIntro')
  }
  render() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:'white' }}>
      <TouchableOpacity onPress={() => this.reDirect()}>
        <Image source={require('../assets/flash.jpeg')}
        style={{width:300, height: 300
        }} />
      </TouchableOpacity>
    </View>
  );
      }
}
