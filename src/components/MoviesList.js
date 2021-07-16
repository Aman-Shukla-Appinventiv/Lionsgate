import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native';
import {normalize, vh, vw} from '../dimension';
import Icon from 'react-native-vector-icons/Ionicons';
import { removeDownload, removeWatchlist } from '../redux/actions';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

export default function MoviesList(props) {
  const navigation  = useNavigation()
  const dispatch = useDispatch()
  const baseUrl = 'https://image.tmdb.org/t/p/w500';  

  const handleRemove = (item) => {
    console.log("value of item : ", item)
    if(props.type == "Downloads")
    {
      dispatch(removeDownload(item.id))
    }
    else if(props.type == "Watchlist")
    {
      dispatch(removeWatchlist(item.id))
    }
    else if(props.type == "Seasons")
    {
      dispatch(addDownload({}))
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.scroll}
    showsVerticalScrollIndicator = {false}
    >
      {props.data.map(item => {
        return (
          <TouchableOpacity
            key={Math.random().toString() + Math.random().toString()}
            style={styles.box}
            onPress = {() => {navigation.navigate("Movie",{id: item.id})}}
            >
            <View style={styles.imageBox}>
              <Image
                style={styles.image}
                source={{uri: baseUrl + item.backdrop_path}}
              />
            </View>

            <View style={styles.colBox}>
              <View style={styles.titleRow}>
                <Text style={styles.title}>{item.title}</Text>
                <TouchableOpacity onPress = {() => {handleRemove(item)}}>
                <Icon name="trash-outline" size={normalize(20)} color="white" />
                </TouchableOpacity>
                
              </View>
              <Text numberOfLines = {3} style={styles.overview}>{item.overview}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  scroll: {
    padding: normalize(20),
  },
  box: {
    flexDirection: 'row',
    marginVertical: vh(10) 
  },
  colBox: {
    paddingHorizontal: vw(10),
    flex: 3,
    justifyContent: "space-evenly"
  },
  imageBox: {
    flex: 2,
  },
  image: {
    height: vh(130),
    width: "100%"
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  title: {
    color: 'white',
    fontSize: normalize(14),
    fontWeight: 'bold',
  },
  overview: {
    color: '#ccc',
    fontSize: normalize(12)
  },
});
