import React, { useRef } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {normalize, vh, vw} from '../dimension';
import {useDispatch, useSelector} from 'react-redux';
import {signout, unSubscribe} from '../redux/actions';
import CustomAlert from '../components/CustomAlert';
import { createStackNavigator } from '@react-navigation/stack';
import Accounts from './Accounts'
import DownloadPreferences from './DownloadPreferences';
import Legal from './Legal';
import ContactUs from './ContactUs';
import Terms from './Terms';
import Policies from './Policies';

const moreStack = createStackNavigator();

export default function More(props)
{
  return(
    <moreStack.Navigator initialRouteName = "MoreScreen">
      <moreStack.Screen name = "MoreScreen" component = {MoreScreen} />
      <moreStack.Screen name = "Accounts" component = {Accounts} />
      <moreStack.Screen name = "DownloadPreferences" component = {DownloadPreferences} />
      <moreStack.Screen name = "Legal" component = {Legal} />
      <moreStack.Screen name = "ContactUs" component = {ContactUs} />
      <moreStack.Screen name = "Terms" component = {Terms} />
      <moreStack.Screen name = "Policies" component = {Policies} />
    </moreStack.Navigator>
  )
}

function MoreScreen(props) {
  const logoutRef = useRef(null);
  const unSubscribeRef = useRef(null);
  const dispatch = useDispatch();
  const state = useSelector(state => state.authReducer)
  return (
    <View style={styles.mainContainer}>
      <CustomAlert
          ref = {logoutRef}
          title="LOG OUT"
          message="Are you sure you want to log out ?"
          buttons={[
            {
              type: 'negative',
              title: 'NO',
              onPress: () => { logoutRef.current.hideAlert()},
            },
            {
              type: 'positive',
              title: 'YES',
              onPress: () => {
                dispatch(signout());
                logoutRef.current.hideAlert()
                props.navigation.popToTop();
              },
            },
          ]}
        />
        <CustomAlert
          ref = {unSubscribeRef}
          title="UNSUBSCRIBE SERVICES"
          message="Are you sure you want to Unsubscribe Services?"
          buttons={[
            {
              type: 'negative',
              title: 'NO',
              onPress: () => { unSubscribeRef.current.hideAlert()},
            },
            {
              type: 'positive',
              title: 'YES',
              onPress: () => {
                dispatch(unSubscribe())
                unSubscribeRef.current.hideAlert()
              },
            },
          ]}
        />
        {state.userLoggedIn 
        ? <TouchableOpacity 
        onPress = {() => {props.navigation.navigate("Accounts")}}
        key = {(Math.random()+Math.random()).toString()}
         style={styles.row}>
        <Text style = {styles.text}>Account</Text>
        <Icon
          name="chevron-forward-outline"
          size={normalize(20)}
          color="white"
        />
      </TouchableOpacity> : null}
      
      {state.userLoggedIn 
      ? <TouchableOpacity
      onPress = {() => {props.navigation.navigate("DownloadPreferences")}}
        key = {(Math.random()+Math.random()).toString()}
        style={styles.row}>
        <Text style = {styles.text}>Download Preferences</Text>
        <Icon
          name="chevron-forward-outline"
          size={normalize(20)}
          color="white"
        />
      </TouchableOpacity> : null}
      
      {state.subscription
       ? <TouchableOpacity key = {(Math.random()+Math.random()).toString()} 
       style={styles.row} 
       onPress = {() => {unSubscribeRef.current.showAlert()}}>
        <Text style = {styles.text}>Unsubscribe Services</Text>
        <Icon
          name="chevron-forward-outline"
          size={normalize(20)}
          color="white"
        />
      </TouchableOpacity> : null}
      
      <TouchableOpacity 
      onPress = {() => {props.navigation.navigate("Legal")}}
      key = {(Math.random()+Math.random()).toString()} 
      style={styles.row}>
        <Text style = {styles.text}>Legal</Text>
        <Icon
          name="chevron-forward-outline"
          size={normalize(20)}
          color="white"
        />
      </TouchableOpacity>
      <TouchableOpacity 
      onPress = {() => {props.navigation.navigate("ContactUs")}}
      key = {(Math.random()+Math.random()).toString()} 
      style={styles.row}>
        <Text style = {styles.text}>Contact Us</Text>
        <Icon
          name="chevron-forward-outline"
          size={normalize(20)}
          color="white"
        />
      </TouchableOpacity>
      
      {state.userLoggedIn ? <TouchableOpacity
       key = {(Math.random()+Math.random()).toString()}
        style={styles.row}
        onPress={() => {
          logoutRef.current.showAlert()
        }}>
      
        <Text style = {styles.text}>Log Out</Text>
        <Icon
          name="chevron-forward-outline"
          size={normalize(20)}
          color="white"
        />
      </TouchableOpacity>
       :<TouchableOpacity
       key = {(Math.random()+Math.random()).toString()}
        style={styles.row}
        onPress={() => {
          props.navigation.navigate("Login")
        }}>
      
        <Text style = {styles.text}>Log In</Text>
        <Icon
          name="chevron-forward-outline"
          size={normalize(20)}
          color="white"
        />
        </TouchableOpacity>}
      
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#000",
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
});
