import React, {useRef, useState} from 'react';
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

const SignupFirst = props => {
  const valueForEmail = useRef(new Animated.Value(0)).current
  const valueForPassword = useRef(new Animated.Value(0)).current
  const emailRef = React.createRef()
  const passwordRef = React.createRef()
  const [hidePass, setHidePass] = useState(true);

  const schema = yup.object({
    email: yup.string().required('Required').email('Invalid Email'),
    password: yup
      .string()
      .required('Required')
      .min(6, 'Minimum 6 characters')
      .max(12, 'Maximum 12 characters'),
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

  const animatePasswordText = () => {
    Animated.timing(valueForPassword, {
      toValue: -25,
      duration: 250,
      useNativeDriver: false
    }).start()
  }
  const animateBackPasswordText = () => {
    Animated.timing(valueForPassword, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false
    }).start()
  }

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => {
          props.navigation.goBack();
        }}>
        <Icon name="arrow-back" size={normalize(30)} color={white} />
      </TouchableOpacity>

      <View style={styles.formBox}>
        <View style={styles.box}>
          <View style={[styles.circle, {backgroundColor: red}]}>
            <Text style={styles.circleText}>1</Text>
          </View>
          <View style={styles.line} />
          <View style={[styles.circle]}>
            <Text style={styles.circleText}>2</Text>
          </View>
        </View>

        <Text style={styles.lionsgateLogo}>
          Sign-up to Subscribe 14 Day Free Trial
        </Text>

        <Formik
          initialValues={{email: '', password: ''}}
          onSubmit={values => {
            props.navigation.navigate("SignupSecond",{...values})
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
              <View style = {styles.inputContainer}>
              <Animated.Text
              onPress = {() => {passwordRef.current.focus()}}
              style = {[styles.animatedText,{
                top: valueForPassword,
                fontSize: valueForPassword.interpolate({
                  inputRange: [-25, 0],
                  outputRange: [normalize(14), normalize(18)]
                }),
                color: valueForPassword.interpolate({
                  inputRange:[-25,0],
                  outputRange: [white, grey]
                })
              }, {width: "90%"}]}
              >Password</Animated.Text>
              <View style={styles.passBox}>
             
                <TextInput
                ref = {passwordRef}
                  placeholder={'Minimum 6 characters'}
                  placeholderTextColor={grey}
                  secureTextEntry={hidePass}
                  onFocus = {animatePasswordText}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password'),animateBackPasswordText}
                  value={values.password}
                  style={styles.passInput}
                  />
                <TouchableOpacity
                  onPress={() => {
                    setHidePass(!hidePass);
                  }}>
                  {hidePass ? (
                    <Icon name="eye-off-outline" size={25} color={white} />
                  ) : (
                    <Icon name="eye-outline" size={25} color={white} />
                  )}
                </TouchableOpacity>
              </View>
              </View>

              <Text style={styles.errorText}>
                {touched.password && errors.password}
              </Text>
              <View style={styles.terms}>
                <Text style={styles.text}>
                  By proceeding, you agree to our{' '}
                </Text>
                <TouchableOpacity onPress = {() => {props.navigation.navigate("Terms")}}>
                  <Text style={styles.termsNPolicies}>Terms of use,</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => {props.navigation.navigate("Policies")}}>
                  <Text style={styles.termsNPolicies}>Privacy Policy</Text>
                </TouchableOpacity>
                <Text style={styles.text}> and that you are over 18.</Text>
              </View>

              <CustomButton
                title="Continue"
                onPress={handleSubmit}
                style={{marginTop: normalize(20)}}
              />
            </View>
          )}
        </Formik>
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
    textAlign: 'center',
    fontSize: normalize(22),
    color: white,
    marginBottom: vh(30),
  },
  quote: {
    color: '#aaa',
    fontSize: normalize(16),
    marginVertical: vh(20),
  },
  forgotPassTouch: {
    alignSelf: 'flex-start',
  },
  forgetPassText: {
    paddingVertical: vh(10),
    fontWeight: 'bold',
    color: white,
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
  passInput: {
    fontSize: vh(18),
    fontWeight: 'bold',
    color: white,
    paddingVertical: vh(5),
    backgroundColor: "#000",
    flexGrow: 1
  },
  passBox: {
    flexDirection: 'row',
  },
  signupBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  terms: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingVertical: vh(20),
  },
  text: {
    color: '#aaa',
    fontSize: normalize(16),
  },
  termsNPolicies: {
    color: white,
    textDecorationLine: 'underline',
    fontSize: normalize(16),
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vh(20),
  },
  circle: {
    width: vw(28),
    height: vh(30),
    borderWidth: normalize(2),
    borderColor: red,
    borderRadius: normalize(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    color: 'white',
    fontWeight: 'bold',
  },
  line: {
    borderWidth: 1,
    borderColor: red,
    width: '10%',
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

export default SignupFirst;
