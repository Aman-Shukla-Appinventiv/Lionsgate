import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Switch} from 'react-native';
import {normalize, vw, vh} from '../dimension';
import Icon from 'react-native-vector-icons/Ionicons';
import {grey, red, white} from '../assets/Colors';

export default function DownloadPreferences(props) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.goBack();
          }}>
          <Icon name="arrow-back" size={normalize(30)} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Download Preferences</Text>
      </View>
      <View key={(Math.random() + Math.random()).toString()} style={styles.row}>
        <Text style={styles.text}>Download on WIFI only</Text>
        <Switch
          trackColor={{false: '#767577', true: '#560A13'}}
          thumbColor={isEnabled ? red : white}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <TouchableOpacity
        key={(Math.random() + Math.random()).toString()}
        style={styles.row}>
        <Text style={styles.text}>Video download quality</Text>
        <Icon
          name="chevron-forward-outline"
          size={normalize(20)}
          color="white"
        />
      </TouchableOpacity>
      <TouchableOpacity
        key={(Math.random() + Math.random()).toString()}
        style={styles.row}>
        <Text style={styles.text}>Delete all downloads</Text>
        <Icon name="trash-outline" size={normalize(20)} color="white" />
      </TouchableOpacity>
      <View style={styles.storageBox}>
        <Text style={styles.storageText}>Storage</Text>
        <View style={styles.outer}>
          <View style={styles.inner}></View>
        </View>
        <View style={styles.spaceBox}>
          <Text style={styles.spaceText}>57GB used</Text>
          <Text style={styles.spaceText}>51GB free</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    padding: normalize(5),
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: normalize(18),
    marginLeft: vw(10),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: vw(20),
    marginVertical: vh(10),
    padding: normalize(5),
  },
  text: {
    color: 'white',
    fontSize: normalize(16),
  },
  storageBox: {
    marginHorizontal: vw(20),
    marginVertical: vh(10),
    padding: normalize(5),
  },
  storageText: {
    color: white,
    fontSize: normalize(16),
    marginBottom: vh(10),
  },
  outer: {
    backgroundColor: grey,
    width: '100%',
  },
  inner: {
    backgroundColor: red,
    height: vh(5),
    width: '52%',
  },
  spaceBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  spaceText: {
    color: grey,
  },
});
