import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {red, grey, white, black} from '../assets/Colors';
import {vh, vw, normalize} from '../dimension';
import {Formik} from 'formik';
import * as yup from 'yup';
import Icon from 'react-native-vector-icons/Ionicons';

import CustomButton from '../components/CustomButton';

const RecoveryEmailSent = props => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity style={styles.backBtn} onPress = {() => {props.navigation.goBack()}}>
        <Icon name="arrow-back" size={normalize(30)} color={white} />
      </TouchableOpacity>

      <View style={styles.formBox}>
        <Text style={styles.lionsgateLogo}>Password Recovery: Email Sent</Text>
        <Image
          style={styles.correctLogo}
          source={require('../assets/icons/check.png')}
        />
        <Text style={styles.quote}>
          An email with instructions on how to reset your password has been sent
          to:
        </Text>
        <Text style={styles.emailQuote}>{props.route.params.email}</Text>
        <View style={styles.rowBox}>
          <View style={styles.dot} />
          <Text style={styles.guide}>
            Check your spam or junk folder if you don't see the email in your
            inbox.
          </Text>
        </View>
        <View style={styles.rowBox}>
          <View style={styles.dot} />
          <Text style={styles.guide}>
          For your security the password-reset link will be valid for 2 hours
            only.
          </Text>
        </View>

        <CustomButton
          title="Log in"
          onPress={() => {
            props.navigation.navigate('Login');
          }}
          style={{marginTop: normalize(30)}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: black,
  },
  backBtn: {
    paddingLeft: normalize(20),
    paddingTop: normalize(40),
    justifyContent: 'center',
  },
  formBox: {
    alignItems: 'center',
    marginHorizontal: normalize(20),
    marginTop: normalize(40),
  },
  lionsgateLogo: {
    fontSize: normalize(30),
    color: white,
    textAlign: 'center',
  },
  quote: {
    color: '#aaa',
    fontSize: normalize(16),
    marginVertical: normalize(20),
    textAlign: 'center',
  },
  emailQuote: {
    color: white,
    fontSize: normalize(16),
    fontWeight: 'bold',
    marginBottom: normalize(20),
    textAlign: 'center',
  },
  correctLogo: {
    height: vh(70),
    width: vw(70),
    margin: normalize(30),
  },
  rowBox: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: normalize(15),
    marginVertical: normalize(10),
    width: "100%",
  },
  dot: {
    height: vh(4),
    width: vw(4),
    borderRadius: normalize(2),
    backgroundColor: red,
    marginHorizontal: normalize(10),
  },
  guide: {
    fontSize: normalize(16),
    color: white,
  },
});

export default RecoveryEmailSent;
