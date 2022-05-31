import React from "react";
import {
    View,
    Text,
    Image
} from "react-native";
import { COLORS } from "../constants/theme";



const TabIcons = (props) => {
    const {icon,focused} = props
    return (
        <View
            style={{
                height:80,
                width:50,
                alignItems:'center',
                justifyContent:'center'
            }}
        >
            <Image
                source={icon}
                resizeMode="contain"
                style={{
                    width:25,
                    height:25,
                    tintColor:focused ? COLORS.darkGreen : COLORS.lightLime
                }}
            />
            {focused && 
                <View
                    style={{
                        position:'absolute',
                        left:0,
                        right:0,
                        bottom:0,
                        height:5,
                        borderTopLeftRadius:5,
                        borderTopRightRadius:5,
                        backgroundColor:COLORS.darkGreen
                    }}
                />

            }

        </View>
    )
}

export default TabIcons;