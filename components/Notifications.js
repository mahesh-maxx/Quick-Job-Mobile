import { Component,useEffect} from 'react';
import { View ,Text,SectionList,StyleSheet,Image} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { borderBottomColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
export default class NotificationScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            notificationList : [
                {title: 'Today', data: [{header:"Grow Next Level Business", description: "Lorem ipsum dolor sit amet, indu consectetur adipiscing elit",time:"just now"}, 
                {header:"Power System Experience", description: "Lorem ipsum dolor sit amet, indu consectetur adipiscing elit",time:"01:20 PM"}, 
                {header:"Trainee Web Designer", description: "Lorem ipsum dolor sit amet, indu consectetur adipiscing elit",time:"09:15 AM"}
                ]},
                {title: 'Yesterday', data: [{header:"We Provide Experience", description: "Lorem ipsum dolor sit amet, indu consectetur adipiscing elit",time:"Yesterday 04:14 PM"}, 
                ]},
                {title: 'Older', data: [{header:"New Opening Available", description: "Lorem ipsum dolor sit amet, indu consectetur adipiscing elit",time:"02 Apr 09:15 AM"},
                {header:"Check new Jobs", description: "Lorem ipsum dolor sit amet, indu consectetur adipiscing elit",time:"01 Apr 12:15 PM"},
                {header:"Recuiter Looking for you", description: "Lorem ipsum dolor sit amet, indu consectetur adipiscing elit",time:"31 Mar 06:15 PM"},
                ]}, 
              ]
        }
    }
    
    render()
    {
       return (
        <View style={styles.container}>
        <SectionList
          sections={this.state.notificationList}
          renderItem={({item}) => <View style={styles.notificationBox}>
          <Ionicons name="notifications" size={30} color="#6b76ff" />
          <View>
            <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                <Text style={{fontSize:16}}>{item.header.length > 15 ? item.header.substring(0,15)+'...':item.header}</Text>
                <Text style={{fontSize:12}}>{item.time}</Text>
            </View> 
          <Text style={styles.description}>{item.description}</Text>
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
      borderBottomWidth:1
    },
    icon:{
      width:45,
      height:45,
    },
    description:{
      fontSize:14,
      color: "#3498db",
      marginLeft:10,
    flex: 1, flexWrap: 'wrap'
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