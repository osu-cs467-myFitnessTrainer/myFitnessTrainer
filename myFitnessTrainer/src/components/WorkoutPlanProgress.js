import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import { ProgressBar } from 'react-native-paper';
import { VictoryBar, VictoryChart, VictoryAxis } from "victory-native";

const WorkoutPlanProgress = ({fitness_goal, duration, days_completed, timeElapsedData}) => {

    console.log("timeElapsedData=", timeElapsedData)

    let graphs = null;
    if (timeElapsedData.length !== 0){
        graphs = (

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

    return (
        <View >
            <Text style={styles.progressText}>Goal: Improve {fitness_goal}{"\n"}</Text>
            <Text style={styles.progressText}>You completed {days_completed} out of {duration} days.</Text>
            <Text style={styles.progressText}>Your workout plan is {(100 * days_completed) / duration}% completed!</Text>
            <ProgressBar style={styles.progressBar} progress={days_completed / duration} color={styles.progressBarColor} />

            {graphs}

        </View>
    )
}

export default WorkoutPlanProgress;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        width: "50%"
      },
    progressText: {
        textAlign: 'center',
        fontSize: 15,
    },
    graphTitle: {
        textAlign: 'center',
        fontSize: 15,
        paddingTop: 40,
    },
    progressBar: {
        height: 10,
        width:"85%",
        alignSelf: 'center',

    },
    progressBarColor: "#4682B4",
    axisLabel: {
        fontSize: 15, 
        padding: 30
    },
    timeElapsedDataFillColor: "#2d5373",
});