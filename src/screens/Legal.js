import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { normalize, vh, vw } from "../dimension"

export default function Legal(props){
return(
    <View style = {styles.mainContainer}>
        <View style = {styles.header}>
            <TouchableOpacity onPress = {() => {props.navigation.goBack()}}>
        <Icon name="arrow-back" size={normalize(30)} color= "white" />
        </TouchableOpacity>
            <Text style = {styles.headerText}>Legal</Text>
        </View>
        <TouchableOpacity 
      onPress = {() => {props.navigation.navigate("Terms")}}
      key = {(Math.random()+Math.random()).toString()} 
      style={styles.row}>
        <Text style = {styles.text}>Terms and Conditions</Text>
        <Icon
          name="chevron-forward-outline"
          size={normalize(20)}
          color="white"
        />
      </TouchableOpacity>
      <TouchableOpacity 
      onPress = {() => {props.navigation.navigate("Policies")}}
      key = {(Math.random()+Math.random()).toString()} 
      style={styles.row}>
        <Text style = {styles.text}>Privacy Policies</Text>
        <Icon
          name="chevron-forward-outline"
          size={normalize(20)}
          color="white"
        />
      </TouchableOpacity>
    </View>
)
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#000"
    },
    header: {
        flexDirection: "row",
        padding: normalize(5),
        alignItems: "center",
    },
    headerText: {
        color: "#fff",
        fontSize: normalize(18),
        marginLeft: vw(10)
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: vw(20),
        marginVertical: vh(10),
        padding: normalize(5)
      },
      text: {
        color: "white",
        fontSize: normalize(16)
      }
}) 