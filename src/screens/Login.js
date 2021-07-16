import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {red, grey, white, black} from '../assets/Colors';
import {vh, vw, normalize} from '../dimension';
import {Formik} from 'formik';
import * as yup from 'yup';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomAlert from '../components/CustomAlert';
import {signIn} from '../redux/actions';

import CustomButton from '../components/CustomButton';
const Login = props => {
  const detailNotFoundRef = useRef(null);
  const incorrectPasswordRef = useRef(null);
  const valueForEmail = useRef(new Animated.Value(0)).current;
  const valueForPassword = useRef(new Animated.Value(0)).current;
  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  const [hidePass, setHidePass] = useState(true);
  const state = useSelector(state => state.authReducer);
  useEffect(() => {
    if (state.userLoggedIn) {
      props.navigation.replace('Subscribe');
    }
  });
  const dispatch = useDispatch();
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
      useNativeDriver: false,
    }).start();
  };
  const animateBackEmailText = () => {
    Animated.timing(valueForEmail, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const animatePasswordText = () => {
    Animated.timing(valueForPassword, {
      toValue: -25,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };
  const animateBackPasswordText = () => {
    Animated.timing(valueForPassword, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => {
          props.navigation.goBack();
        }}>
        <Icon name="arrow-back" size={normalize(30)} color={white} />
      </TouchableOpacity>
      <CustomAlert
        ref={detailNotFoundRef}
        title="Details Not Found"
        message="Looks like you haven't registered yourself with us."
        buttons={[
          {
            type: 'positive',
            title: 'Okay',
            onPress: () => {
              detailNotFoundRef.current.hideAlert();
            },
          },
        ]}
      />
      <CustomAlert
        ref={incorrectPasswordRef}
        title="Incorrect Password"
        message="Try forget password?  For more details connect with us at lionsgate@help.com"
        buttons={[
          {
            type: 'positive',
            title: 'Okay',
            onPress: () => {
              incorrectPasswordRef.current.hideAlert();
            },
          },
        ]}
      />

      <View style={styles.formBox}>
        <Text style={styles.lionsgateLogo}>LIONSGATE</Text>
        <Text style={styles.playLogo}>PLAY</Text>
        <Text style={styles.quote}>Explore movies, series and more</Text>
        <Formik
          initialValues={{email: '', password: ''}}
          onSubmit={({email, password}) => {
            let userData = ''
            let emailfound = false;
            let passwordMatched = false;
            state.users.forEach(i => {
              if (i.email === email) {
                emailfound = true;
                if (i.password === password) {
                  passwordMatched = true;
                  userData = i;
                } else {
                  incorrectPasswordRef.current.showAlert();
                }
              }
            });
            if (!emailfound) {
              detailNotFoundRef.current.showAlert();
            } 
            else if (emailfound && passwordMatched) {
              dispatch(signIn(userData))
            }
            
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
              <View style={styles.inputContainer}>
                <Animated.Text
                  onPress={() => {
                    emailRef.current.focus();
                  }}
                  style={[
                    styles.animatedText,
                    {
                      top: valueForEmail,
                      fontSize: valueForEmail.interpolate({
                        inputRange: [-25, 0],
                        outputRange: [normalize(14), normalize(18)],
                      }),
                      color: valueForEmail.interpolate({
                        inputRange: [-25, 0],
                        outputRange: [white, grey],
                      }),
                    },
                  ]}>
                  Email Address
                </Animated.Text>

                <TextInput
                  ref={emailRef}
                  placeholder={'name@example.com'}
                  placeholderTextColor={grey}
                  onFocus={animateEmailText}
                  onChangeText={handleChange('email')}
                  onBlur={(handleBlur('email'), animateBackEmailText)}
                  value={values.email}
                  style={styles.input}
                />
              </View>

              <Text style={styles.errorText}>
                {touched.email && errors.email}
              </Text>
              <View style={styles.inputContainer}>
                <Animated.Text
                  onPress={() => {
                    passwordRef.current.focus();
                  }}
                  style={[
                    styles.animatedText,
                    {
                      top: valueForPassword,
                      fontSize: valueForPassword.interpolate({
                        inputRange: [-25, 0],
                        outputRange: [normalize(14), normalize(18)],
                      }),
                      color: valueForPassword.interpolate({
                        inputRange: [-25, 0],
                        outputRange: [white, grey],
                      }),
                    },
                    {width: '90%'},
                  ]}>
                  Password
                </Animated.Text>
                <View style={styles.passBox}>
                  <TextInput
                    ref={passwordRef}
                    placeholder={'Minimum 6 characters'}
                    placeholderTextColor={grey}
                    secureTextEntry={hidePass}
                    onFocus={animatePasswordText}
                    onChangeText={handleChange('password')}
                    onBlur={(handleBlur('password'), animateBackPasswordText)}
                    value={values.password}
                    style={styles.passInput}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setHidePass(!hidePass);
                    }}>
                    {hidePass ? (
                      <Icon name="eye-off-outline" size={20} color={white} />
                    ) : (
                      <Icon name="eye-outline" size={20} color={white} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={styles.errorText}>
                {touched.password && errors.password}
              </Text>
              <TouchableOpacity
                style={styles.forgotPassTouch}
                onPress={() => {
                  props.navigation.navigate('ForgetPassword');
                }}>
                <Text style={styles.forgetPassText}>Forgot your password?</Text>
              </TouchableOpacity>
              <CustomButton
                title="LOG IN"
                onPress={handleSubmit}
                style={{marginTop: normalize(50)}}
              />
            </View>
          )}
        </Formik>
        <View style={styles.signupBox}>
          <Text style={styles.quote}>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('SignupFirst');
            }}>
            <Text style={styles.forgetPassText}> Sign up</Text>
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
    fontWeight: 'bold',
    fontSize: normalize(18),
    color: white,
  },
  playLogo: {
    fontSize: normalize(20),
    color: '#aaa',
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
    backgroundColor: '#000',
  },
  passInput: {
    fontSize: vh(18),
    fontWeight: 'bold',
    color: white,
    paddingVertical: vh(5),
    backgroundColor: '#000',
    flexGrow: 1,
  },
  passBox: {
    flexDirection: 'row',
  },
  signupBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  animatedText: {
    color: grey,
    paddingBottom: vh(10),
    fontSize: vh(18),
    position: 'absolute',
    top: 0,
    zIndex: 1,
    backgroundColor: '#000',
    width: '100%',
    height: '100%',
  },
  inputContainer: {
    borderBottomWidth: vh(1),
    borderBottomColor: '#fff',
    marginVertical: vh(10),
  },
});

export default Login;
