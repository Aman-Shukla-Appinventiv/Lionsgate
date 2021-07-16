import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {signUp} from '../redux/actions';
import {red, grey, white, black} from '../assets/Colors';
import {vh, vw, normalize} from '../dimension';
import {Formik} from 'formik';
import * as yup from 'yup';
import Icon from 'react-native-vector-icons/Ionicons';

import CustomButton from '../components/CustomButton';
import GenderBtn from '../components/GenderBtn';

const SignupSecond = props => {
  const [gender, setGender] = useState('');
  const dispatch = useDispatch();

  const schema = yup.object({
    DOB: yup.date('Not a valid Date'),
  });

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
          <View style={[styles.circle]}>
            <Text style={styles.circleText}>1</Text>
          </View>
          <View style={styles.line} />
          <View style={[styles.circle, {backgroundColor: red}]}>
            <Text style={styles.circleText}>2</Text>
          </View>
        </View>

        <Text style={styles.lionsgateLogo}>
          Sign-up to Subscribe 14 Day Free Trial
        </Text>
        <Text style={styles.forgetPassText}> What is your gender? </Text>
        <GenderBtn setGenderData = {(data) => {setGender(data)}}/>

        <Text style={styles.forgetPassText}> Date of Birth </Text>

        <Formik
          initialValues={{DOB: ''}}
          onSubmit={values => {
            dispatch(
              signUp({
                ...values,
                email: props.route.params.email,
                password: props.route.params.password,
                gender: gender,
              }),
            );
            props.navigation.navigate('Login');
          }}
          validationSchema={schema}>
          {({values, touched, errors, handleSubmit, handleBlur, handleChange}) => (
            <View style={styles.inputBox}>
              <TextInput
                placeholder={'YYYY-MM-DD'}
                placeholderTextColor={white}
                onChangeText = {handleChange("DOB")}
                onBlur = {handleBlur("DOB")}
                value={values.DOB}
                style={styles.input}
              />
              <Text style={styles.errorText}>{touched.DOB && errors.DOB}</Text>

              <View style={styles.terms}>
                <Text style={styles.text}>
                  By proceeding, you agree to our{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('Terms');
                  }}>
                  <Text style={styles.termsNPolicies}>Terms of use,</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('Policies');
                  }}>
                  <Text style={styles.termsNPolicies}>Privacy Policy</Text>
                </TouchableOpacity>
                <Text style={styles.text}> and that you are over 18.</Text>
              </View>

              <CustomButton
                title="SIGN UP"
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
    textAlign: 'center',
    fontSize: normalize(22),
    color: white,
    marginBottom: normalize(30),
  },
  quote: {
    color: '#aaa',
    fontSize: normalize(16),
    marginVertical: normalize(20),
  },
  forgotPassTouch: {
    alignSelf: 'flex-start',
  },
  forgetPassText: {
    paddingVertical: normalize(10),
    fontSize: normalize(16),
    fontWeight: 'bold',
    color: white,
  },
  errorText: {
    marginTop: normalize(10),
    color: red,
  },
  inputBox: {
    width: '100%',
    marginTop: normalize(20),
  },
  input: {
    paddingBottom: normalize(10),
    fontSize: normalize(18),
    fontWeight: 'bold',
    textAlign: 'center',
    color: white,
    borderBottomWidth: normalize(1),
    borderBottomColor: white,
    margin: 1,
  },
  passInput: {
    paddingBottom: normalize(10),
    fontSize: normalize(18),
    fontWeight: 'bold',
    color: white,
    flex: 1,
  },
  passBox: {
    flexDirection: 'row',
    borderBottomWidth: normalize(1),
    borderBottomColor: white,
    marginTop: normalize(20),
  },
  signupBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  terms: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingVertical: normalize(20),
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
    marginBottom: normalize(20),
  },
  circle: {
    width: normalize(30),
    height: normalize(30),
    borderWidth: normalize(2),
    borderColor: red,
    borderRadius: normalize(15),
    justifyContent: 'center',
    alignItems: 'center',
    padding: normalize(5),
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
});

export default SignupSecond;
