import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Image,
} from 'react-native';
import {red} from '../assets/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {normalize, vh, vw} from '../dimension';
import { createStackNavigator } from "@react-navigation/stack";
import {useDispatch, useSelector} from 'react-redux';
import Movie from './Movie';
import TvShow from './TvShow';
import NetInfo from '@react-native-community/netinfo';
import CustomAlert from '../components/CustomAlert';
import {SearchCalling, search} from '../redux/actions';
const baseUrl = 'https://image.tmdb.org/t/p/w500';

const searchStack = createStackNavigator();

export default function Search(props) {
  const internetAlertref = useRef(null);
  return (
      <searchStack.Navigator
      screenOptions = {{
        headerShown: false
      }}
      initialRouteName = "Search"
      >
        <searchStack.Screen name = "Search" component = {SearchScreen}  />
        <searchStack.Screen name="Movie" component={Movie} />
        <searchStack.Screen name="TvShow" component={TvShow} />
      </searchStack.Navigator>
    );
  }


const Header = ({state}) => {
  if (state.apiCalled && state.Data.total_results == 0) {
    return <Text style={styles.noResult}>No Results Found</Text>;
  }
  return null;
};

function SearchScreen(props) {
  const internetAlertref = useRef(null);
  const [keyword, setKeyword] = useState();
  const dispatch = useDispatch();
  const state = useSelector(state => state.SearchReducer);

  const checkConnection = () => {
    NetInfo.fetch().then(state => {
      if (state.isInternetReachable) {
        const arr = keyword.split(' ');
    const newKeyword = arr.join('%20');
    dispatch(SearchCalling());
    dispatch(search({keyword: newKeyword}));
      }
      else{
        internetAlertref.current.showAlert();
      }
    });
  };
  const handleTextChange = text => {
    setKeyword(text);
  };
  const handleSearch = () => {
    checkConnection()
  };
  const rednerData = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.touch}
        onPress={() => {
          if (item.media_type === 'movie') {
            props.navigation.push('Movie', {id: item.id});
          } else if (item.media_type === 'tv') {
            props.navigation.push('TvShow', {id: item.id});
          }
        }}>
        <Image
          style={styles.image}
          source={{uri: baseUrl + item.poster_path}}
        />
      </TouchableOpacity>
    );
  };
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
      <View style={styles.searchBox}>
        <TouchableOpacity onPress={handleSearch}>
          <Icon name="search-outline" size={normalize(20)} color="#ccc" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={keyword}
          onChangeText={handleTextChange}
          placeholder="Movies, Shows, People, Genres,..."
          placeholderTextColor="#ccc"
        />
      </View>
      {state.isLoading ? (
        <ActivityIndicator size="large" color={red} />
      ) : (
        <FlatList
          data={state.Data.results}
          ListHeaderComponent={<Header state={state} />}
          numColumns={2}
          keyExtractor={item => item.id.toString()}
          renderItem={rednerData}
          contentContainerStyle={styles.flatlist}
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
  searchBox: {
    flexDirection: 'row',
    marginTop: vh(33),
    margin: vw(10),
    padding: normalize(5),
    borderWidth: normalize(1),
    borderColor: '#ccc',
    borderRadius: normalize(5),
    alignItems: 'center',
  },
  input: {
    fontSize: normalize(16),
    padding: normalize(10),
    color: '#ccc',
  },
  image: {
    height: vh(170),
    width: vw(170),
  },
  touch: {
    margin: normalize(5),
  },
  flatlist: {
    paddingHorizontal: vw(10),
    alignItems: 'center',
  },
  noResult: {
    fontSize: normalize(30),
    color: '#aaa',
  },
});
