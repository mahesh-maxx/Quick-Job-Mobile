import { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

export default class FlashScreen extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    setTimeout(()=>{
      this.props.navigation.navigate('Login')
    },1000)
  }
  render() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:'white' }}>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
        <Image source={require('../assets/flash.jpeg')}
        style={{width:300, height: 300
        }} />
      </TouchableOpacity>
    </View>
  );
      }
}
