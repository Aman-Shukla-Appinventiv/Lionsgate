import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Movie from './Movie';
import TvShow from './TvShow';
import {useSelector} from 'react-redux';
import {normalize, vh, vw} from '../dimension';
import CustomButton from '../components/CustomButton';
import MoviesList from '../components/MoviesList';
import {createStackNavigator} from '@react-navigation/stack';
const DownloadStack = createStackNavigator();

export default function Downloads(props) {
  return (
    <DownloadStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Downloads">
      <DownloadStack.Screen name="Downloads" component={DownloadsScreen} />
      <DownloadStack.Screen name="Movie" component={Movie} />
      <DownloadStack.Screen name="TvShow" component={TvShow} />
    </DownloadStack.Navigator>
  );
}

function DownloadsScreen(props) {
  const Downloads = useSelector(
    state => state.Downloads_N_WatchlistReducer.Downloads,
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Downloads</Text>
      </View>
      {Downloads.length == 0 ? (
        <View style={styles.noDownloadBox}>
          <Icon name="download-outline" size={normalize(80)} color="white" />
          <Text
            style={{
              color: 'white',
              marginVertical: normalize(16),
              textAlign: 'center',
            }}>
            Movies and Shows that you download will appear here.
          </Text>
          <CustomButton
            title="Download to Watch Offline"
            onPress={() => {
              props.navigation.navigate('Home');
            }}
          />
        </View>
      ) : (
        <MoviesList data={Downloads} type="Downloads" />
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
  scroll: {
    flex: 1,
  },
});
