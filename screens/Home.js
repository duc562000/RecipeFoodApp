import React,{useState,useEffect} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Image,
    StyleSheet,
    FlatList,
    ImageBackground,
    ScrollView
} from 'react-native';
import images from '../constants/images';
import { COLORS } from '../constants/theme';
import { Searchbar } from 'react-native-paper';
import icons from '../constants/icons';
import dummyData from "../constants/dummyData"
import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';

const Home = ({ navigation }) => {
    const navigate = useNavigation()
    const [dataFood,setDataFood] = useState(dummyData.trendingRecipes)
    const [clickBookMark,setClickBookMark] = useState([])
    const [customList,setCustomList] = useState([])
    useEffect(() => {
        setDataFood(dataFood)
    },[dataFood]);
    useEffect(() => {
        if (dataFood) {
            let newDataPlant = dataFood;
            setCustomList(newDataPlant)
        }
    },[dataFood])
    const onPressBookMark = id => {
        let customNewList = [...customList];
        for (const item in customNewList) {
            if (customNewList[item].id === id ){
                if(customNewList[item].isBookmark === false) {
                    customNewList[item].isBookmark = true;
                    let itemClick = customNewList[item];
                    setClickBookMark([...clickBookMark,itemClick]);
                } else {
                    customNewList[item].isBookmark = false;
                    let clickNewList = clickBookMark.filter(item => item.id)
                    setClickBookMark(clickNewList);
                }
            }
        }
        setCustomList(customNewList);
    };
    console.log(dataFood)
    return (
        <View style={{flex: 1,backgroundColor:COLORS.white}}>
            <SafeAreaView
                style={{flex:0.1}}
            >
                <View
                    style={{
                        flexDirection:'row',
                        justifyContent:'space-between',
                        alignItems:'center',
                        paddingHorizontal:15
                    }}
                >
                    <View
                        style={{}}
                    >
                        <Text style={styles.txtTitle}>Hello Dukc,</Text>
                        <Text style={styles.txtDes}>What you want to cook today?</Text>
                    </View>
                    <Image
                        style={styles.imgAvt}
                        source={images.UserProfile1}
                    />
                </View>
            </SafeAreaView>
            <View
                style={{flex:0.1,paddingHorizontal:15}}
            >
                <Searchbar
                    icon={icons.search}
                    placeholder="Search Recipes"
                    // onChangeText={(text) => serachFilter(text)}
                    // value={search}
                    style={{
                    backgroundColor:COLORS.gray2,
                    borderWidth:0.1,
                    height:50,
                    borderRadius:10,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    }}
            />
            </View>
            <View
                style={{
                    flex:0.15,
                    backgroundColor:COLORS.lightGreen,
                    marginHorizontal:15,
                    borderRadius:10,
                    flexDirection:'row',
                    justifyContent:"space-evenly",
                    alignItems:'center'
                }}
            >
                <Image
                    style={{
                        width:100,
                        height:100
                    }}
                    source={images.recipe}
                />
                <View>
                    <Text style={styles.txtTotalRecipes}>You have {dataFood.length} recipes that you haven't tried yet</Text>
                    <Text style={styles.txtSee}>See Recipes</Text>
                </View>
            </View>
            <View style={{flex:0.5,paddingHorizontal:15}}>
                    <Text style={styles.txtTitleBig}>Trending Recipe</Text>
                    <FlatList
                        data={customList}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor = {item => item.id}
                        renderItem = {({item,index}) => (
                            <TouchableOpacity
                                onPress={() => navigate.navigate('Recipe',{item})}
                            >
                                <ImageBackground
                                    borderRadius={15}
                                    source={item.image}
                                    resizeMode="cover"
                                    style={{
                                        width:230,
                                        height:320,
                                        marginRight:20,
                                        
                                    }}
                                >
                                    <View style={{
                                        flex:1,
                                        justifyContent:"space-between",
                                        paddingHorizontal:15,
                                        paddingTop:20,
                                        paddingBottom:8
                                        }}>
                                        <View
                                            style={{
                                                backgroundColor:COLORS.transparentGray,
                                                width:70,
                                                alignItems:'center',
                                                justifyContent:'center',
                                                height:30,
                                                borderRadius:20
                                            }}
                                        >
                                            <Text style={styles.txtType}>{item.category}</Text>
                                        </View>
                                        <BlurView
                                            blurType='dark'
                                            style={{
                                                height:100,
                                                borderRadius:20,
                                                paddingHorizontal:10,
                                                paddingVertical:10,
                                                justifyContent:'space-between'
                                            }}
                                        >
                                            <View
                                                style={{
                                                    flexDirection:'row',
                                                    justifyContent:'space-between',
                                                }}
                                            >
                                                <Text style={styles.txtNameTrending}>{item.name}</Text>
                                                <TouchableOpacity
                                                    onPress={() => onPressBookMark(item.id)}
                                                >
                                                    <Image
                                                        source={item.isBookmark ? icons.bookmarkFilled : icons.bookmark}
                                                        style={{
                                                            width:18,
                                                            height:18,
                                                            tintColor:COLORS.darkGreen
                                                        }}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                            <Text style={styles.txtDesTrending}>{item.duration} | {item.serving} serving</Text>
                                        </BlurView>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        )}
                    />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    imgAvt:{
        height:55,
        width:55,
        borderRadius:55
    },
    txtTitle:{
        fontSize:26,
        fontWeight:'600',
        color:COLORS.darkLime,
        letterSpacing:1,
        paddingVertical:5
    },
    txtDes:{
        fontSize:16,
        color:COLORS.gray,
        letterSpacing:0.5,
    },
    txtTotalRecipes:{
        width:200,
        fontSize:15,
        color:COLORS.black,
        fontWeight:'500',
        letterSpacing:0.5,
        paddingBottom:10
    },
    txtSee:{
        fontSize:15,
        color:COLORS.darkGreen,
        fontWeight:'600',
        textDecorationLine:'underline',
    },
    txtTitleBig:{
        fontSize:18,
        fontWeight:'600',
        paddingVertical:15,
        letterSpacing:0.5
    },
    txtType:{
        fontSize:15,
        color:COLORS.white,
        fontWeight:'600'
    },
    txtNameTrending:{
        fontSize:18,
        color:COLORS.white,
        fontWeight:'700',
        width:130
    },
    txtDesTrending:{
        color:COLORS.gray,
        fontSize:15,
        fontWeight:'500'
    }
})

export default Home;