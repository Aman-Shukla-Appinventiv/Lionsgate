import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {HomeTitles, baseUrl} from '../assets/index';
import {vh, vw, normalize} from '../dimension';
import {grey, red, white} from '../assets/Colors';

export default function Row(props) {

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.heading}>{HomeTitles[props.index]}</Text>
      <ScrollView
        bounces={false}
        showsHorizontalScrollIndicator={false}
        horizontal>
        {props.data.map((element, index) => {
              return (
                <View
                  key={index}
                  style={
                    props.index == 5
                      ? styles.lionsOriginal
                      : styles.eachBoxNormal
                  }>
                  <TouchableOpacity
                    style={styles.image}
                    onPress={() => {
                      if(props.level == "one")
                      {
                        props.inside == 'Movies'
                        ? props.navigation.navigate('Movie', {id: element.id})
                        : props.inside == 'Shows'
                        ? props.navigation.navigate('TvShow', {id: element.id})
                        : null;
                      }
                      else {
                        props.inside == 'Movies'
                        ? props.navigation.replace('Movie', {id: element.id})
                        : props.inside == 'Shows'
                        ? props.navigation.replace('TvShow', {id: element.id})
                        : null;
                      }
                   
                    }}>
                    <Image
                      style={styles.image}
                      source={{uri: baseUrl + element.poster_path}}
                    />
                    {props.index == 0
                    ?<Text style = {styles.topTenBadge}>Top 10</Text>:null}
                  </TouchableOpacity>
                </View>
              );
            })}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    marginTop: vh(15),
    padding: vh(5),
  },
  heading: {
    color: 'white',
    fontSize: normalize(16),
    fontWeight: 'bold',
  },
  eachBoxNormal: {
    backgroundColor: grey,
    height: vh(150),
    width: vw(100),
    marginVertical: vw(10),
    marginRight: vw(3),
  },
  lionsOriginal: {
    backgroundColor: grey,
    height: vh(250),
    width: vw(150),
    marginVertical: vw(10),
    marginRight: vw(10),
  },
  activity: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover'
  },
  topTenBadge :{
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: red,
    fontSize: normalize(16),
    padding: normalize(5),
    color: white,
    width: "40%",
    textAlign: "center",
    borderTopLeftRadius: normalize(15)
  }
});
