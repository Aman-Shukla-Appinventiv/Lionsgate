import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Modal} from 'react-native';
import {normalize, vh} from '../dimension';
import Video from 'react-native-video';
import {useSelector} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';

export default function Splash(props) {
  const [modalVissible, setModalVissible] = useState(false);
  const authstate = useSelector(state => state.authReducer);
  const checkConnection = () => {
    NetInfo.fetch().then(state => {
      if (state.isInternetReachable) {
        if (authstate.userLoggedIn != undefined && authstate.userLoggedIn) {
          if (authstate.subscription) {
            props.navigation.replace('Router');
          } else {
            props.navigation.replace('Subscribe');
          }
        } else {
          props.navigation.replace('Carousel');
        }
      } else {
        setModalVissible(true);
      }
    });
  };

  handleError = () => {
    alert('error in loading');
  };

  handleEnd = () => {
    checkConnection();
  };

  return (
    <View style={styles.mainContainer}>
      <Modal
      visible= {modalVissible}>
        <View style={styles.modalMainBox}>
          <Text style={styles.titleText}>No Internet?</Text>
          <Text style={styles.msgText}>
            No Internet connection detected. {'\n'}
            Please check and try again.
          </Text>
          <Text style={styles.titleText}>LIONSGATE</Text>
          <Text style={styles.playText}>Play</Text>
        </View>
      </Modal>
      <Video
        source={require('../assets/vdo/splash.mp4')}
        onError={handleError}
        onEnd={handleEnd}
        style={{flex: 1, width: '100%'}}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  modalMainBox: {
    flex: 1,
    backgroundColor: '#1A1A1C',
    alignItems: 'center',
    justifyContent: "center"
  },
  titleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: normalize(24),
  },
  msgText: {
    color: '#aaa',
    fontSize: normalize(14),
    marginVertical: vh(10),
  },
  playText: {
    color: 'white',
    marginTop: normalize(-10),
    fontSize: normalize(24),
  },
});
