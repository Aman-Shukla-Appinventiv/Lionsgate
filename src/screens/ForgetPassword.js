import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated
} from 'react-native';
import {red, grey, white, black} from '../assets/Colors';
import {vh, vw, normalize} from '../dimension';
import {Formik} from 'formik';
import * as yup from 'yup';
import Icon from 'react-native-vector-icons/Ionicons';

import CustomButton from '../components/CustomButton';

const ForgetPassword = props => {
  const emailRef = React.createRef()
  const valueForEmail = useRef(new Animated.Value(0)).current
    const phoneRegExp = /^[0-9]{10}$/
    const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const schema = yup.object({
    email: yup.string().required('Required').matches(emailRegExp, 'Invalid Email')
  });

  const animateEmailText = () => {
    Animated.timing(valueForEmail, {
      toValue: -25,
      duration: 250,
      useNativeDriver: false
    }).start()
  }
  const animateBackEmailText = () => {
    Animated.timing(valueForEmail, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false
    }).start()
  }

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity style={styles.backBtn} onPress = {() => {props.navigation.goBack()}}>
        <Icon name="arrow-back" size={normalize(30)} color={white} />
      </TouchableOpacity>

      <View style={styles.formBox}>
        <Text style={styles.lionsgateLogo}>Password Recovery</Text>
        <Text style={styles.quote}>
          You can change your password for security reasons or reset it if you
          forget it. Please enter the email or mobile number that was used to
          sign up.
        </Text>
        <Formik
          initialValues={{email: ''}}
          onSubmit={values => {
            console.log(values);
            props.navigation.navigate("RecoveryEmailSent",{email: values.email})
          }}
          validationSchema={schema}>
          {({
            values,
            touched,
            errors,
            handleBlur,
            handleSubmit,
            handleChange,
          }) => (
            <View style={styles.inputBox}>
              <View style = {styles.inputContainer}>
              <Animated.Text
              onPress = {() => {emailRef.current.focus()}}
              style = {[styles.animatedText,{
                top: valueForEmail,
                fontSize: valueForEmail.interpolate({
                  inputRange: [-25, 0],
                  outputRange: [normalize(14), normalize(18)]
                }),
                color: valueForEmail.interpolate({
                  inputRange:[-25,0],
                  outputRange: [white, grey]
                })
              }]}
              >Email Address</Animated.Text>
              <TextInput
              ref = {emailRef}
                placeholder={'name@example.com'}
                placeholderTextColor={grey}
                onFocus = {animateEmailText}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email'), animateBackEmailText}
                value={values.email}
                style={styles.input}
              />
              </View>
              <Text style={styles.errorText}>
                {touched.email && errors.email}
              </Text>
              <CustomButton
                title="Reset Password"
                onPress={handleSubmit}
                style={{marginTop: normalize(30)}}
              />
            </View>
          )}
        </Formik>
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
    paddingLeft: vw(20),
    paddingTop: vh(40),
    justifyContent: 'center',
  },
  formBox: {
    alignItems: 'center',
    marginHorizontal: vw(20),
    marginTop: vh(40),
  },
  lionsgateLogo: {
    fontSize: normalize(30),
    color: white,
  },
  quote: {
    color: '#aaa',
    fontSize: normalize(16),
    marginVertical: vh(20),
    textAlign: "center"
  },
 
  errorText: {
    marginTop: vh(10),
    color: red,
  },
  inputBox: {
    width: '100%',
    marginTop: vh(20),
  },
  input: {
    fontSize: vh(18),
    fontWeight: 'bold',
    color: white,
    paddingVertical: vh(5),
    backgroundColor: "#000"
  },
  animatedText: {
    color: grey,
    paddingBottom: vh(10),
    fontSize: vh(18),
    position: 'absolute',
    top: 0,
    zIndex: 1,
    backgroundColor: "#000",
    width: '100%',
    height: "100%"
  },
  inputContainer: {
    borderBottomWidth: vh(1),
    borderBottomColor: '#fff',
    marginVertical: vh(10)
  }
});

export default ForgetPassword;
