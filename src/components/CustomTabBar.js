import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {vh, vw, normalize} from '../dimension';
import {white, black, red, grey} from '../assets/Colors';

function CustomTabBar({state, descriptors, navigation}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
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
        const icons =
          route.name == 'Home' ? (
            <Icon
              name="home-outline"
              size={normalize(20)}
              color={isFocused ? white : grey}
            />
          ) : route.name == 'Search' ? (
            <Icon
              name="search-outline"
              size={normalize(20)}
              color={isFocused ? white : grey}
            />
          ) : route.name == 'Downloads' ? (
            <Icon
              name="download-outline"
              size={normalize(20)}
              color={isFocused ? white : grey}
            />
          ) : route.name == 'WatchList' ? (
            <Icon
              name="add-circle-outline"
              size={normalize(20)}
              color={isFocused ? white : grey}
            />
          ) : route.name == 'More' ? (
            <Icon
              name="reorder-three-outline"
              size={normalize(20)}
              color={isFocused ? white : grey}
            />
          ) : null;

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
            style={[styles.eachTabBtn,{borderBottomColor: isFocused ? red : black}]}>
            {icons}

            <Text style={{color: isFocused ? white : grey, fontSize: normalize(10), marginVertical: vh(5)}}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    height: vh(70),
    backgroundColor: '#000',
  },
  eachTabBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderBottomWidth: normalize(3),
  },
});

export default CustomTabBar;
