import React from 'react';
import { Text, View, StyleSheet} from 'react-native';
import Colors from './../constans/colors'

export const Header = props => {
return (
<View style={styles.header}>
    <Text style={styles.headerTitle}>{props.title}</Text>
</View>
)}

const styles = StyleSheet.create({
header:{
    width:'100%',
    height:90,
    alignItems:'center',
    backgroundColor:Colors.primary,
    paddingTop:36,
    justifyContent:'center'
},
headerTitle:{
    color:'black',
    fontSize:18
}
})
