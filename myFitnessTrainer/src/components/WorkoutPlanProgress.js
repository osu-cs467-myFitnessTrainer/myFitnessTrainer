import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import { ProgressBar } from 'react-native-paper';

const WorkoutPlanProgress = ({fitness_goal, duration, days_completed}) => {
    return (
        <View >
            <Text style={styles.progressText}>Goal: Improve {fitness_goal}</Text>
            
            <Text style={styles.progressText}>Your workout plan is {(100 * days_completed) / duration}% completed!</Text>
                <ProgressBar style={styles.progressBar} progress={days_completed / duration} color={styles.progressBarColor} />
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
        width:"100%",
        alignSelf: 'center',

    },
    progressBarColor: "blue",
});