import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Row from '../components/Row';
import {red} from '../assets/Colors'
import { useSelector} from 'react-redux';
import {screenWidth, vh} from '../dimension';
import ImageSlider from '../components/ImageSlider';

const images = [
  {
    img: 'https://images.hdqwalls.com/download/2020-robert-pattison-new-batman-49-1280x2120.jpg',
    text: null
    ,id: 414906,
    media_type: "movie"
  },
  {
    img: 'https://miro.medium.com/max/2560/0*zNCsnFbnc6v26zGu.jpeg',
    text: null,
    id: 320288,
    media_type: "movie"
  },
  {
    img: 'http://static1.squarespace.com/static/5bf104429d5abbac28949891/5bf1171f4fa51adec12833a4/5c33de5088251ba3e307edd0/1550870552532/aquaman.jpg?format=1500w',
    text: null,
    id: 297802,
    media_type: "movie"
  },
  {
    img: 'https://i0.wp.com/thefutureoftheforce.com/wp-content/uploads/2021/05/Marvel-Studios-Loki-Poster.jpg?resize=474%2C702&ssl=1',
    text: null,
    id: 84958,
    media_type: "tv"
  },
  {
    img: 'https://wallpapercave.com/wp/wp4650886.jpg',
    text: null,
    id: 596650,
    media_type: "movie"
  },
  {
    img: 'https://www.arthipo.com/image/cache/catalog/poster/movie/1-758/pfilm686-gravity_ae13a97f-movie-film-posteri-1000x1000.jpg',
    text: null,
    id: 49047,
    media_type : "movie"
  }
];

export default function Home(props) {
  let startpoint = 0
  const state = useSelector(state => state.HomeApiReducer);

const  onScroll = (event) => {
  const currentOffset = event.nativeEvent.contentOffset.y;
  const dif = currentOffset - startpoint;  

  if (dif > 0) {
    props.navigation.setOptions({tabBarVisible: false})
  } 
} 
  const renderData = ({item, index}) => (
    <Row data = {item} level = "one"  index = {index} navigation={props.navigation} inside={'Movies'} />
  );
  if (state.isLoading) {
    return (
      <View style={styles.dataLoading}>
        <ActivityIndicator size="large" color = {red}/>
      </View>
    );
  } else {
    return (
      <View style={styles.mainContainer}>
        <FlatList
        onScrollBeginDrag = {(event) => {
          startpoint = event.nativeEvent.contentOffset.y
        }}
        onScroll={(e) => onScroll(e)}
        onMomentumScrollEnd = {() => {props.navigation.setOptions({tabBarVisible: true})}}
          showsVerticalScrollIndicator={false}
          data={state.Home}
          refreshing = {false}
          onRefresh = {() => {}}
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
