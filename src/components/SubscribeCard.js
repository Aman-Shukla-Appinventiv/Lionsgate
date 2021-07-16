import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { grey, red, white } from '../assets/Colors'
import { normalize, vh, screenWidth, vw } from '../dimension'


export default function SubscribeCard(props)
{
    badge = () => {
        return(
            <Text style = {styles.badge}>Save 41%</Text>
        )
    }
    return(
    <View style = {[styles.mainContainer,{
        borderColor: props.type == "offer"? red : white,
        backgroundColor: props.type == "offer"? "#2E1E1F" : "#343635"
    }]}>
        {props.type == "offer"? <Text style = {styles.ogPrice}> ₹ 1118</Text> : null}
        {props.type == "offer"? badge() : null}
        <Text style = {styles.price}> ₹ {props.price}</Text>
        <Text style = {styles.period}>{props.period}</Text>

    </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        width: vw(150),
        height:  vh(150),
        backgroundColor: "#343635",
        margin: normalize(10),
        borderRadius: normalize(6),
        borderWidth: normalize(2),
        justifyContent: "center",
        alignItems: "center"

    },
    price: {
        color: white,
        fontSize: normalize(20),
        fontWeight: "bold"
    },
    period: {
        color: white,
        fontSize: normalize(14)
    },
    ogPrice: {
        color: white,
        textDecorationLine: "line-through",
        textDecorationColor: red
    },
    badge: {
        fontSize: normalize(10),
        color: white,
        backgroundColor: red,
        padding: normalize(5),
        position: "absolute",
        top: -vh(10),
        left: vw(5)
    }
})