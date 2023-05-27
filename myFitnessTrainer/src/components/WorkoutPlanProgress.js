import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import { ProgressBar } from 'react-native-paper';
import TimeElapsedPerWorkoutDayChart from './TimeElapsedPerWorkoutDayChart';
import DisplayExercisePRs from './DisplayExercisePRs';

const WorkoutPlanProgress = ({fitness_goal, duration, days_completed, timeElapsedData, exercisePRs}) => {

    return (
        <View >
            <Text style={styles.progressText}>Goal: Improve {fitness_goal}{"\n"}</Text>
            <Text style={styles.progressText}>You completed {days_completed} out of {duration} days.</Text>
            <Text style={styles.progressText}>Your workout plan is {Math.round((100 * days_completed) / duration)}% completed!</Text>
            <ProgressBar style={styles.progressBar} progress={days_completed / duration} color={styles.progressBarColor} />
            <TimeElapsedPerWorkoutDayChart duration={duration} timeElapsedData={timeElapsedData}/>
            <DisplayExercisePRs exercisePRs={exercisePRs} />
        </View>
    )
}
export default WorkoutPlanProgress;

const styles = StyleSheet.create({
    progressText: {
        textAlign: 'center',
        fontSize: 15,
    },
    progressBar: {
        height: 10,
        width: "90%",
        alignSelf: 'center',

    },
    progressBarColor: "#4682B4",
});