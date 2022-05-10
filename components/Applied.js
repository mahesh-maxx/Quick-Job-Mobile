import { Component } from "react";
import { View,Text,StyleSheet,ScrollView, TouchableOpacity,Image,Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

const user = {}
AsyncStorageLib.getItem('userToken').then((token)=>{
  user['token']=token
})

AsyncStorageLib.getItem('currentUserId').then((userid)=>{
    user['userid']=userid
})

export default class AppliedJobScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            appliedJobList:[],
            loading:false,
            baseUrl:global.baseUrl
        }
    }

    componentDidMount(){
        this.getAppliedJob()
    }

    getAppliedJob=()=>{
        this.setState({
            loading: true
          })
        var url = this.state.baseUrl + '/appliedJob';
        var httpHeaders = { 'Authorization' : `bearer ${global.UserData?.token}`};
        var myHeaders = new Headers(httpHeaders);
        let data = new FormData()
        data.append('userid',global.UserData?.userid);
        data.append('user_type','user');
        apifetch(url, {
            method: 'POST',
            body: data,
            headers:myHeaders
          }).then(function (response) {
            return response.json();
          }).then((result)=>{
            this.setState({
                loading: false
              })
            if(result.result?.length > 0){
              this.setState({appliedJobList:result.result})
            } 
          }).catch((err)=>{
            this.setState({
                loading: false
              })
            console.log("err ",err)
          })
    }



    render(){
        return (
            <ScrollView>
                <View style={styles.container}>
                {this.state.loading && <Spinner visible={true} style={styles.loading} />}
                    {this.state.appliedJobList.map((appliedJob,i)=>
                                        <View style={styles.jobCard} key={i}>
                                        <View style={{flexDirection:'row',flex:1,marginLeft:10,marginRight:10,marginTop:5}}>
                                            <View style={{ flexGrow: 2}}>
                                            <Image source={{uri:appliedJob.image}} resizeMode='contain'
                        style={{width:35, height: 35,paddingLeft:5
                        }} />
                                            </View>
                                            <View style={{flexDirection:'column',flex:9}}>
                                                <Text style={{fontSize:20,fontWeight:'bold'}}>{appliedJob.title}</Text>
                                                <Text style={{fontSize:18,fontWeight:'900'}}>{appliedJob.company_name}</Text>
                                            </View>
                                        </View>
                                        <View style={{flexDirection:'row',marginTop:5,marginLeft:10}}>
                                            <Text>{appliedJob.description}</Text>
                                        </View>
                                        <View style={{flexDirection:'row',marginTop:5,marginLeft:10,justifyContent:'space-between',marginRight:10,marginBottom:10}}>
                                            <Text  style={{fontSize:16,fontWeight:'bold'}}>{parseFloat(appliedJob.salary_from).toFixed(2)} - {parseFloat(appliedJob.salary_to).toFixed(2)} INR</Text>
                                            <TouchableOpacity style={styles.applybutton} disabled={true}>
                                                <Text style={{color:'#fff',textAlignVertical:'center'}}>Applied</Text>
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
},loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
})