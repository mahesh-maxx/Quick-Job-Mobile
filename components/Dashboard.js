import { Component,useEffect} from 'react';
import { View, TouchableOpacity, Image,Text,PermissionsAndroid,ScrollView,StyleSheet,Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { Ionicons,Octicons } from '@expo/vector-icons';
import JobCategoryScreen from './JobCategory';
const { width } = Dimensions.get('window');

export default class DashboardScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      location:null,
      errorMsg:null,
      latestJobs :[
        {name:"UI/UX Designer",count:"12"},
        {name:"FrontEnd Developer",count:"09"},
        {name:"BackEnd Developer",count:"30"},
        {name:"Content Writer",count:"02"},
        {name:"Art & Design",count:"15"},
        {name:"HR",count:"10"},
        {name:"Customer Service",count:"13"},
        {name:"Marketing",count:"07"}
      ],
      jobsForYou:[
        { 
          jobType:"GFX Designer",
          jobList:[{
            companyName:"Apple Inc.",
            companyLogo:require('../assets/logo1.png'),
            salary:"$100-$230k/Year",
            designation:"Senior GFX Artist",
            type:"Full Time"
          },
          {
            companyName:"Facebook",
            companyLogo:require('../assets/logo2.png'),
            salary:"$50-$75k/Year",
            designation:"Junior GFX Designer",
            type:"Part Time"
          },
          {
            companyName:"Instagram",
            companyLogo:require('../assets/logo3.png'),
            salary:"$15-$17k/Year",
            designation:"Associate GFX Artist",
            type:"Internship"
          },
          ]
        },
        { 
          jobType:"UI/UX Developer",
          jobList:[{
            companyName:"Adidas",
            companyLogo:require('../assets/logo4.png'),
            salary:"$120-$140k/Year",
            designation:"UI Developer",
            type:"Full Time"
          },
          {
            companyName:"Facebook",
            companyLogo:require('../assets/logo2.png'),
            salary:"$50-$75k/Year",
            designation:"Junior UI Developer",
            type:"Remote"
          },
          {
            companyName:"Nike",
            companyLogo:require('../assets/logo5.png'),
            salary:"$350-$400k/Year",
            designation:"Senior UI/UX",
            type:"Full Time"
          },]
        }
      ]
    }
    
  }

  componentDidMount() {
    this.getCurrentLocation();
    setTimeout(() => {this.scrollView.scrollTo({x: -30}) }, 1)

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
          <View style={{ flexDirection: 'row' }}>
          <Octicons name="dash" size={45} color="#4267B2" style={{borderRadius:50,marginLeft:-5}} />
          <Text style={{fontWeight:'bold',fontSize: 24,paddingLeft:5}}> Latest Jobs</Text>
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
          {this.state.latestJobs.map((job, i) =>
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
      </View>)}
      </ScrollView>

      <View style={{ flexDirection: 'row',marginTop: 10 ,justifyContent:'space-between' }}>
        <View style={{ flexDirection: 'row'}} >
          <Octicons name="dash" size={45} color="#4267B2" style={{borderRadius:50,marginLeft:-5}} />
          <Text style={{fontWeight:'bold',fontSize: 24,paddingLeft:5}}> Jobs for you</Text>
          </View>
          <View>
          <Text style={{paddingRight:10,paddingTop:10}} onPress={() => this.props.navigation.navigate('JobCategory')}> See All</Text>
          </View>
          </View>
          <ScrollView>
            {this.state.jobsForYou.map((jobs, i)=>
  <View key={i}>
    <Text style={{color:'#4267B2',paddingLeft:10,fontSize:16,fontWeight:'bold'}}>{jobs.jobType}</Text>
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
    {jobs.jobList.map((jobLists,i)=>
                
              
              <View key={i} style={styles.viewJobs}>
                <View style={{backgroundColor:'#fff',
                flexDirection:'row',
                marginTop:5,
                marginBottom:2}}>
                            <Image source={jobLists.companyLogo} resizeMode='contain'
        style={{width:30, height: 30,paddingLeft:5
        }} />
                    <Text style={{fontSize:16,paddingLeft:5,fontWeight:'bold'}}>{jobLists.companyName}</Text>
                </View>
                <View  >
                    <Text style={{fontSize:14,paddingLeft:10,fontWeight:'600',marginTop:10}} >{jobLists.salary}</Text>
                </View>
                <View style={{flexDirection:'row',marginTop:10}}>
                <Octicons name="primitive-dot" size={10} color="#4267B2" style={{textAlignVertical:'center',paddingLeft:10}} />
                <Text style={{fontSize:12,paddingLeft:10,color:'#4267B2'}} >{jobLists.designation}</Text>
                </View>
                <View style={{flexDirection:'row',marginTop:2}}>
                <Octicons name="primitive-dot" size={10} color="#4267B2" style={{textAlignVertical:'center',paddingLeft:10}} />
                <Text style={{fontSize:12,paddingLeft:10,color:'#4267B2'}} >{jobLists.type}</Text>
                </View>
                <View style={{ margin: 10,flexDirection:'row' }}>
                        <TouchableOpacity
                            style={styles.applybutton}
                           
                        >
                            <Text style={{color:'#fff',fontSize:12}}> Apply </Text>
                        </TouchableOpacity>
                        <Ionicons
                  name={'bookmark-outline'}
                  size={24}
                  color='#000'
                />
                    </View>
              </View>)}
              </ScrollView>
  </View>
            )}
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
    backgroundColor:'#7597d1',
    width: width - 260,
    margin: 10,
    height: width - 260,
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
  applybutton: {
    alignItems: 'center',
    backgroundColor: '#4267B2',
    width: 60,
    height: 20,
    borderRadius: 20,
    marginRight:5
}
});
