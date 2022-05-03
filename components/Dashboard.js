import { Component,useEffect} from 'react';
import { View, TouchableOpacity, Image,Text,PermissionsAndroid,ScrollView,StyleSheet,Dimensions,Alert } from 'react-native';
import * as Location from 'expo-location';
import { Ionicons,Octicons } from '@expo/vector-icons';
import JobCategoryScreen from './JobCategory';
const { width } = Dimensions.get('window');
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
const user = {}

export default class DashboardScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      location:null,
      baseUrl:global.baseUrl,
      errorMsg:null,
      allJobs:[],
      jobCategories:[],
      companies:[
        {
          name:"Apple Inc.",
          logo:"logo-apple",
          color:"black",
          count:30
        },
        {
          name:"Facebook",
          logo:"logo-facebook",
          color:"#4267B2",
          count:102
        },
        {
          name:"Instagram",
          logo:"logo-instagram",
          color:"black",
          count:16
        },
        {
          name:"Google Inc.",
          logo:"logo-google",
          color:"black",
          count:40
        },
        {
          name:"Amazon Inc.",
          logo:"logo-amazon",
          color:"black",
          count:100
        }
      ]
    }
    
  }

  getAllJobs = () => {
    var url = this.state.baseUrl + '/allJobs';
    apifetch(url, {
      method: 'POST',
      body: {}
    },this.props).then(function (response) {
      return response.json();
    }).then((result)=>{
      if(result.result.length > 0){
        this.setState({allJobs:result.result})
      } 
    }).catch((err)=>{
      console.log("err ",err)
    })
  }

  getJobCategory = () => {
    var url = this.state.baseUrl + '/allJobcategory';
    apifetch(url, {
      method: 'POST',
      body: {}
    },this.props).then(function (response) {
      return response.json();
    }).then((result)=>{
      if(result.result.length > 0){
        this.setState({jobCategories:result.result})
      } 
    }).catch((err)=>{
      console.log("err ",err)
    })
  }

  applyJob= (id,type)=>{
    const endpoint = type === 'apply' ? '/applyJob' : '/addfavouritejob'
    var url = this.state.baseUrl + endpoint;
    var httpHeaders = { 'Authorization' : `bearer ${user.token}`};
    var myHeaders = new Headers(httpHeaders);
    let data = new FormData()
    data.append('userid',user.userid);
    data.append('user_type','user');
    data.append('jobid',id);
    apifetch(url, {
      method: 'POST',
      body: data,
      headers:myHeaders
    },this.props).then(function (response) {
      return response.json();
    }).then((result)=>{
      console.log("rs ",result)
      if(result.message== 'Job Applied Successfully.'){
        Alert.alert(
          'Job Apply',
          result.message,
         [
           
            {text: 'OK', onPress: () => console.log('Cancel Pressed'), 
      
       },
           
         ],
         {cancelable: false})
      } else if(result.message== 'Job Added in Favourites.'){
        Alert.alert(
          'Save Job ',
          result.message,
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
  
  componentDidMount() {
    this.getAllJobs();
    this.getJobCategory();
    this.getCurrentLocation();
    setTimeout(() => {this.scrollView.scrollTo({x: -30}) }, 1)
    AsyncStorageLib.getItem('userToken').then((token)=>{
      user['token']=token
    })
    AsyncStorageLib.getItem('currentUserId').then((userid)=>{
      user['userid']=userid
    })

  }

  getCurrentLocation = async () =>{
    let { status } = await Location.requestForegroundPermissionsAsync();
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
    this.setState({ location })
  }

  render() {
    return (
      <ScrollView>
        <View style={{ flex: 1 }}>
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity style={{ flexDirection: 'row' }}>
              <Ionicons name="location" size={24} color="#000" />
              <Text style={{ color: '#000' }}>{this.state.location ? this.state.location[0].city : 'New Delhi'}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row',justifyContent:'space-between' }}>
          <Text style={{fontWeight:'bold',fontSize: 20,paddingLeft:5}}> All Category</Text>
          {/* <Text style={{paddingRight:10,paddingTop:10}} onPress={() => this.props.navigation.navigate('JobCategory')}>{ 'See All >' }</Text> */}
          </View>
          <ScrollView 
        ref={(scrollView) => { this.scrollView = scrollView; }}
        style={styles.container}
        horizontal= {true}
        decelerationRate={0}
        snapToInterval={width - 60}
        snapToAlignment={"center"}
        showsHorizontalScrollIndicator={false}
        contentInset={{
          top: 0,
          left: 30,
          bottom: 0,
          right: 30,
        }}>
                  {this.state.jobCategories.map((category, i) =>
      <TouchableOpacity key={i}  
      style={[styles.viewLatest]}>
        <View style={{backgroundColor:'#bddfff',
        borderRadius:50,width:40,height:40,
        alignItems:'center',
        justifyContent:'center',
        marginTop:5,
        marginBottom:2,
        alignSelf:'center'}}>
            <Image source={{uri:category.icon}} resizeMode='contain'
                        style={{width:50, height: 50,paddingLeft:5
                        }} />
        </View>
        <View style={{alignItems:'center',
        justifyContent:'center',}} >
            <Text style={{textAlign:'center'}}>{category.name}</Text>
        </View>
      </TouchableOpacity>)}
      </ScrollView>

      <View style={{ flexDirection: 'row',marginTop: 10 ,justifyContent:'space-between' }}>
        <View style={{ flexDirection: 'row'}} >
          {/* <Octicons name="dash" size={45} color="#4267B2" style={{borderRadius:50,marginLeft:-5}} /> */}
          <Text style={{fontWeight:'bold',fontSize: 20,paddingLeft:5}}> Jobs</Text>
          </View>
          <View>
          <Text style={{paddingRight:10,paddingTop:10}} onPress={() => this.props.navigation.navigate('Saved')}>{ 'See All >' }</Text>
          </View>
          </View>
          <ScrollView style={{flex:1,
    backgroundColor : "#DCDCDC",
    marginTop:10}}>
           
                                {this.state.allJobs.map((alljob,i)=>
                                        <View style={styles.jobCard} key={i}>
                                        <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:10,marginRight:10,marginTop:5}}>
                                            <View>
                                            <Image source={{uri:alljob.company_logo}} resizeMode='contain'
                        style={{width:50, height: 50,paddingLeft:5
                        }} />
                                            </View>
                                            <View style={{flexDirection:'column'}}>
                                                <Text style={{fontSize:20,fontWeight:'bold'}}>{alljob.title}</Text>
                                                <Text style={{fontSize:18,fontWeight:'900'}}>{alljob.company_name}</Text>
                                            </View>
                                            <View>
                                                <Ionicons
                                  name='bookmark-outline'
                                  size={26}
                                  color="#4267B2"
                                  onPress={()=>this.applyJob(alljob.id,'save')}
                                />
                                            </View>
                                        </View>
                                        <View style={{flexDirection:'row',marginTop:5,marginLeft:10}}>
                                            <Text>{alljob.description}</Text>
                                        </View>
                                        <View style={{flexDirection:'row',marginTop:5,marginLeft:10,justifyContent:'space-between',marginRight:10,marginBottom:10}}>
                                            <Text  style={{fontSize:16,fontWeight:'bold'}}>{parseFloat(alljob.salary_from).toFixed(2)} - {parseFloat(alljob.salary_to).toFixed(2)} INR</Text>
                                            <TouchableOpacity style={styles.applybutton} onPress={()=>this.applyJob(alljob.id,'apply')}>
                                                <Text style={{color:'#fff',textAlignVertical:'center'}}>Apply</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                    )}
          </ScrollView>
          <View style={{ flexDirection: 'row',justifyContent:'space-between' }}>
          {/* <Octicons name="dash" size={45} color="#4267B2" style={{borderRadius:50,marginLeft:-5}} /> */}
          <Text style={{fontWeight:'bold',fontSize: 20,paddingLeft:5}}> Companies</Text>
          <Text style={{paddingRight:10,paddingTop:10}} >{ 'See All >' }</Text>
          </View>
          <ScrollView 
        ref={(scrollView) => { this.scrollView = scrollView; }}
        style={styles.container}
        //pagingEnabled={true}
        horizontal= {true}
        decelerationRate={0}
        snapToInterval={width - 60}
        snapToAlignment={"center"}
        showsHorizontalScrollIndicator={false}
        contentInset={{
          top: 0,
          left: 30,
          bottom: 0,
          right: 30,
        }}>
          {/* {this.state.latestJobs.map((job, i) =>
      <View key={i} style={styles.viewLatest}>
        <View style={{backgroundColor:'#fff',
        borderRadius:50,width:40,height:40,
        alignItems:'center',
        justifyContent:'center',
        marginTop:5,
        marginBottom:2,
        alignSelf:'center'}}>
            <Text style={{color:'#4267B2'}}>{job.count}</Text>
        </View>
        <View style={{alignItems:'center',
        justifyContent:'center',}} >
            <Text style={{textAlign:'center'}}>{job.name}</Text>
        </View>
      </View>)} */}
                  {this.state.companies.map((company, i) =>
      <TouchableOpacity key={i}  
      style={[styles.viewCompany]}>
        <View style={{backgroundColor:'#bddfff',
        borderRadius:50,width:40,height:40,
        alignItems:'center',
        justifyContent:'center',
        marginTop:5,
        marginBottom:2,
        alignSelf:'center'}}>
            <Ionicons name={company.logo} size={24} color="#4267B2" />
        </View>
        <View style={{alignItems:'center',
        justifyContent:'center',}} >
            <Text style={{textAlign:'center',fontSize:18,fontWeight:'700'}}>{company.name}</Text>
            <Text style={{textAlign:'center',fontSize:14}}>{company.count + ' Jobs'}</Text>
        </View>
      </TouchableOpacity>)}
      </ScrollView>
        </View>
      </ScrollView>
    );
  }
}



const styles = StyleSheet.create({
  container: {
  },
  viewLatest: {
    marginTop: 10,
    backgroundColor:'#fff',
    width: width - 260,
    margin: 10,
    height: width - 260,
    borderRadius: 10,
    flexDirection:'column'
  },
  viewCompany: {
    marginTop: 10,
    backgroundColor:'#fff',
    width: width - 240,
    margin: 10,
    height: width - 240,
    borderRadius: 10,
    flexDirection:'column'
  },
  viewJobs: {
    marginTop: 10,
    backgroundColor: '#fff',
    width: width - 200,
    margin: 10,
    height: width - 200,
    borderRadius: 10
  },
  applybutton0: {
    alignItems: 'center',
    backgroundColor: '#4267B2',
    width: 60,
    height: 20,
    borderRadius: 20,
    marginRight:5
},
jobCard:{
  backgroundColor:'#fff',
  borderRadius:10,
  margin:10,
  marginTop:2,
},
applybutton: {
  alignItems: 'center',
  backgroundColor: '#4267B2',
  width: 70,
  height: 30,
  borderRadius: 10,
  marginRight:5
}
});
