import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {normalize} from '../dimension';
import {red, white} from '../assets/Colors';

export default function GenderBtn(props) {
  const [male, setMale] = useState(false);
  const [female, setFemale] = useState(false);
  const [other, setOther] = useState(true);
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={[
          styles.touchBox,
          {borderColor: male ? red : white, backgroundColor: male ? red : null},
        ]}
        onPress={() => {
          setMale(true);
          setFemale(false);
          setOther(false);
          props.setGenderData("Male")
        }}>
        <Text style={styles.touchText}>Male</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.touchBox,
          {
            borderColor: female ? red : white,
            backgroundColor: female ? red : null,
          },
        ]}
        onPress={() => {
          setMale(false);
          setFemale(true);
          setOther(false);
          props.setGenderData("Female")
        }}>
        <Text style={styles.touchText}>Female</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.touchBox,
          {
            borderColor: other ? red : white,
            backgroundColor: other ? red : null,
          },
        ]}
        onPress={() => {
          setMale(false);
          setFemale(false);
          setOther(true);
          props.setGenderData("Others")
        }}>
        <Text style={styles.touchText}>Other</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: normalize(10),
  },
  touchBox: {
    flex: 0.3,
    borderWidth: normalize(2),
    borderRadius: normalize(10),
    paddingVertical: normalize(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: normalize(16),
  },
});
