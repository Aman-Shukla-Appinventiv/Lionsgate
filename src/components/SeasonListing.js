import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {normalize, vh, vw} from '../dimension';
import Episodes from './Episodes';
import {Seasons} from '../redux/actions';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SeasonListing(props) {
  const [vissible, setVissible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const Data = useSelector(state => state.MovieTvReducer.Seasons[selectedIndex])
  const dispatch = useDispatch();
  const state = useSelector(state => state.MovieTvReducer);
  useEffect(() => {
    dispatch(Seasons({id: props.id, seasons: props.seasons}));
  }, []);

  if (state.seasonsIsLoading) {
    return <ActivityIndicator size="small" color="#ccc" />;
  } else {
    return (
      <View style={styles.mainContainer}>
        <Modal visible={vissible} transparent>
          <View style={styles.modalMainContainer}>
            {state.Seasons.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedIndex(index);
                  setVissible(false);
                }}>
                <Text style={[styles.seasonName,{fontSize: selectedIndex == index ? normalize(22): normalize(16)}]}>Season {index + 1}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => {
                setVissible(false);
              }}>
              <Icon name="close-outline" size={normalize(30)} color="white" />
            </TouchableOpacity>
          </View>
        </Modal>
        <View style={styles.header}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => {
              setVissible(true);
            }}>
            <Text style={styles.text}> Season {selectedIndex + 1}</Text>
            <Icon
              name="chevron-down-outline"
              size={normalize(16)}
              color="white"
            />
          </TouchableOpacity>
          <Text style={styles.text}>Episodes {Data.episodes.length}</Text>
        </View>
        <View>
          <Episodes data = {Data.episodes}  />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: 'white',
  },
  modalMainContainer: {
    flex: 1,
    backgroundColor: 'rgba(35,35,35,0.9)',
    alignItems: 'center',
  },
  seasonName: {
    color: 'white',
    fontSize: normalize(16),
    marginVertical: vh(5)
  },
  closeBtn: {
    position: 'absolute',
    bottom: vh(20),
    backgroundColor: '#333',
    padding: normalize(5),
    borderRadius: normalize(20),
  },
});
