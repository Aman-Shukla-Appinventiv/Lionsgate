import React from 'react';
import { SafeAreaView } from "react-native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomTabBar from './components/CustomTabBar';
import HomeRouter from './screens/HomeRouter';
import Search from './screens/Search';
import Downloads from './screens/Downloads';
import WatchList from './screens/WatchList';
import More from './screens/More';

const Tab = createBottomTabNavigator();

function Router(props) {
  return (
    <SafeAreaView style = {{backgroundColor: "black", flex: 1}}>
      <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}
      initialRouteName = "Home">
        <Tab.Screen name="Home" component={HomeRouter} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Downloads" component={Downloads} />
        <Tab.Screen name="WatchList" component={WatchList} />
        <Tab.Screen name="More" component={More} />
      </Tab.Navigator>
      </SafeAreaView>
  );
}
export default Router;
