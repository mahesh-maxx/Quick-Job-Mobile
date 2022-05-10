import { View,Text,Picker,Image,StyleSheet,TouchableOpacity,TextInput,Dimensions } from "react-native";
import { RadioButton } from 'react-native-paper';
import * as React from 'react';
import DatePicker from 'react-native-datepicker';
const { width } = Dimensions.get('window');
import ReactChipsInput from './helper/react-chips';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import SelectInput from 'react-native-select-input-ios'
const user = {}
AsyncStorageLib.getItem('userToken').then((token)=>{
  user['token']=token
})

AsyncStorageLib.getItem('currentUserId').then((userid)=>{
    user['userid']=userid
})

export default class ProfileScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          loading:false,
          baseUrl:global.baseUrl,
          availableSkills:[],
          profileData:{},
          college:"St. Mount College",
          highschool:"New High School",
          secondary:"New Secondary School",
          profileEdit:false,
          eduEdit:false,
          skillEdit:false,
          selectedSkills:[],
          selectedValue:0,
          options : [{ value: 0, label: '0' },{ value: 1, label: '1' },{ value: 2, label: '2' }]
          
        }
    }

    componentDidMount(){
      this.getProfileData()
      this.getSkillData()
    }

    setSkills=()=>{
      var skills = this.state.availableSkills.filter( (o1)=> {
        return this.state.profileData?.skills.some(function (o2) {
           return o1.id === o2.id// return the ones with equal id
       });
    })
      
    }

    getSkillData=()=>{
      this.setState({
        loading: true
      })
    var url = this.state.baseUrl + '/job_skills';
    var httpHeaders = { 'Authorization' : `bearer ${global.UserData?.token}`};
    var myHeaders = new Headers(httpHeaders);
    let data = new FormData()
    data.append('userid',global.UserData?.userid);
    data.append('user_type','user');
    console.log("hec ",data,myHeaders)
    apifetch(url, {
        method: 'POST',
        body: data,
        headers:myHeaders
      }).then(function (response) {
        return response.json();
      }).then((result)=>{
        console.log("asd ",result)
        this.setState({
            loading: false
          })
          if(result.result?.length > 0){
            this.setState({availableSkills:result.result})
          } 
      }).catch((err)=>{
        this.setState({
            loading: false
          })
        console.log("err ",err)
      })
    }

    getProfileData =()=>{
      this.setState({
        loading: true
      })
    var url = this.state.baseUrl + '/profile';
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
          this.setState({profileData:result.result})
      }).catch((err)=>{
        this.setState({
            loading: false
          })
        console.log("err ",err)
      })
    }
    render(){
    return (
        <KeyboardAwareScrollView>
        <View style={styles.container}>
        {this.state.loading && <Spinner visible={true} style={styles.loading} />}
          <View style={[styles.card, styles.profileCard]}> 
            <Image style={styles.avatar} source={{uri:this.state.profileData?.image}} />
            <Text  style={styles.name}>{this.state.profileData?.firstname + ' ' + this.state.profileData?.lastname}</Text>
            <Text  style={styles.email}>{this.state.profileData?.email}</Text>
            {this.state.profileData?.cv ? <View><TouchableOpacity style={{backgroundColor:'#fff',height:40,marginTop:5,padding:10,borderRadius:10,justifyContent:'center',borderColor:'#4267B2',borderWidth:1}}>
                <Text style={{color:'#4267B2',textAlign:'center',}}> MY RESUME</Text>
            </TouchableOpacity>
             <Text  style={styles.cv}>{this.state.profileData?.cv.substr(this.state.profileData?.cv.lastIndexOf('/')+1)}</Text></View>
             :
            <TouchableOpacity style={{backgroundColor:'#fff',height:40,marginTop:5,padding:10,borderRadius:10,justifyContent:'center',borderColor:'#4267B2',borderWidth:1}}>
            <Text style={{color:'#4267B2',textAlign:'center',}}> UpLoad Resume</Text>
        </TouchableOpacity>}
          </View> 
            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:5,padding:10}}>
                <Text style={{color:'#000',fontSize:16}}>BASIC INFORMATION</Text>
                <Text style={{color:'#4267B2',fontSize:12}} onPress={() => this.setState({ profileEdit:!this.state.profileEdit })}>{this.state.profileEdit ? 'Save' : 'Edit'}</Text>
            </View>
            <View style={styles.information}>
            <View style={styles.rowContainer}>
    <Text style={styles.text}>First Name</Text>
    <TextInput
      autoCorrect={false}
      value={this.state.profileData?.firstname}
      style={styles.textInput}
      editable={this.state.profileEdit}
      onChangeText={(firstname) => { 
        var profileData = {...this.state.profileData}
        profileData.firstname = firstname;
        this.setState({profileData})
    }}
    />
    <Text style={styles.text}>Last Name</Text>
    <TextInput
      autoCorrect={false}
      value={this.state.profileData?.lastname}
      style={styles.textInput}
      editable={this.state.profileEdit}
      onChangeText={(lastname) => { 
        var profileData = {...this.state.profileData}
        profileData.lastname = lastname;
        this.setState({profileData})
    }}
    />
  </View>
  <View style={{flexDirection:'row',marginTop:5}}>
      <Text style={[styles.text]}>Gender</Text>
      <RadioButton
        value="Male"
        status={ this.state.profileData?.gender === "Male" ? 'checked' : 'unchecked' }
        onPress={() => { 
          var profileData = {...this.state.profileData}
          profileData.gender = "Male";
          this.setState({profileData})
      }}
        disabled={!this.state.profileEdit}
      />
      <Text style={styles.text}>Male</Text>
      <RadioButton
        value="Female"
        status={ this.state.profileData?.gender === "Female" ? 'checked' : 'unchecked' }
        onPress={() => { 
          var profileData = {...this.state.profileData}
          profileData.gender = "Female";
          this.setState({profileData})
      }}
        disabled={!this.state.profileEdit}
      />
       <Text style={styles.text}>Female</Text>
    </View>
    <View style={styles.datecontainer}>
        <Text style={styles.datetext}>Date of Birth</Text>
        <DatePicker
          style={styles.datePickerStyle}
          date={this.state.profileData?.birth_date}
          disabled={!this.state.profileEdit}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate="1900-01-01"
          maxDate="2000-01-01"
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
            var profileData = {...this.state.profileData}
            profileData.birth_date = date;
            this.setState({profileData})
        }}
        />
      </View>
      <View style={styles.rowContainer}>
    <Text style={styles.text}>Phone Number</Text>
    <TextInput
      autoCorrect={false}
      value={this.state.profileData?.mobile}
      style={styles.textInput}
      keyboardType = 'numeric'
      maxLength={10}
      editable={this.state.profileEdit}
      onChangeText={(phone) => { 
        var profileData = {...this.state.profileData}
        profileData.mobile = phone.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '');
        this.setState({profileData})
    }}
    />
  </View>
  <View style={[styles.rowContainer,{marginTop:5,marginBottom:10}]}>
    <Text style={styles.text}>Email Address</Text>
    <TextInput
      autoCorrect={false}
      value={this.state.profileData?.email}
      style={styles.textInput}
      editable={false}
    />
  </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:0,padding:10}}>
                <Text style={{color:'#000',fontSize:16}}>LOCATION</Text>
                <Text style={{color:'#4267B2',fontSize:12}} onPress={() => this.setState({ profileEdit:!this.state.profileEdit })}>{this.state.profileEdit ? 'Save': 'Edit'}</Text>
            </View>
            <View style={styles.information}>
            <View style={styles.rowContainer}>
    <Text style={styles.text}>Home Address</Text>
    <TextInput
      autoCorrect={false}
      value={this.state.profileData?.address?.address}
      style={styles.textInput}
      editable={this.state.profileEdit}
      onChangeText={(address) => { 
        var profileData = {...this.state.profileData}
        var addressData = {...profileData.address}
        addressData.address = address
        profileData.address = addressData
        this.setState({profileData})
    }}
    />
  </View>
  <View style={{flexDirection:'row',marginBottom:10}}>
  <View style={{flexDirection: "column",
        justifyContent: "flex-start",
        width:( width / 3) - 10}}>
    <Text style={styles.text}>State</Text>
    <TextInput
      autoCorrect={false}
      value={this.state.profileData?.address?.state}
      style={styles.textInput}
      editable={this.state.profileEdit}
      onChangeText={(state) => { 
        var profileData = {...this.state.profileData}
        var addressData = {...profileData.address}
        addressData.state = state
        profileData.address = addressData
        this.setState({profileData})
    }}
    />
  </View>
  <View style={{flexDirection: "column",
        justifyContent: "flex-start",
        width:( width / 3) - 10}}>
    <Text style={styles.text}>Country</Text>
    <TextInput
      autoCorrect={false}
      value={this.state.profileData?.address?.country}
      style={styles.textInput}
      editable={this.state.profileEdit}
      onChangeText={(country) => { 
        var profileData = {...this.state.profileData}
        var addressData = {...profileData.address}
        addressData.country = country
        profileData.address = addressData
        this.setState({profileData})
    }}
    />
  </View>
  <View style={{flexDirection: "column",
        justifyContent: "flex-start",
        width:( width / 3) - 10}}>
    <Text style={styles.text}>Pin Code</Text>
    <TextInput
      autoCorrect={false}
      value={this.state.profileData?.address?.zip}
      style={styles.textInput}
      keyboardType = 'numeric'
      maxLength={6}
      editable={this.state.profileEdit}
      onChangeText={(pinCode) => { 
        var profileData = {...this.state.profileData}
        var addressData = {...profileData.address}
        addressData.zip = pinCode.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '')
        profileData.address = addressData
        this.setState({profileData})
    }}
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
    inputStyle={{fontSize: 14}} 
    labelStyle={{ color: 'blue'}} 
    labelOnBlur={{ color: '#666' }}
    editEnable={this.state.skillEdit} />

            </View>
            <Picker
          enabled={true}
          onValueChange={(selected)=>console.log("sa ",selected)}
          style={styles.defaultLabelStyle}
          selectedValue={this.state.selectedValue}
        >
          {this.state.options.map(option => (
            <Picker.Item
              key={option.value}
              value={option.value}
              label={option.label}
            />
          ))}
        </Picker>
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
      },
      loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      },
      defaultlabelstyle: {
        alignSelf: 'center',
        fontSize: 13
      },
      cv:{
          marginTop:2,
          marginBottom:2,
          fontSize:13,
          color:"#808080",
      }
  });