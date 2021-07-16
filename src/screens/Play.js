import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import Video from 'react-native-video';

export default function Play(props) {
  console.log('running');
  return (
    <View style={styles.mainContainer}>
      <Video
        source={{
          uri: 'https://www.rmp-streaming.com/media/big-buck-bunny-360p.mp4',
        }}
        onBuffer={() => {
          <ActivityIndicator size="large" color="red" />;
        }}
        onError={() => {
          console.log('Error');
        }}
        onEnd={() => {
          console.log('ended');
        }}
        style={styles.player}
        resizeMode="contain"
        controls={true}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  player: {
    height: '100%',
    width: '100%',
  },
});
