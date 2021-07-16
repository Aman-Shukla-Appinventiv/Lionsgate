import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { white, red } from '../assets/Colors'
import { normalize } from '../dimension'

const CustomButton = (props) => {
    return(
        <TouchableOpacity style = {[styles.btnToucbale,props.style]} onPress = {props.onPress}>
            <Text style = {styles.btnText}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnToucbale: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: red,
        width : "100%",
        paddingVertical: normalize(8),
        marginVertical: normalize(15),
        borderRadius: normalize(6)
    },
    btnText: {
        color: white,
        fontWeight: "bold",
        fontSize: normalize(16)
    }
})
export default CustomButton;