import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';
import React,{useRef} from 'react';
import {
    View,
    Text,
    Animated,
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import icons from '../constants/icons';
import { COLORS } from '../constants/theme';

const HEDER_HEIGHT = 350;

const Recipe = (props) => {
    const recipe = props.route.params.item
    const scrollY = useRef(new Animated.Value(0)).current;
    const navigate = useNavigation()
    return (
        <View
            style={{
                flex: 1,
                backgroundColor:COLORS.white
            }}
        >
            
            <Animated.FlatList
                data={recipe?.ingredients}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        <View
                            style={{
                                marginTop:-1000,
                                paddingTop:1000,
                                alignItems:'center',
                                overflow:'hidden'
                            }}
                        >
                            <Animated.Image
                                source={recipe?.image}
                                resizeMode="contain"
                                style={{
                                    height:HEDER_HEIGHT,
                                    width:'200%',
                                    transform : [
                                        {
                                            translateY : scrollY.interpolate({
                                                inputRange : [-HEDER_HEIGHT, 0 , HEDER_HEIGHT],
                                                outputRange: [-HEDER_HEIGHT / 2 , 0 , HEDER_HEIGHT * 0.75]
                                            })
                                        },
                                        {
                                            scale : scrollY.interpolate({
                                                inputRange : [-HEDER_HEIGHT, 0 , HEDER_HEIGHT],
                                                outputRange : [2,1,0.75]
                                            })
                                        }
                                    ]
                                }}
                            />
                            <Animated.View
                                style={{
                                    position:'absolute',
                                    right:30,
                                    left:30,
                                    height:80,
                                    bottom:10
                                }}
                            >
                                <BlurView
                                    style={{
                                        flex:1,
                                        borderRadius:10,
                                        paddingHorizontal:15,
                                        flexDirection:'row',
                                        alignItems:'center',
                                        justifyContent:'space-between'
                                    }}
                                    blurType="dark"
                                >
                                        <View
                                            style={{
                                                flexDirection:'row',
                                                alignItems:'center'
                                            }}
                                        >
                                            <Image
                                                source={recipe?.author?.profilePic}
                                                style={styles.imgUser}
                                            />
                                            <View style={{paddingLeft:20}}>
                                                <Text style={styles.RecipeBy}>Recipe by : </Text>
                                                <Text style={styles.txtName}>{recipe?.author?.name}</Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity
                                            style={{
                                                width:30,
                                                height:30,
                                                borderRadius:10,
                                                borderWidth:1,
                                                borderColor:COLORS.darkGreen,
                                                alignItems:'center',
                                                justifyContent:'center'
                                            }}
                                        >
                                            <Image
                                                style={styles.rightArrow}
                                                source={icons.rightArrow}
                                            />
                                        </TouchableOpacity>
                                </BlurView>
                            </Animated.View>
                        </View>
                    </View>
                }
                scrollEventThrottle={16}
                onScroll = {Animated.event([
                    {nativeEvent:{contentOffset : {y:scrollY}}}
                ],{useNativeDriver: true})}
                renderItem = {({item}) =>(
                    <View
                        style={{
                            flexDirection:'row',
                            paddingHorizontal:15,
                            marginVertical:10,
                            alignItems:'center',
                            justifyContent:'space-between'
                        }}
                    >
                        <View
                            style={{
                                flexDirection:'row',
                                alignItems:'center'
                            }}
                        >
                            <View style={styles.viewIcon}>
                                <Image
                                    source={item.icon}
                                    style={styles.icon}
                                />
                            </View>
                            <Text style={styles.txtDesc}>{item.description}</Text>
                        </View>
                        <Text style={styles.txtQuantity}>{item.quantity}</Text>
                    </View>
                )}
            />
            {/* header */}
            <View
                style={{
                    position:'absolute',
                    top:0,
                    left:0,
                    right:0,
                    height:100,
                    flexDirection:'row',
                    alignItems:'flex-end',
                    justifyContent:"space-between",
                    paddingHorizontal:15,
                    paddingBottom:20
                }}
            >
                <TouchableOpacity
                    onPress={() => navigate.goBack()}
                    style={{
                        height:30,
                        width:30,
                        borderRadius:25,
                        borderWidth:1,
                        borderColor:COLORS.white,
                        alignItems:'center',
                        justifyContent:'center'
                    }}
                >
                    <Image
                        source={icons.back}
                        style={{
                            width:15,
                            height:15,
                            tintColor:COLORS.white
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                >
                    <Image
                        source={recipe?.isBookmark ? icons.bookmarkFilled : icons.bookmark}
                        style={{
                            width:30,
                            height:30,
                            tintColor:COLORS.darkGreen
                        }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    icon:{
        height:30,
        width:30
    },
    viewIcon:{
        height:45,
        width:45,
        backgroundColor:COLORS.lightGreen,
        alignItems:'center',
        justifyContent:"center",
        borderRadius:10,
        marginRight:20
    },
    txtDesc:{
        fontSize:18,
        fontWeight:'600',
    },
    txtQuantity: {
        fontSize:16,
        fontWeight:'500',
    },
    imgUser:{
        height:40,
        width:40,
        borderRadius:40
    },
    RecipeBy:{
        color:COLORS.gray,
        fontSize:15,
        fontWeight:'500'
    },
    txtName:{
        color:COLORS.white,
        fontSize:18,
        fontWeight:'600'
    },
    rightArrow:{
        width:15,
        height:15,
        tintColor:COLORS.darkGreen
    }
})

export default Recipe;