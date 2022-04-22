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
      ],
      savedJobList:[
        {
           companyName:"Apple Inc.",
           companyLogo:require('../assets/logo1.png'),
           salary:"$100-$230k/Year",
           designation:"Senior GFX Artist",
           jobDescription:"Full Time"
         },
         {
           companyName:"Facebook",
           companyLogo:require('../assets/logo2.png'),
           salary:"$50-$75k/Year",
           designation:"Junior GFX Designer",
           jobDescription:"Part Time"
         },
         {
           companyName:"Instagram",
           companyLogo:require('../assets/logo3.png'),
           salary:"$15-$17k/Year",
           designation:"Associate GFX Artist",
           jobDescription:"Internship"
         },
         {
           companyName:"Adidas",
           companyLogo:require('../assets/logo4.png'),
           salary:"$120-$140k/Year",
           designation:"UI Developer",
           jobDescription:"Full Time"
         },
         {
           companyName:"Nike",
           companyLogo:require('../assets/logo5.png'),
           salary:"$350-$400k/Year",
           designation:"Senior UI/UX",
           jobDescription:"Full Time"
         }
     ],
      jobCategories:[
        {
            categoryName:"Content Writer",
            categoryLogo:"pencil-sharp",
            isSelected:false
        },
        {
            categoryName:"Art & Design",
            categoryLogo:"color-fill",
            isSelected:false
        },
        {
            categoryName:"Human Resources",
            categoryLogo:"people-sharp",
            isSelected:false
        },
        {
            categoryName:"Programmer",
            categoryLogo:"code",
            isSelected:false
        },
        {
            categoryName:"Finance",
            categoryLogo:"briefcase",
            isSelected:false
        },
        {
            categoryName:"Customer Service",
            categoryLogo:"headset",
            isSelected:false
        },
        {
            categoryName:"Food & Restaurant",
            categoryLogo:"restaurant",
            isSelected:false
        },
        {
            categoryName:"Music Producer",
            categoryLogo:"musical-note",
            isSelected:false
        }
    ],
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
          <View style={{ flexDirection: 'row',justifyContent:'space-between' }}>
          {/* <Octicons name="dash" size={45} color="#4267B2" style={{borderRadius:50,marginLeft:-5}} /> */}
          <Text style={{fontWeight:'bold',fontSize: 20,paddingLeft:5}}> All Category</Text>
          <Text style={{paddingRight:10,paddingTop:10}} onPress={() => this.props.navigation.navigate('JobCategory')}>{ 'See All >' }</Text>
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
            <Ionicons name={category.categoryLogo} size={24} color="#4267B2" />
        </View>
        <View style={{alignItems:'center',
        justifyContent:'center',}} >
            <Text style={{textAlign:'center'}}>{category.categoryName}</Text>
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
            {/* {this.state.jobsForYou.map((jobs, i)=>
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
            )} */}
                                {this.state.savedJobList.map((savedJob,i)=>
                                        <View style={styles.jobCard} key={i}>
                                        <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:10,marginRight:10,marginTop:5}}>
                                            <View>
                                            <Image source={savedJob.companyLogo} resizeMode='contain'
                        style={{width:35, height: 35,paddingLeft:5
                        }} />
                                            </View>
                                            <View style={{flexDirection:'column'}}>
                                                <Text style={{fontSize:20,fontWeight:'bold'}}>{savedJob.designation}</Text>
                                                <Text style={{fontSize:18,fontWeight:'900'}}>{savedJob.companyName}</Text>
                                            </View>
                                            <View>
                                                <Ionicons
                                  name='bookmark'
                                  size={26}
                                  color="#4267B2"
                                />
                                            </View>
                                        </View>
                                        <View style={{flexDirection:'row',marginTop:5,marginLeft:10}}>
                                            <Text>{savedJob.jobDescription}</Text>
                                        </View>
                                        <View style={{flexDirection:'row',marginTop:5,marginLeft:10,justifyContent:'space-between',marginRight:10,marginBottom:10}}>
                                            <Text  style={{fontSize:16,fontWeight:'bold'}}>{savedJob.salary}</Text>
                                            <TouchableOpacity style={styles.applybutton}>
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
