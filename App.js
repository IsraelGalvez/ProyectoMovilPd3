import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import entities from './entities';
import Physics from './physics';
import { Audio } from 'expo-av';

export default function App() {
  const [running, setRunning] = useState(false)
  const [gameEngine, setGameEngine] = useState(null)
  const [currentPoints, setCurrentPoints] = useState(0)
  useEffect(() => {
    setRunning(true)
  }, [])
  return (
    <View style={{flex: 1}}>
      
      <Text style={{ paddingTop: 30, textAlign: 'center', fontSize: 40, fontWeight: 'bold', backgroundColor: "#79c5ff" }}>{currentPoints}</Text>
      <ImageBackground
          style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}
          resizeMode='cover'
          source={require('./assets/img/background.png')}
        >
          
            <GameEngine
              ref={(ref) => {setGameEngine(ref) }}
                systems={[Physics]}
                entities={entities()}
                running={running}
                onEvent={(e) => {
                  switch(e.type) {
                    case 'game_over':
                      setRunning(false)
                      gameEngine.stop()
                      break;
                    case 'new_point':
                      setCurrentPoints(currentPoints + 1)
                      break;
                  }
                }}
                style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
              >
                <StatusBar style="auto" hidden={true} />
        </GameEngine>

        {!running ? 
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity style={
              {backgroundColor: 'black', paddingHorizontal: 30, paddingVertical: 10}} onPress = {() => {
              setCurrentPoints(0)
              setRunning(true)
              gameEngine.swap(entities())
            }}>
              <Text style={{fontWeight: 'bold', color: 'white', fontSize: 30}}>
                START GAME
              </Text>
            </TouchableOpacity>
          </View> : null}
        </ImageBackground>
      
        
    </View>
  );
}

async function componentDidMount() {
  Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    playsInSilentModeIOS: true,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
    shouldDuckAndroid: true,
    staysActiveInBackground: true,
    playThroughEarpieceAndroid: true
  });

  this.sound = new Audio.Sound();

  const status = {
    shouldPlay: true
  }

  this.sound.loadAsync(require('./assets/music/8-bit-dream-land-142093.mp3'), status, false)
}

componentDidMount()

