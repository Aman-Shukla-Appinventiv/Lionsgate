import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {red, grey, white} from '../assets/Colors';
import {vh, vw, normalize} from '../dimension';
import {Formik} from 'formik';
import * as yup from 'yup';
import CustomButton from '../components/CustomButton';

export default function ContactUs(props) {
  const emailRef = React.createRef();
  const valueForEmail = useRef(new Animated.Value(0)).current;
  const schema = yup.object({
    email: yup.string().required('Required').email('Invalid email'),
    comment: yup.string().required('Required'),
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

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.goBack();
          }}>
          <Icon name="arrow-back" size={normalize(30)} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Contact Us</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>Get In Touch</Text>
        <Text style={styles.msg}>
          Want to get in touch? For any grievances with respect to suitability
          of content made available on Lionsgate Play, kindly write to (THIS IS
          ONLY FOR CONTENT-RELATED GRIEVANCES):{'\n'} {'\n'} Mr. Aman Shukla
          {'\n'} React native Developer{'\n'} aman.shukla@appinventiv.com
        </Text>

        <Formik
          initialValues={{email: '', comment: ''}}
          onSubmit={values => {
            alert(
              'Response Submitted we will contact you soon on '+values.email+ ' '
            );
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
                      outputRange: [normalize(12), normalize(18)],
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
              <TextInput
                placeholder={'Comment'}
                placeholderTextColor={grey}
                onChangeText={handleChange('comment')}
                onBlur={handleBlur('comment')}
                value={values.comment}
                style={styles.input}
              />
              </View>
              <Text style={styles.errorText}>
                {touched.email && errors.email}
              </Text>
              <CustomButton
                title="SUBMIT"
                onPress={handleSubmit}
                style={{marginTop: normalize(30)}}
              />
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  body: {
    padding: normalize(20),
  },
  header: {
    flexDirection: 'row',
    padding: normalize(5),
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: normalize(18),
    marginLeft: vw(10),
  },
  title: {
    color: white,
    fontSize: normalize(16),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  msg: {
    color: grey,
    fontSize: normalize(12),
    marginVertical: vh(15),
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
