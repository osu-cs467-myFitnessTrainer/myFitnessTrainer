import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Stopwatch = ({
  setTimeInSeconds,
  setDisplayRecordExercise
}) => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    let interval = null;

    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [running]);

  const handleStartStop = () => {
    setRunning(!running);
    setTimeInSeconds(time);
    console.log(time);
    if (time !== 0) {
      setDisplayRecordExercise(true);
    }
  };

  const handleReset = () => {
    setTime(0);
    setRunning(false);
    setDisplayRecordExercise(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{formatTime(time)}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={running ? styles.stopButton : styles.startButton} onPress={handleStartStop}>
          <Text style={styles.whiteButtonText}>{running ? 'Stop' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  time: {
    fontSize: 40,
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#DDDDDD",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  startButton: {
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  stopButton: {
    backgroundColor: "#8B0000",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold"
  },
  whiteButtonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold"
  },
});

export default Stopwatch;
