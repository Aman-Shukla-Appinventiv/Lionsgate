import React, {useRef, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {normalize, vh, vw} from '../dimension';
import MoviesList from '../components/MoviesList';
import CustomButton from '../components/CustomButton';
import CustomAlert from '../components/CustomAlert';
import Movie from './Movie';
import TvShow from './TvShow';
import {createStackNavigator} from '@react-navigation/stack';
const watchlistStack = createStackNavigator();

export default function WatchList(props) {
  return (
    <watchlistStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="WatchList">
      <watchlistStack.Screen name="WatchList" component={WatchListScreen} />
      <watchlistStack.Screen name="Movie" component={Movie} />
      <watchlistStack.Screen name="TvShow" component={TvShow} />
    </watchlistStack.Navigator>
  );
}

function WatchListScreen(props) {

  const state = useSelector(state => state.authReducer);
  const ref = useRef(null);
  const Watchlist = useSelector(
    state => state.Downloads_N_WatchlistReducer.WatchList,
  );
  if(state.useLoggedIn)
  {
    ref.current.showAlert();
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Watchlist</Text>
        <CustomAlert
          ref={ref}
          title="Sign up & enjoy a trial of up to 14 day free"
          message=""
          buttons={[
            {
              type: 'negative',
              title: 'LOG IN',
              onPress: () => {
                props.navigation.navigate('Login');
                ref.current.hideAlert();
              },
            },
            {
              type: 'positive',
              title: 'SIGN UP',
              onPress: () => {
                props.navigation.navigate('SignupFirst');
                ref.current.hideAlert();
              },
            },
          ]}
        />
      </View>
      {Watchlist.length == 0 ? (
        <View style={styles.noDownloadBox}>
          <Icon name="add-circle-outline" size={normalize(80)} color="white" />
          <Text style={styles.msg}>
            Add your Favourite Movies and Shows to your Watchlist
          </Text>
          <CustomButton
            title="Browse to Watch Later"
            onPress={() => {
              props.navigation.navigate('Home');
            }}
          />
        </View>
      ) : (
        <MoviesList
          data={Watchlist}
          type="Watchlist"
          navigation={props.navigation}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    marginTop: vh(30),
    paddingLeft: vw(20),
  },
  headerText: {
    color: 'white',
    fontSize: normalize(20),
    fontWeight: 'bold',
  },
  noDownloadBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: normalize(50),
  },
  msg: {
    color: 'white',
    marginVertical: normalize(16),
    textAlign: 'center',
  },
});
