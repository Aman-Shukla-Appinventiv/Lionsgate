import React, {useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Row from '../components/Row';
import {showAPI} from '../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {red} from "../assets/Colors"
import {request_paths} from '../assets/index';
import {normalize, screenWidth, vh} from '../dimension';
import NetInfo from '@react-native-community/netinfo';
import CustomAlert from '../components/CustomAlert';
import ImageSlider from '../components/ImageSlider';

const images = [
  {
    img: 'https://pbs.twimg.com/media/EWCsiLoXYAIkZAM.jpg',
    text: null,
    id: 82856,
    media_type: 'tv',
  },
  {
    img: 'https://1.bp.blogspot.com/-1Oe79VP1Nxw/YFxP5JjbJGI/AAAAAAAAAJ8/AYwVATYOzXUNSTql75x6CO8Koe_dCGp2ACPcBGAYYCw/s800/The%2BFalcon%2Band%2BThe%2BWinter%2BSoldier%2BPoster%2B-%2BDesktop%2BHD%2BWallpapers.jpg',
    text: null,
    id: 88396,
    media_type: 'tv',
  },
  {
    img: 'https://static.wikia.nocookie.net/thehundred/images/a/af/The_100_Season_7_poster.jpeg/revision/latest?cb=20200515172226',
    text: null,
    id: 48866,
    media_type: 'tv',
  },
  {
    img: 'https://images-na.ssl-images-amazon.com/images/I/91p4ABfxcJL._SL1500_.jpg',
    text: null,
    id: 62286,
    media_type: 'tv',
  },
  {
    img: 'https://i.pinimg.com/originals/a6/31/0e/a6310e7e16bb90a5de3559c474160508.png',
    text: null,
    id: 85271,
    media_type: 'tv',
  },
  {
    img: 'https://images-na.ssl-images-amazon.com/images/I/61boFr6SYZL._SL1000_.jpg',
    text: null,
    id: 71446,
    media_type: 'tv',
  },
];

export default function Shows(props) {
  const internetAlertref = useRef(null);
  let startpoint = 0
  const dispatch = useDispatch();
  const state = useSelector(state => state.ShowApiReducer);
  const checkConnection = () => {
    NetInfo.fetch().then(state => {
      if (state.isInternetReachable) {
        dispatch(
          showAPI([
            request_paths.adventure,
            request_paths.animation,
            request_paths.crime,
            request_paths.sciFi,
            request_paths.family,
            request_paths.fantasy,
            request_paths.drama,
            request_paths.mystery,
            request_paths.reality,
            request_paths.war,
            request_paths.western,
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
    <Row
      data={item}
      level="one"
      index={index}
      navigation={props.navigation}
      inside={'Shows'}
    />
  );
  if (state.isLoading) {
    return (
      <View style={styles.dataLoading}>
        <ActivityIndicator size="large" color={red} />
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
          data={state.Show}
          refreshing = {false}
          onRefresh = {() => {
            checkConnection()
          }}
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
