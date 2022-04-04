import { View,Text,ScrollView,StyleSheet,Dimensions,TouchableOpacity } from "react-native";
import { Component,useEffect} from 'react';
const { width } = Dimensions.get('window');
import { Ionicons } from '@expo/vector-icons';
export default class JobCategoryScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
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
            ]
        }
    }
    render(){
        return (
            <ScrollView>
            <View style={{
                flexDirection:'row',marginTop:5
            }}>
    <Text style={{textAlign:'justify',padding:4,justifyContent:'flex-start'}}> Choose 3-5 job categories and we'll optimize 
    the job vacancy for you.</Text>
            </View>
            <View style={{flexDirection:'row',flexWrap:'wrap',marginLeft:10}}>
            {this.state.jobCategories.map((category, i) =>
      <TouchableOpacity key={i} onPress={()=> this.setState(({jobCategories}) => ({
        jobCategories: [
            ...jobCategories.slice(0,i),
            {
                ...jobCategories[i],
                isSelected: !category.isSelected,
            },
            ...jobCategories.slice(i+1)
        ]
    }))} 
      style={[styles.viewLatest,category.isSelected === true ? styles.selected:styles.notSelected]}>
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
      <View style={{ margin: 20,alignContent:'center' }}>
                        <TouchableOpacity
                            style={styles.nextbutton}
                           onPress={()=> this.props.navigation.navigate('Home')}
                        >
                            <Text style={{color:'#fff',fontSize:14}}> Next </Text>
                        </TouchableOpacity>

                    </View>
      </View>
            </ScrollView>
        )
    }
    
}

const styles = StyleSheet.create({
    container: {
    },
    viewLatest: {
      marginTop: 10,
      backgroundColor:'#fff',
      width: width - 210,
      margin: 10,
      height: width - 210,
      borderRadius: 10,
      justifyContent:'center',
      flexDirection:'column'
    },
    selected:{
        borderWidth:2,
        borderColor:'#4267B2'
    },
    notSelected:{
        borderWidth:0
    },
    nextbutton: {
        alignItems: 'center',
        backgroundColor: '#4267B2',
        alignSelf:'center',
        justifyContent:'center',
        width: width - 80,
        height: 40,
        borderRadius: 20
    }
})