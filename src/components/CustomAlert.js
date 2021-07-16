import React, { useState, forwardRef, useImperativeHandle } from 'react';
import {View, Text, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import {normalize, vh, vw} from '../dimension';



  const CustomAlert = forwardRef((props, ref) => {
    const [alert, setAlert] = useState(false)
  
    const showAlert = () => {
        setAlert(true);
    };
  
    const hideAlert = () => {
        setAlert(false);
    };
  
    useImperativeHandle(ref, () => {
      return {
        showAlert: showAlert,
        hideAlert: hideAlert
      };
    });
  return (
    <Modal transparent visible={alert}>
      <TouchableOpacity style={styles.mainContainer} onPress = {() => {setAlert(false)}}>
        <View style={styles.container}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.message}>{props.message}</Text>
          <View style = {styles.buttonsBox}>
              {
                  props.buttons.map((element) => {
                      return(
                          <TouchableOpacity onPress = {element.onPress} style = {styles.button}>
                              <Text style = {[styles.buttonTitle,{color: element.type == "negative" ? "#aaa": "white"}]}>{element.title}</Text>
                          </TouchableOpacity>
                      )
                  })
              }
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
})

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    backgroundColor: '#2D2D35',
    borderRadius: normalize(5),
    alignItems: 'center',
    padding: normalize(20),
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: normalize(16),
    textAlign: "center"
  },
  message: {
    color: 'white',
    fontSize: normalize(12),
    marginVertical: vh(5),
    textAlign: "center"
  },
  buttonsBox: {
      flexDirection: "row",
      padding: normalize(5)
  },
  button: {
      flex: 1,
      backgroundColor: "#454753",
      marginHorizontal: vw(10),
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: vh(10),
      borderRadius: normalize(5)
  },
  buttonTitle: {
      color: "white"
  }
});
export default CustomAlert;
