import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import Router from './src/Router'
import Splash from './src/screens/Splash';
import Login from './src/screens/Login';
import ForgetPassword from './src/screens/ForgetPassword';
import RecoveryEmailSent from './src/screens/RecoverEmailSent';
import SignupFirst from './src/screens/SignupFirst';
import SignupSecond from './src/screens/SignupSecond';
import Terms from './src/screens/Terms';
import Policies from './src/screens/Policies';
import Subscribe from './src/screens/Subscribe';
import Carousel from './src/screens/Carousel';
import Movie from './src/screens/Movie';
import TvShow from './src/screens/TvShow';
import Play from './src/screens/Play';
import {store} from './src/redux/store'
import { Provider } from 'react-redux';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store = {store}>
      <SafeAreaProvider>
    <NavigationContainer theme = {{colors: {background: "#000"}}}>
    <Stack.Navigator
    initialRouteName = "Splash"
    screenOptions = {{
      headerShown: false
    }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="RecoveryEmailSent" component={RecoveryEmailSent} />
      <Stack.Screen name="SignupFirst" component={SignupFirst} />
      <Stack.Screen name="SignupSecond" component={SignupSecond} />
      <Stack.Screen name="Terms" component={Terms} />
      <Stack.Screen name="Policies" component={Policies} />
      <Stack.Screen name="Subscribe" component={Subscribe} />
      <Stack.Screen name="Carousel" component={Carousel} />
      <Stack.Screen name="Movie" component={Movie} />
      <Stack.Screen name="TvShow" component={TvShow} />
      <Stack.Screen name="Play" component={Play} />
      <Stack.Screen name="Router" component={Router} />
      
    </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
    </Provider>
  );
}


