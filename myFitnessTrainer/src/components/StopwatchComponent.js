import React, { useState } from 'react'; 
import { Text, TouchableHighlight, View } from 'react-native';
import { Stopwatch } from 'react-native-stopwatch-timer';

const StopwatchComponent = () => {
    const [stopwatchStart, setStopwatchStart] = useState(false);
    const [stopwatchReset, setStopwatchReset] = useState(false);
    const [time, setTime] = useState(0);
    
    const handleTimerComplete = () => alert("custom completion function");
    
    toggleStopwatch = () => {
        setStopwatchStart(!stopwatchStart);
        setStopwatchReset(false);
    }
     
    resetStopwatch = () => {
        setStopwatchStart(false);
        setStopwatchReset(true);
    }

    return (
        <View>
          <Stopwatch laps msecs start={stopwatchStart}
            reset={stopwatchReset}
            options={options} 
          />
          <TouchableHighlight onPress={toggleStopwatch}>
            <Text style={{fontSize: 30}}>{!stopwatchStart ? "Start" : "Stop"}</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={resetStopwatch}>
            <Text style={{fontSize: 30}}>Reset</Text>
          </TouchableHighlight>
        </View>
      );
}

export default StopwatchComponent;

const options = {
    container: {
      backgroundColor: "#ECECEC",
      padding: 5,
      borderRadius: 5,
      width: 150,
    },
    text: {
      fontSize: 20,
      color: 'black',
      marginLeft: 7,
    }
  };
