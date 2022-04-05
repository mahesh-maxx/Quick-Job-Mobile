import { View,Text,ScrollView,Image,StyleSheet,TouchableOpacity,TextInput,Dimensions } from "react-native";
import { RadioButton } from 'react-native-paper';
import * as React from 'react';
import DatePicker from 'react-native-datepicker';
const { width } = Dimensions.get('window');
import ReactChipsInput from 'react-native-chips';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default class ProfileScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name:"John Doe",
            email:"Johndoe@gmail.com",
            gender:"Male",
            dob:"01-01-2000",
            phone:"9876543210",
            address:"SLV Apartments, 302, Bangalore",
            country:"India",
            pinCode:"560068",
            skills:["Photoshop", "After Effect","Premier Pro"],
            college:"St. Mount College",
            highschool:"New High School",
            secondary:"New Secondary School",
            infoEdit:false,
            eduEdit:false,
            skillEdit:false,
            locationEdit:false

        }
    }
    render(){
    return (
        <KeyboardAwareScrollView>
        <View style={styles.container}>
          <View style={[styles.card, styles.profileCard]}> 
            <Image style={styles.avatar} source={require('../assets/profilepic.png')} />
            <Text  style={styles.name}>{this.state.name}</Text>
            <Text  style={styles.email}>{this.state.email}</Text>
            <TouchableOpacity style={{backgroundColor:'#fff',height:40,marginTop:5,padding:10,borderRadius:10,justifyContent:'center',borderColor:'#4267B2',borderWidth:1}}>
                <Text style={{color:'#4267B2',textAlign:'center',}}> MY RESUME</Text>
            </TouchableOpacity>
          </View> 
            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:5,padding:10}}>
                <Text style={{color:'#000',fontSize:16}}>BASIC INFORMATION</Text>
                <Text style={{color:'#4267B2',fontSize:12}} onPress={() => this.setState({ infoEdit:!this.state.infoEdit })}>{this.state.infoEdit ? 'Save' : 'Edit'}</Text>
            </View>
            <View style={styles.information}>
            <View style={styles.rowContainer}>
    <Text style={styles.text}>Full Name</Text>
    <TextInput
      autoCorrect={false}
      value={this.state.name}
      style={styles.textInput}
      editable={this.state.infoEdit}
      onChangeText={(name) => this.setState({ name })}
    />
  </View>
  <View style={{flexDirection:'row',marginTop:5}}>
      <Text style={[styles.text]}>Gender</Text>
      <RadioButton
        value="Male"
        status={ this.state.gender === 'Male' ? 'checked' : 'unchecked' }
        onPress={() => this.setState({gender:'Male'})}
        disabled={!this.state.infoEdit}
      />
      <Text style={styles.text}>Male</Text>
      <RadioButton
        value="Female"
        status={ this.state.gender === 'Female' ? 'checked' : 'unchecked' }
        onPress={() => this.setState({gender:'Female'})}
        disabled={!this.state.infoEdit}
      />
       <Text style={styles.text}>Female</Text>
    </View>
    <View style={styles.datecontainer}>
        <Text style={styles.datetext}>Date of Birth</Text>
        <DatePicker
          style={styles.datePickerStyle}
          date={this.state.dob}
          disabled={!this.state.infoEdit}
          mode="date"
          placeholder="select date"
          format="DD/MM/YYYY"
          minDate="01-01-1900"
          maxDate="01-01-2000"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              right: -5,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              borderColor : "gray",
              alignItems: "flex-start",
              borderWidth: 0,
              borderBottomWidth: 1,
            },
            placeholderText: {
              fontSize: 17,
              color: "gray"
            },
            dateText: {
              fontSize: 17,
            }
          }}
          onDateChange={(date) => {
            this.setState({dob:date});
          }}
        />
      </View>
      <View style={styles.rowContainer}>
    <Text style={styles.text}>Phone Number</Text>
    <TextInput
      autoCorrect={false}
      value={this.state.phone}
      style={styles.textInput}
      editable={this.state.infoEdit}
      onChangeText={(phone) => this.setState({ phone })}
    />
  </View>
  <View style={[styles.rowContainer,{marginTop:5,marginBottom:10}]}>
    <Text style={styles.text}>Email Address</Text>
    <TextInput
      autoCorrect={false}
      value={this.state.email}
      style={styles.textInput}
      editable={this.state.infoEdit}
      onChangeText={(email) => this.setState({ email })}
    />
  </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:0,padding:10}}>
                <Text style={{color:'#000',fontSize:16}}>LOCATION</Text>
                <Text style={{color:'#4267B2',fontSize:12}} onPress={() => this.setState({ locationEdit:!this.state.locationEdit })}>{this.state.locationEdit ? 'Save': 'Edit'}</Text>
            </View>
            <View style={styles.information}>
            <View style={styles.rowContainer}>
    <Text style={styles.text}>Home Address</Text>
    <TextInput
      autoCorrect={false}
      value={this.state.address}
      style={styles.textInput}
      editable={this.state.locationEdit}
      onChangeText={(address) => this.setState({ address })}
    />
  </View>
  <View style={{flexDirection:'row',marginBottom:10}}>
  <View style={{flexDirection: "column",
        justifyContent: "flex-start",
        width:( width / 2) - 20}}>
    <Text style={styles.text}>Country</Text>
    <TextInput
      autoCorrect={false}
      value={this.state.country}
      style={styles.textInput}
      editable={this.state.locationEdit}
      onChangeText={(country) => this.setState({ country })}
    />
  </View>
  <View style={{flexDirection: "column",
        justifyContent: "flex-start",
        width:( width / 2) - 20}}>
    <Text style={styles.text}>Pin Code</Text>
    <TextInput
      autoCorrect={false}
      value={this.state.pinCode}
      style={styles.textInput}
      editable={this.state.locationEdit}
      onChangeText={(pinCode) => this.setState({ pinCode })}
    />
  </View>
  </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:0,padding:10}}>
                <Text style={{color:'#000',fontSize:16}}>EDUCATION</Text>
                <Text style={{color:'#4267B2',fontSize:12}} onPress={() => this.setState({ eduEdit:!this.state.eduEdit })}>{this.state.eduEdit ? 'Save': 'Edit'}</Text>
            </View>
            <View style={styles.information}>
            <View style={styles.rowContainer}>
    <Text style={styles.text}>College</Text>
    <TextInput
      autoCorrect={false}
      value={this.state.college}
      style={styles.textInput}
      editable={this.state.eduEdit}
      onChangeText={(college) => this.setState({ college })}
    />
  </View>
  <View style={styles.rowContainer}>
    <Text style={styles.text}>High School Degree</Text>
    <TextInput
      autoCorrect={false}
      value={this.state.highschool}
      style={styles.textInput}
      editable={this.state.eduEdit}
      onChangeText={(highschool) => this.setState({ highschool })}
    />
  </View>
  <View style={[styles.rowContainer,{marginBottom:10}]}>
    <Text style={styles.text}>Higher Secondary Education</Text>
    <TextInput
      autoCorrect={false}
      value={this.state.secondary}
      style={styles.textInput}
      editable={this.state.eduEdit}
      onChangeText={(secondary) => this.setState({ secondary })}
    />
  </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:0,padding:10}}>
                <Text style={{color:'#000',fontSize:16}}>SKILLS</Text>
                <Text style={{color:'#4267B2',fontSize:12}} onPress={() => this.setState({ skillEdit:!this.state.skillEdit })} >{this.state.skillEdit ? 'Save' : 'Edit'}</Text>
            </View>
            <View style={styles.information}>
            < ReactChipsInput 
    label="Enter Skills" initialChips={this.state.skills} 
    onChangeChips={(chips) => this.setState({skills:chips})} 
    alertRequired={true} 
    chipStyle={{ borderColor: 'blue', backgroundColor: 'grey' }} 
    inputStyle={{fontSize: 16}} 
    labelStyle={{ color: 'blue'}} 
    labelOnBlur={{ color: '#666' }}
    editEnable={this.state.skillEdit} />

            </View>
        </View>
      </KeyboardAwareScrollView>
    )
        }
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor : "#DCDCDC"
    },
    cardTittle:{
      color:"#808080",
      fontSize:22,
      marginBottom:5,
    },
    avatar:{
      width:130,
      height:130,
    },
    card:{
      backgroundColor: "#FFFFFF",
      borderRadius:10,
      padding:10,
      height:80,
      marginTop:10,
    },
    profileCard:{
      height:280,
      alignItems: 'center',
      marginTop:5,
    },
    name:{
      marginTop:10,
      fontSize:20,
      color:"#808080",
    },
    email:{
        marginTop:2,
        fontSize:16,
        color:"#808080",
      },
    photosContainer:{
      flexDirection: 'row',
      flexWrap: 'wrap',
      height: 'auto',
    },
    photosCard:{
      marginTop:10,
    },
    photo:{
      width:113,
      height:113,
      marginTop:5,
      marginRight:5,
    },
    rowContainer: { 
        flexDirection: "column",
        justifyContent: "flex-start",
        width: width - 40,
      },
      text: {
          padding:5
      },
      textInput: {
        color:'#000',
        backgroundColor: '#fff',
        borderBottomWidth:1,
        borderBottomColor:'#000',
        paddingLeft:5,
        paddingRight:5,
        marginLeft:5,
        marginRight:5
      },
      information:{
          flexDirection:'column',
          backgroundColor:'#fff',
          borderRadius:10,
          margin:10,
          marginTop:2
      },
      datecontainer: {
        paddingLeft:10
      },
      datetitle: {
        textAlign: 'left',
        fontSize: 20,
        fontWeight: 'bold',
      },
      datePickerStyle: {
        width: width - 50,
      },
      datetext: {
        textAlign: 'left',
        width: 230,
        fontSize: 16,
        color : "#000"
      }
  });