import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  RefreshControl,
  ToastAndroid
} from 'react-native';
import { baseUrl } from '../assets';
import {grey, white} from '../assets/Colors';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {movieDetails, addDownload, addWatchlist} from '../redux/actions';
import {normalize, vh, vw} from '../dimension';
import CustomButton from '../components/CustomButton';
import Row from '../components/Row';
import CustomAlert from '../components/CustomAlert';
import SeasonListing from '../components/SeasonListing';



export default function TvShow(props) {
  const ref = useRef(null);
  const authState = useSelector(state => state.authReducer)
const state = useSelector(state => state.MovieTvReducer);
  const dispatch = useDispatch();
  let desc = [];
  let lang = [];
  const id = props.route.params.id
  const url =
    'https://api.themoviedb.org/3/tv/' +
    id +
    '?api_key=8a869e5388c886cce43c72cff4147cbc&language=en-US';
    
    const similarMoviesURL = 'https://api.themoviedb.org/3/tv/'+id+'/similar?api_key=8a869e5388c886cce43c72cff4147cbc&language=en-US&page=1'



  useEffect(() => {
    dispatch(movieDetails({api: url, similar: similarMoviesURL}));
  }, []);
  const onRefresh = () => {
    dispatch(movieDetails({api: url, similar: similarMoviesURL}));
  }
  const showDownloadToast = () => {
    ToastAndroid.show("Added to Downloads ", ToastAndroid.LONG);
  }
  const showWatchlistToast = () => {
    ToastAndroid.show("Added to Watchlist ", ToastAndroid.LONG);
  }



  if (state.isLoading) {
    return (
      <View style={styles.mainContainer}>
        <Image
          style={styles.image}
          source={require('../assets/image/LionsgateLogo.jpeg')}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress = {() => {props.navigation.navigate("TopTabHome")}}>
        <Icon name="arrow-back" size={normalize(30)} color={white} />
        </TouchableOpacity>
        <ScrollView
        showsVerticalScrollIndicator = {false}
        refreshControl = {
        <RefreshControl
        refreshing = {false}
        onRefresh={onRefresh}
      />}>
        <Image
          style={styles.poster}
          source={{uri: baseUrl + state.Data.backdrop_path}}
        />
         <CustomAlert
          ref = {ref}
          title="Sign up & enjoy a trial of up to 14 day free"
          message=""
          buttons={[
            {
              type: 'negative',
              title: 'LOG IN',
              onPress: () => { 
                props.navigation.navigate("Login")
                ref.current.hideAlert()
              },
            },
            {
              type: 'positive',
              title: 'SIGN UP',
              onPress: () => {
                props.navigation.navigate("SignupFirst")
                ref.current.hideAlert()
            },
            },
          ]}
        />
        <View style={styles.body}>
          <Text style={styles.movieTitle}>{state.Data.name}</Text>
          {state.Data.genres.forEach(element => desc.push(element.name))}
          <Text style={styles.greyText}>
            A | {desc.join(', ')} | {state.Data.number_of_seasons} Seasons |{' '}
            {state.Data.number_of_episodes} Episodes | {state.Data.vote_average} IMDB Rating |{' '}
            {state.Data.first_air_date}
          </Text>
          <CustomButton title="Play" onPress={() => {props.navigation.navigate("Play")}} />
          <Text style={styles.whiteText}>
            Synopsis:{' '}
            <Text style={styles.greyText}>{state.Data.overview}</Text>
          </Text>
          {state.Data.spoken_languages.forEach(element =>
            lang.push(element.english_name),
          )}
          <Text style={styles.whiteText}>
            Languages: <Text style={styles.greyText}>{lang.join(', ')}</Text>
          </Text>


          <View style={styles.btns}>
            <TouchableOpacity style = {styles.touch}>
              <Icon name = "film-outline" size = {normalize(25)} color = {"white"} />
              <Text style = {styles.btnText}>Trailer</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.touch} onPress = {() => {
              if(authState.subscription)
              {
                dispatch(addWatchlist(state.Data))
                showWatchlistToast()
                
              }
              else {
                ref.current.showAlert()
              }
              
              }}>
            <Icon name = "add-circle-outline" size = {normalize(25)} color = {"white"} />
              <Text style = {styles.btnText}>Watchlist</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.touch}>
            <Icon name = "share-social-outline" size = {normalize(25)} color = {"white"} />
              <Text style = {styles.btnText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.touch} onPress = {() => {
              if(authState.subscription)
              {
                dispatch(addDownload(state.Data))
                showDownloadToast()
                
              }
              else {
                ref.current.showAlert()
              }
              
              }}>
            <Icon name = "download-outline" size = {normalize(25)} color = {"white"} />
              <Text style = {styles.btnText}>Download</Text>
            </TouchableOpacity>

          </View>
          <SeasonListing id = {state.Data.id}  seasons = {state.Data.number_of_seasons}  />
          <Text style={styles.heading}>More like this</Text>
          <Row data = {state.Similar} level="two"  navigation = {props.navigation} inside = {"Shows"}/>


        </View>
        </ScrollView> 
      </View>
    );
  }
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: vh(30),
    paddingHorizontal: vw(20),
    backgroundColor: '#000',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: "center"
  },
  poster: {
    width: '100%',
    height: vh(200),
    marginVertical: vh(20),
  },
  body: {
    paddingHorizontal: vw(10),
  },
  movieTitle: {
    fontSize: normalize(14),
    fontWeight: 'bold',
    color: white,
    marginVertical: normalize(2),
  },
  whiteText: {
    fontSize: normalize(14),
    color: white,
    marginVertical: normalize(2),
  },
  greyText: {
    color: '#aaa',
    fontSize: normalize(14),
    marginVertical: normalize(2),
  },
  btns: {
      flexDirection: "row",
      paddingVertical: normalize(10),
      alignItems: "center"
  },
  touch: {
      margin: normalize(10),
      alignItems: "center"
  },
  btnText: {
      color: "white",
      fontSize: normalize(12),
      fontWeight: "bold",
      marginTop: vh(10)
  },
  heading: {
    color: 'white',
    fontSize: normalize(16),
    fontWeight: 'bold',
  },
});
