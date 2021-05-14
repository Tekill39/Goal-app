import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity} from 'react-native';

const MainButton = props =>{
  return (
      <TouchableOpacity activeOpacity={0.7} onPress={props.onPress}>
          <View style={styles.button}>
              <Text style={styles.buttonText}>
                {props.children}
              </Text>
          </View>
      </TouchableOpacity>
  )
}

const styles =StyleSheet.create({
  button:{
    backgroundColor:'#f728b7',
    paddingVertical:12,
    paddingHorizontal:30,
    borderRadius:25
  },
  buttonText:{
    color:'white',
    fontSize:10
  }
});

export default MainButton;