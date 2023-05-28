import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis } from "victory-native";

const TimeElapsedPerWorkoutDayChart = ({ duration, timeElapsedData}) => {
    if (timeElapsedData.length === 0){
        return (
            <View >
            </View>
        )
    }
    // else, we have timeElapsedData
    return(
        <View style={styles.container}>
            <Text style={styles.graphTitle}>Time Elapsed Per Workout Day</Text>
            <VictoryChart>
                <VictoryAxis
                    label="Day"
                    tickValues={Array.from({length: duration}, (_, i) => i + 1)}    // [1, ..., {duration}]
                    style={styles.axisLabel}
                />
                <VictoryAxis dependentAxis
                    label="Time Elapsed (s)"
                    style={styles.axisLabel}
                />
                <VictoryBar 
                    data={timeElapsedData} 
                    domain={{x: [0,duration]}} 
                    x="day" 
                    y="elapsedTimePerDay"
                    labels={({ datum }) => `${datum.elapsedTimePerDay}`}
                    style={{ data: {fill: styles.timeElapsedDataFillColor} }}
                />
            </VictoryChart>
        </View>
        )

}

export default TimeElapsedPerWorkoutDayChart;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        width: "50%"
      },
    graphTitle: {
        textAlign: 'center',
        fontSize: 15,
        paddingTop: 40,
    },
    timeElapsedDataFillColor: "#2d5373",
});