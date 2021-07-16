import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {vh, vw, normalize} from '../dimension';
import LinearGradient from 'react-native-linear-gradient';
import {white, black, red, grey} from '../assets/Colors';

function CustomTopTabBar({state, descriptors, navigation}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <LinearGradient
      colors={['rgba(0,0,0,1)', 'rgba(0,0,0,.4)']}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      style={styles.linearGradient}>
          <View style = {{flexDirection: "row", marginBottom: vh(10)}}>
          <Text style={styles.text}>LIONSGATE </Text>
          <Text style={styles.textPlay}>PLAY</Text>
          </View>
      

      <View style={styles.mainContainer}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              key={Math.random().toString()}
              style={[
                styles.eachTabBtn,
                {borderBottomColor: isFocused ? red : 'rgba(0,0,0,0)'},
              ]}>
              <Text
                style={{
                  color: isFocused ? white : "#aaa",
                  fontSize: normalize(16),
                  marginVertical: vh(5),
                }}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center"

  },
  eachTabBtn: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderBottomWidth: normalize(3),
  },
  text: {
    fontSize: normalize(20),
    fontWeight: 'bold',
    color: '#fff',
  },
  textPlay: {
    fontSize: normalize(20),
    color: '#fff',
  },
  linearGradient: {
    position: 'absolute',
    top: vh(0),
    height: vh(80),
    width: '100%',
    paddingTop: normalize(20),
    paddingHorizontal: normalize(20),
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 1,
  },
});

export default CustomTopTabBar;
