import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {normalize, vh, vw} from '../dimension';
import {useNavigation} from '@react-navigation/native';
import Icon from "react-native-vector-icons/Ionicons"

export default function Episodes(props) {
  const navigation = useNavigation();
  const baseUrl = 'https://image.tmdb.org/t/p/w500';

  return (
    <ScrollView
      contentContainerStyle={styles.scroll}
      showsVerticalScrollIndicator={false}>
      {props.data.map(item => {
        return (
            <TouchableOpacity
            key={(Math.random()+Math.random()).toString()}
            style={styles.box}
            onPress={() => {
              navigation.navigate('Play');
            }}>
            <View style={styles.imageBox}>
              <ImageBackground
                style={styles.image}
                source={{uri: baseUrl + item.still_path}}
              >
                  <Icon name = "play-circle" size = {normalize(35)} color = "rgba(100,100,100,0.8)"/>


              </ImageBackground>
            </View>

            <View style={styles.colBox}>
              <Text style={styles.title}>{item.name}</Text>
              <Text numberOfLines={3} style={styles.overview}>
                {item.overview}
              </Text>
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
    marginVertical: vh(10),
  },
  colBox: {
    paddingHorizontal: vw(10),
    flex: 3,
    justifyContent: 'space-evenly',
  },
  imageBox: {
    flex: 3,
  },
  image: {
    height: vh(80),
    width: '100%',
    justifyContent: "center",
    alignItems: "center"
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: 'white',
    fontSize: normalize(14),
    fontWeight: 'bold',
  },
  overview: {
    color: '#ccc',
    fontSize: normalize(12),
  },
});
