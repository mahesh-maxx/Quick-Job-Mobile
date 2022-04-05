import { Component } from "react";
import { View,Text,StyleSheet,ScrollView,Image } from "react-native";

export default class ChatScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            messagesList:[
                {
                    senderPic:require('../assets/person1.png'),
                    senderName: 'Monica D Santa',
                    message:'Hi, How are you doing ?',
                    time:'05:23 PM'
                },
                {
                    senderPic:require('../assets/person2.png'),
                    senderName: 'Trecy Santa',
                    message:'Hey there is job opening',
                    time:'03 Apr 09:15 AM'
                },
                {
                    senderPic:require('../assets/person3.png'),
                    senderName: 'Trever Phillips',
                    message:'New JOb recommondes',
                    time:'02 Apr 12:49 PM'
                },
                {
                    senderPic:require('../assets/person4.png'),
                    senderName: 'Franklin ',
                    message:'Your application viewed',
                    time:'01 Apr 11:28 AM'
                },
                {
                    senderPic:require('../assets/person5.png'),
                    senderName: 'Lamar Devis',
                    message:'Hi, How are you doing ?',
                    time:'31 Mar 09:36 PM'
                }

            ]
        }
    }
    render(){
    return (
        <ScrollView>
            <View style={styles.container}>
                {this.state.messagesList.map((message,i)=>
                    <View key={i}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:10,marginRight:5,marginTop:5,marginBottom:10,borderBottomColor:'#000',borderBottomWidth:1}}>
                            <View>
                                <Image source={message.senderPic} resizeMode='contain'
                                    style={{width:60, height: 60,paddingLeft:5
                                }} />
                            </View>
                            <View style={{flexDirection:'column'}}>
                                    <Text style={{fontSize:16,fontWeight:'bold'}}>{message.senderName}</Text>
                                    <Text style={{fontSize:14,fontWeight:'900'}}>{message.message}</Text>
                            </View>
                            <View>
                                <Text style={{fontSize:12}}>{message.time}</Text>
                            </View>
                        </View> 
                    </View>
                )}
            </View>
        </ScrollView>
    )}
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor : "#DCDCDC",
        marginTop:10
      },
})