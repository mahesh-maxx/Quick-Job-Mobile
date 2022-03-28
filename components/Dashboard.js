import { Component,useEffect} from 'react';
import { View, TouchableOpacity, Image,Text,PermissionsAndroid,ScrollView } from 'react-native';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

export default class DashboardScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      location:null,
      errorMsg:null
    }
  }

  componentDidMount() {
    this.getCurrentLocation();
  }

  getCurrentLocation = async () =>{
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log("sta ",status)
      if (status !== 'granted') {
        this.setState({
          errorMsg: 'new error'
        });
        return;
      }

      let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest, maximumAge: 10000});
      const { latitude, longitude } = location.coords
    this.getGeocodeAsync({ latitude, longitude })
  }

  getGeocodeAsync = async (locat) => {
    let location = await Location.reverseGeocodeAsync(locat)
    console.log("loca ",location)
    this.setState({ location })
  }

  render() {
    return (
      <ScrollView>
      <View style={{ flex: 1 }}>
       <View style={{marginTop:10}}>
         <TouchableOpacity style={{flexDirection:'row'}}>
         <Ionicons name="location" size={24} color="#000" />
         <Text style={{color:'#000'}}>{this.state.location ? this.state.location[0].city : 'New Delhi'}</Text>
         </TouchableOpacity>
       </View>
      </View>
      </ScrollView>
    );
  }
}
