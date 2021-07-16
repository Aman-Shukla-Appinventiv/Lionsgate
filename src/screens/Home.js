import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Row from '../components/Row';
import {homeAPI} from '../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {request_paths} from '../assets/index';
import {screenWidth, vh} from '../dimension';
import NetInfo from '@react-native-community/netinfo';
import CustomAlert from '../components/CustomAlert';
import ImageSlider from '../components/ImageSlider';
import { red } from '../assets/Colors';

const images = [
  {
    img: 'https://davebrendon.files.wordpress.com/2015/02/dracula-untold-poster.jpg',
    text: null,
    id: 49017,
    media_type: "movie"
  },
  {
    img: 'https://m.media-amazon.com/images/M/MV5BMjA4NzkxNzc5Ml5BMl5BanBnXkFtZTgwNzQ3OTMxMTE@._V1_UY1200_CR90,0,630,1200_AL_.jpg',
    text: null,
    id: 222935,
    media_type: "movie"
  },
  {
    img: 'https://c4.wallpaperflare.com/wallpaper/346/408/886/white-gorilla-5k-rampage-dwayne-johnson-wallpaper-preview.jpg',
    text: null,
    id: 427641,
    media_type: "movie"
  },
  {
    img: 'https://i0.wp.com/thefutureoftheforce.com/wp-content/uploads/2021/05/Marvel-Studios-Loki-Poster.jpg?resize=474%2C702&ssl=1',
    text: null,
    id: 84958,
    media_type: "tv"
  },
  {
    img: 'https://www.northeasttoday.in/assets/resources/2020/07/dil-bechara3.jpg',
    text: null,
    id: 645484,
    media_type: "movie"
  },
  {
    img: 'https://www.arthipo.com/image/cache/catalog/poster/movie/1-758/pfilm686-gravity_ae13a97f-movie-film-posteri-1000x1000.jpg',
    text: null,
    id: 49047,
    media_type: "movie"
  },
];

export default function Home(props) {
  const internetAlertref = useRef(null);
  let startpoint = 0
  const dispatch = useDispatch();
  const state = useSelector(state => state.HomeApiReducer);
  const checkConnection = () => {
    NetInfo.fetch().then(state => {
      if (state.isInternetReachable) {
        dispatch(
          homeAPI([
            request_paths.trending,
            request_paths.toprated,
            request_paths.popular,
            request_paths.actionMovies,
            request_paths.comedyMovies,
            request_paths.documentries,
            request_paths.horrorMovies,
            request_paths.romanceMovies,
            request_paths.adventureMovie,
            request_paths.animationMovie,
            request_paths.crimeMovie,
            request_paths.dramaMovie,
            request_paths.familyMovie,
            request_paths.fantasyMovie,
          ]),
        );
      }
      else{
        internetAlertref.current.showAlert();
      }
    });
  };
  useEffect(() => {
    checkConnection()

  }, []);

const  onScroll = (event) => {
  const currentOffset = event.nativeEvent.contentOffset.y;
  const dif = currentOffset - startpoint;  

  if (dif > 0) {
    props.navigation.setOptions({tabBarVisible: false})
  } 
} 
  const renderData = ({item, index}) => (
    <Row data = {item} level = "one" index = {index} navigation={props.navigation} inside={'Movies'} />
  );
  if (state.isLoading) {
    return (
      <View style={styles.dataLoading}>
        <ActivityIndicator size="large" color = {red} />
      </View>
    );
  } else {
    return (
      <View style={styles.mainContainer}>
        <CustomAlert
          ref = {internetAlertref}
          title="No Internet ?"
          message="Check you internet Connection and try again"
          buttons={[
            
            {
              type: 'positive',
              title: 'Okay',
              onPress: () => {
                internetAlertref.current.hideAlert()
            },
            },
          ]}
        />
        <FlatList
        onScrollBeginDrag = {(event) => {
          startpoint = event.nativeEvent.contentOffset.y
        }}
        onScroll={(e) => onScroll(e)}
        onMomentumScrollEnd = {() => {props.navigation.setOptions({tabBarVisible: true})}}
          showsVerticalScrollIndicator={false}
          refreshing = {false}
          onRefresh = {() => {
            checkConnection()
          }}
          data={state.Home}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderData}
          bounces={false}
          ListHeaderComponent={
            <ImageSlider
              images={images}
              style={styles.imageSlider}
              type="Movies"
              navigation={props.navigation}
            />
          }
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  dataLoading: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  imageSlider: {
    height: vh(600),
    width: screenWidth,
  },
});
