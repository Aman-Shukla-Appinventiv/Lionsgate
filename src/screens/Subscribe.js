import React, {useRef} from 'react';
import {View, Text, StyleSheet, ImageBackground, TextInput, ToastAndroid} from 'react-native';
import {black, grey, white, red} from '../assets/Colors';
import {normalize, screenWidth, vh} from '../dimension';
import CustomButton from '../components/CustomButton';
import SubscribeCard from '../components/SubscribeCard';
import CustomAlert from '../components/CustomAlert';
import { useDispatch, useSelector } from 'react-redux';
import { subscribe } from '../redux/actions';
import {Formik} from 'formik';
import * as yup from 'yup';

export default function Subscribe(props) {
  const dispatch = useDispatch()
  const state = useSelector(state => state.authReducer)
  const ref = useRef(null);
  const schema = yup.object({
    voucher: yup.string().min(6, 'Invalid code').max(6, 'Invalid code'),
  });
  return (
    <View style={styles.maincontainer}>
      <CustomAlert
          ref = {ref}
          title="You can pay later through the settings screen"
          message=""
          buttons={[
            {
              type: 'negative',
              title: 'CANCEL',
              onPress: () => { ref.current.hideAlert()},
            },
            {
              type: 'positive',
              title: 'SKIP',
              onPress: () => {
                props.navigation.navigate('Router');
                ref.current.hideAlert()
            },
            },
          ]}
        />
      <View style={styles.header}>
        <Text
          style={styles.skipBtn}
          onPress={() => {
            ref.current.showAlert()
          }}>
          SKIP
        </Text>
      </View>

      <ImageBackground
        source={require('../assets/image/subBG.jpeg')}
        style={styles.imagebackground}>
        <View style={styles.formBox}>
          <Text style={styles.h1Text}>Choose Your Plan</Text>
          <View style={styles.paymentCards}>
            <SubscribeCard type = {"normal"} price = "99" period = "Monthly" />
            <SubscribeCard type = {"offer"} price = "699" period = "Annually"/>
          </View>
          <Formik
            initialValues={{voucher: ''}}
            onSubmit={values => {
              dispatch(subscribe())
              ToastAndroid.show("Subscription Activated ", ToastAndroid.LONG);
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
              <View>
                <TextInput
                  placeholder={'Voucher Code'}
                  placeholderTextColor={grey}
                  onChangeText={handleChange('voucher')}
                  onBlur={handleBlur('voucher')}
                  value={values.voucher}
                  style={styles.input}
                />
                <Text style={styles.errorText}>
                  {touched.voucher && errors.voucher}
                </Text>
                <Text style={styles.quote}>Subscribe now to get 14 day free trial</Text>
                <CustomButton
                  title="Subscribe"
                  onPress={handleSubmit}
                />
                <Text style = {styles.msg}>You would receive a reminder email closer to the end date of your Subscribtion period. Plan continues until cancelled.</Text>
              </View>
            )}
          </Formik>
        </View>
      </ImageBackground>
      <View style={styles.fotter}>
        <Text
          style={styles.skipBtn}
          onPress={() => {
            props.navigation.navigate('Router');
          }}>
          Need Help ?
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: black,
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  imagebackground: {
    flexGrow: 5,
  },
  formBox: {
    backgroundColor: 'rgba(0,0,0,0.85)',
    padding: vh(20),
    flex: 1,
  },
  h1Text: {
    fontSize: normalize(26),
    fontWeight: 'bold',
    color: white,
    alignSelf: 'center',
    margin: normalize(10),
  },
  paymentCards: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderBottomWidth: normalize(1),
    borderBottomColor: grey,
    paddingBottom: vh(20),
    marginBottom: vh(20)
  },
  quote: {
    marginTop: vh(10),
    fontSize: normalize(14),
    fontWeight: 'bold',
    color: white,
    textAlign: "center"
  },
  errorText: {
    marginTop: vh(10),
    color: red,
  },
  input: {
    paddingBottom: vh(20),
    fontSize: normalize(18),
    fontWeight: 'bold',
    color: white,
    borderBottomWidth: normalize(2),
    borderBottomColor: grey,
    marginVertical: vh(30),
  },
  msg: {
      color: white,
      fontWeight: "bold",
      fontSize: normalize(10)
  },
  skipBtn: {
    color: white,
    fontWeight: 'bold',
    margin: vh(20),
  },
  fotter: {
    flex: 1,
    alignItems: 'center',
  },
});
