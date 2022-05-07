import { Component } from 'react';
import { View ,Text,SectionList,StyleSheet,Dimensions} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Spinner from 'react-native-loading-spinner-overlay';
const { width } = Dimensions.get('window');
export default class NotificationScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            notificationList : [],
            baseUrl:global.baseUrl,
            loading:false
        }
    }

    componentDidMount(){
      this.getNotification()
    }

    formatNotification=(result)=>{
      const notification = [];
      result.forEach((re)=>{
        var index = notification.findIndex( ({ title }) => title === re.job_date.substr(0,10))
        if(index != -1){
            const obj = {}
            obj['header']=re.title
            obj['description']=re.description
            obj['time']=re['job_date'].substr(11,5)
            notification[index].data.push(obj)
        } else{
            const main = {}
            main['title']=re['job_date'].substr(0,10)
            main['data'] = []
            const obj = {}
            obj['header']=re.title
            obj['description']=re.description
            obj['time']=re['job_date'].substr(11,5)
            main['data'].push(obj)
            notification.push(main)  
        }
      })
      this.setState({notificationList:notification,loading:false})
    }

    getNotification=()=>{
      this.setState({
        loading: true
      })
      var url = this.state.baseUrl + '/job_notification';
      apifetch(url, {
        method: 'POST',
        body: {}
      }).then(function (response) {
        return response.json();
      }).then((result)=>{
        this.setState({
          loading: false
        })
        if(result.result.length > 0){
          this.formatNotification(result.result)
        } 
      }).catch((err)=>{
        this.setState({
          loading: false
        })
        console.log("err ",err)
      })
    }
    
    render()
    {
       return (
        <View style={styles.container}>
          {this.state.loading && <Spinner visible={true} style={styles.loading} />}
        <SectionList
          sections={this.state.notificationList}
          renderItem={({item}) => <View style={styles.notificationBox}>
          <Ionicons name="notifications" size={30} color="#6b76ff" style={{marginRight:10}} />
          <View  style={{flexDirection:'row',justifyContent:'space-between',width:width-100}} >
            <View style={{flexDirection:'column'}}>
                <Text style={{fontSize:16}}>{item.header.length > 15 ? item.header.substring(0,15)+'...':item.header}</Text>
                <Text style={styles.description}>{item.description.length > 25 ? item.description.substring(0,25)+'...':item.description}</Text>  
            </View > 
            <View style={{}}><Text style={{fontSize:12}}>{item.time}</Text></View>
          </View>
        </View>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        />
      </View>
       )
    }
}

const styles = StyleSheet.create({
    container:{
      width:width
    },
    notificationList:{
      marginTop:20,
      padding:10,
    },
    notificationBox: {
      backgroundColor: '#FFFFFF',
      flexDirection: 'row',
      marginLeft:10,
      marginRight:10,
      padding:5,
      borderBottomColor:'#000',
      borderBottomWidth:1,
      width:width
    },
    icon:{
      width:45,
      height:45,
    },
    description:{
      fontSize:14,
      color: "#3498db",
      marginLeft:10,
      flexWrap: 'wrap'
    },
    sectionHeader: {
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 18,
        fontWeight: 'bold',
        height:40,
        backgroundColor: 'rgba(247,247,247,1.0)',
      },
      item: {
        padding: 10,
        fontSize: 18,
        height: 44,
      },
  });