import React from 'react';
import { StyleSheet, View, Text, Button, Image, Dimensions, ScrollView } from 'react-native';
import MainButton from '../MainButton';

const GameOverScreen = props => {
    return (
        <ScrollView>
        <View style={styles.screen}>
            <Text>The Game is over!</Text>
            <View style={styles.containerImage}>
              <Image source={require('../../assets/img/goal.jpg')} style={styles.image} />
            </View>
            <Text>Number of rounds: {props.roundsNumber}</Text>
            <Text>Number was: {props.userNumber}</Text>
            <MainButton onPress={props.onRestart}>NEW GAME</MainButton> 
        </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    containerImage:{
        width:Dimensions.get('window').width * 0.7,
        height:Dimensions.get('window').width * 0.7,
        borderRadius:(Dimensions.get('window').width * 0.7) /2 ,
        borderWidth:3,
        borderColor:'black',
        overflow:'hidden',
        marginVertical:Dimensions.get('window').height / 30
    },
    image:{
        width:'100%',
        height:'100%'
    }
});

export default GameOverScreen;