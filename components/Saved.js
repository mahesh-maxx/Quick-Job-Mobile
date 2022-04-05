import { Component } from "react";
import { View,Text,StyleSheet,ScrollView, TouchableOpacity,Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default class SavedJobScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
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
              ]
        }
    }
    render(){
        return (
            <ScrollView>
                <View style={styles.container}>
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
                </View>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
jobCard:{
    backgroundColor:'#fff',
    borderRadius:10,
    margin:10,
    marginTop:2,
},
container:{
    flex:1,
    backgroundColor : "#DCDCDC",
    marginTop:10
  },
  applybutton: {
    alignItems: 'center',
    backgroundColor: '#4267B2',
    width: 70,
    height: 30,
    borderRadius: 10,
    marginRight:5
}
})