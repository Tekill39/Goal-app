
import React,  {useState} from 'react';
import { StyleSheet, View} from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import { Header } from './components/Header';
import GameOverScreen from './components/screens/GameOverScreen';
import GameScreen from './components/screens/GameScreen';
import StartGameScreen from './components/screens/StartGameScreen';

const fetchFonts = ()=> {
  Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Bold.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};


export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
//Привет
  if (!dataLoaded){
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded({ isReady: true })}
        onError={()=>console.log(err)}
      />
    );
  }



  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onRestart={configureNewGameHandler}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      {content}
    </View>
  );
}
const styles = StyleSheet.create({
  screen:{
    flex:1,
    color:'black'
  }
});
