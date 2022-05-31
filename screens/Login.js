import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    StatusBar,
    StyleSheet,
    Button
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import images from "../constants/images";
import {COLORS} from "../constants/theme";
import { Searchbar } from 'react-native-paper';


const Login = ({ navigation }) => {
    const navigate = useNavigation()
    return (
        <View style={{flex:1,backgroundColor:COLORS.black}}>
            <StatusBar barStyle='light-content'/>
            <View style={{flex: 0.65}}>
                <ImageBackground
                    source={images.loginBackground}
                    style={{
                        flex:1,
                        justifyContent:'flex-end'
                    }}
                >
                    <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 0, y: 1}} 
                        colors={[
                            COLORS.transparent,
                            COLORS.black
                        ]}
                        style={{
                            height:200,
                            justifyContent:'flex-end'
                        }}
                    >
                        <View style={{marginLeft:15}}>
                            <Text style={styles.txtBig}>Cooking a Delicious Food Easily</Text>
                            <Text style={styles.txtDesc}>Discover more than 1200 food recipes in you hands and cooking it easily</Text>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </View>
            <View style={{
                flex:0.35,
                paddingHorizontal:15,
                justifyContent:'center'
                }}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => navigate.replace('Home')}
                    >
                        <LinearGradient 
                            colors={[COLORS.lime,COLORS.darkGreen]} 
                            style={styles.linearGradient}
                            start={{x:1,y:1}}
                            end={{x:0,y:1}}
                        >
                            <Text style={styles.txt}>Login</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.btn,{
                            borderWidth:1,
                            borderRadius:20,
                            borderColor:COLORS.lime
                        }]}
                        onPress={() => navigation.replace('Home')}
                    >
                            <Text style={styles.txt}>Sign Up</Text>
                    </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    txtBig:{
        fontSize:32,
        color:COLORS.white,
        fontWeight:'600',
        width:'65%',
        letterSpacing:1,
        paddingBottom:10
    },
    txtDesc:{
        fontSize:15,
        color:COLORS.gray,
        width:'70%',
        letterSpacing:1,
    },
    btn:{
        height:70,
        alignItems:'center',
        justifyContent:'center',
        shadowColor: "#000",
        marginVertical:10,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    linearGradient:{
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:22,
    },
    txt:{
        color:COLORS.white,
        fontSize:18,
        fontWeight:'700'
    }
})

export default Login;