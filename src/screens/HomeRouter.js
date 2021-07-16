import React from "react"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import Home from './Home'
import Shows from "./Shows";
import Movies from "./Movies";
import Movie from './Movie';
import TvShow from './TvShow';
import CustomTopTabBar from "../components/CustomTopTabBar";

const Tab = createMaterialTopTabNavigator();
const homeStack = createStackNavigator();


function HomeTabNavigation(props){
 
  return(
<Tab.Navigator
tabBar={props => <CustomTopTabBar {...props} />}
    initialRouteName = "Home"
    lazy = {true}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Shows" component={Shows} />
      <Tab.Screen name="Movies" component={Movies} />
    </Tab.Navigator>
  )
}

export default function HomeRouter(props) {
  return (
    <homeStack.Navigator
    screenOptions = {{
      headerShown: false
    }}
    initialRouteName = "TopTabHome"
    >
      <homeStack.Screen name = "TopTabHome" component = {HomeTabNavigation}  />
      <homeStack.Screen name="Movie" component={Movie} />
      <homeStack.Screen name="TvShow" component={TvShow} />
    </homeStack.Navigator>
  );
}