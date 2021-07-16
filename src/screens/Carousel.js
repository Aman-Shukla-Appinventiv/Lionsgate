import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {black, white} from '../assets/Colors';
import ImageSlider from '../components/ImageSlider';
import CustomButton from '../components/CustomButton';
import { vh, normalize, vw } from '../dimension';

const images = [
   {img:"https://i.redd.it/rdlldkguf8w21.jpg", text: "Billion Dollar Franchises and Box-sets"},
   {img:"https://i.imgur.com/qJF3hzA.jpg", text: "Premium Originals & Binge-worthy Series"},
   {img:"https://i.pinimg.com/originals/4d/f5/18/4df518d2962f74efa08d11c202fa01b5.jpg", text: "Blockbuster Movies & Exclusive Premieres"},
]

export default function Carousel(props) {
  return (
    <View style={styles.mainContainer}>
      <Text
          style={styles.skipBtn}
          onPress={() => {
            props.navigation.replace('Router');
          }}>
          Skip
        </Text>
      <ImageSlider images = {images} style = {{height: "80%"}} type = "onBoarding"/>
      <View style = {styles.box}>
      <CustomButton title = "Sign up" onPress = {() => {props.navigation.navigate("SignupFirst")}} />
      <View style={styles.signupBox}>
          <Text style={styles.quote}>Already have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Login');
            }}>
            <Text style={styles.forgetPassText}> Log in </Text>
          </TouchableOpacity>
        </View>
      </View>
      
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: black,
  },
  box: {
    flex: 1,
    paddingHorizontal: vw(20),
  },
  signupBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center"
  },
  quote: {
    color: '#aaa',
    fontSize: normalize(16),
    marginVertical: vh(20),
  },
forgetPassText: {
    paddingVertical: vh(10),
    fontWeight: 'bold',
    color: white,
  },
  skipBtn: {
    color: white,
    position: "absolute",
    right: vw(10),
    top: vh(10),
    zIndex: 1,
    fontWeight: 'bold',
    margin: vh(20),
    padding: normalize(10),
  },
});
