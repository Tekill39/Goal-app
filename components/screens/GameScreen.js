import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, View, Text, Alert, ScrollView, Dimensions } from 'react-native';
import Card from '../Card';
import NumberContainer from '../NumberContainer';
import { Ionicons } from '@expo/vector-icons';
import MainButton from '../MainButton';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
      return generateRandomBetween(min, max, exclude);
    } else {
      return rndNum;
    }
  };

  const renderListItem = (value, numOfRound) =>(
    <View key={value} style={styles.list}>
      <Text>#{numOfRound}</Text>
      <Text>{value}</Text>
    </View>);
  
  const GameScreen = props => {
    const initialGuess=generateRandomBetween(1, 100, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);
  
    const { userChoice, onGameOver } = props;
  
    useEffect(() => {
      if (currentGuess === userChoice) {
        onGameOver(pastGuesses.length);
      }
    }, [currentGuess, userChoice, onGameOver]);
  
    const nextGuessHandler = direction => {
      if (
        (direction === 'lower' && currentGuess < props.userChoice) ||
        (direction === 'greater' && currentGuess > props.userChoice)
      ) {
        Alert.alert("Don't lie!", 'You know that this is wrong...', [
          { text: 'Sorry!', style: 'cancel' }
        ]);
        return;
      }
      if (direction === 'lower') {
        currentHigh.current = currentGuess;
      } else {
        currentLow.current = currentGuess + 1;
      }
      const nextNumber = generateRandomBetween(
        currentLow.current,
        currentHigh.current,
        currentGuess
      );
      setCurrentGuess(nextNumber);
      // setRounds(curRounds => curRounds + 1);
      setPastGuesses(curPastGuesses=>[nextNumber,...curPastGuesses]);
    };
       let listContainerStyle = styles.listContainer
    if(Dimensions.get('window').width < 350 ){
      listContainerStyle = styles.listContainer
    }
  
    return (
      <View style={styles.screen}>
        <Text>Opponent's Guess</Text>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card style={styles.buttonContainer}>
          <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
            <Ionicons name="md-remove" size={24} color="white" /> 
          </MainButton>
          <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
          <Ionicons name="md-add" size={24} color="white" /> 
          </MainButton>
        </Card>
        <View style={styles.listContainer}>
        <ScrollView>
          {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length-index))}
        </ScrollView>
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
  screen:{
      flex:1,
      padding:10,
      alignItems:'center'
  },
  buttonContainer:{
      flexDirection:'row',
      justifyContent:'space-around',
      marginTop:Dimensions.get('window').height > 600 ? 30 : 10,
      width:300,
      maxWidth:'80%'
  },
  list:{
    borderColor:'#ccc',
    borderWidth:1,
    padding:15,
    marginVertical:10,
    backgroundColor:'white',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  listContainer:{
      flex:1,
      width: Dimensions.get('window').width > 350 ? '60%' : '80%'
    }      
});

export default GameScreen;