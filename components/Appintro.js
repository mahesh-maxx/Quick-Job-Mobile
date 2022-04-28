import React,{ Component} from "react";
import { View, StatusBar, Image,Text,ScrollView,StyleSheet,Dimensions,PixelRatio,TouchableOpacity } from 'react-native';
const { width, height } = Dimensions.get('window');
import AsyncStorageLib from '@react-native-async-storage/async-storage';


export default class AppIntro extends Component {
    constructor(props){
        super(props);
        this.scrollViewRef = React.createRef();
        this.state = {
            currentPage: 0,
            introSlide:[
                {
                    logoImage:require('../assets/swipelogo.png'),
                    swipeImage:require('../assets/swipe1.png'),
                    swipeHeading:"Search Jobs",
                    swipeText1:"search your job in hireone app",
                    swipeText2:"we have multiple jobs for everyone",
                },
                {
                    logoImage:require('../assets/swipelogo.png'),
                    swipeImage:require('../assets/swipe2.png'),
                    swipeHeading:"Apply Job",
                    swipeText1:"Apply the suitable job ",
                    swipeText2:"we have multiple jobs for everyone",
                },
                {
                    logoImage:require('../assets/swipelogo.png'),
                    swipeImage:require('../assets/swipe3.png'),
                    swipeHeading:"Ready to Work",
                    swipeText1:"Get Interviewed and Get hired",
                    swipeText2:"we have multiple jobs for everyone",
                }
            ]
        }
    }

    setSliderPage = (event) => {
        const { currentPage } = this.state;
        const { x } = event.nativeEvent.contentOffset;
        const indexOfNextScreen = Math.floor(x / width);
        if (indexOfNextScreen !== currentPage) {
          this.setState({currentPage:indexOfNextScreen})
        }
    };

    toNextPage = (screenIndex) => {
        screenIndex += 1;
        this.setState({currentPage:screenIndex})
        this.scrollViewRef.current?.scrollTo({x: width * screenIndex, animated: true});
     };

     proceedTo() {
        AsyncStorageLib.setItem('Appintro','true')
        const token = AsyncStorageLib.getItem('userToken')
        const userName = AsyncStorageLib.getItem('UserName')
        token != "" ? this.props.navigation.navigate('Login') :  this.props.navigation.navigate('Dashboard',{title:userName})
     }
     

    render(){
        
        return (
            <>
              <View style={{ flex: 1,backgroundColor:'#fff' }}>
                <ScrollView
                  style={{ flex: 1 }}
                  horizontal={true}
                  scrollEventThrottle={16}
                  pagingEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  onScroll={(event) => {
                    this.setSliderPage(event);
                  }}
                  ref={this.scrollViewRef}
                >
                    {this.state.introSlide.map((slide, i) =>
                                      <View style={{ width, height }} key={i}>
                                      <Image source={slide.logoImage} style={styles.logoStyle} />
                                      <Image source={slide.swipeImage} style={styles.imageStyle} />
                                      <View style={styles.wrapper}>
                                        <Text style={styles.header}>{slide.swipeHeading}</Text>
                                        <Text style={styles.paragraph}>{slide.swipeText1}</Text>
                                        <Text style={styles.paragraph}>{slide.swipeText2}</Text>
                                      </View>
                                    </View>
                    )}
                </ScrollView>
                {this.state.currentPage < 2 ?
                <View style={{flexDirection:'row',justifyContent:'space-around',marginBottom:10}}>
                <View>
                    <Text style={{fontSize:16,color:'#a1a2a6',fontWeight:'600'}} onPress={() => this.proceedTo}>Skip</Text>
                </View>
                <View style={styles.paginationWrapper}>
                    
                  {Array.from(Array(3).keys()).map((key, index) => (
                    <View style={[styles.paginationDots, { opacity: this.state.currentPage === index ? 1 : 0.2 }]} key={index} />
                  ))}
                </View>
                <View>
                    <Text style={{fontSize:16,color:'#653ef0',fontWeight:'700'}} onPress={()=>this.toNextPage(this.state.currentPage)}>Next</Text>
                </View>
                </View> :
                <View style={{flexDirection:'row',justifyContent:'space-around',marginBottom:10}}>
                <TouchableOpacity
             style={styles.button}
             onPress={() => this.proceedTo}
           >
             <Text style={{color:'#fff'}}> GET START NOW </Text>
     </TouchableOpacity>
     </View>
    }
              </View>
            </>
          );
        
    }
}

const styles = StyleSheet.create({
    logoStyle: {
      marginTop:10,
      height: 130,
      width: width,
      resizeMode:'center'
    },
    wrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 30,
    },
    imageStyle:{
        height: 350,
        width: width,
        resizeMode:'contain'
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 15,
    },
    paragraph: {
      fontSize: 16,
    },
    paginationWrapper: {

      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    paginationDots: {
      height: 10,
      width: 10,
      borderRadius: 10 / 2,
      backgroundColor: '#0898A0',
      marginLeft: 10,
    },
    button: {
        alignItems: 'center',
        backgroundColor:'#6b76ff',
        width:width-40, 
        paddingTop:10,
        color:'#fff',
        height:40,
        borderRadius:5
      },
  });