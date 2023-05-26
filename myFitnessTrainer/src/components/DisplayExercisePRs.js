import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import ExerciseSummaryCard from './ExerciseSummaryCard';

const DisplayExercisePRs = ({exercisePRs}) => {
    if (Object.keys(exercisePRs).length === 0){
        return (
            <View >
            </View>
        )
    }

    let exercisePRsList = []
    for (const [exerciseName, exerciseStats] of Object.entries(exercisePRs)) {
        let exercisePR = {
            "exerciseName": exerciseName,
            "exerciseStats": {
                "reps": exerciseStats["reps"],
                "sets": exerciseStats["sets"],
                "weight": exerciseStats["weight"],
                "incline": exerciseStats["incline"],
                "resistance": exerciseStats["resistance"],
                "speed": exerciseStats["speed"],
            }
        }
        exercisePRsList.push(exercisePR);
    }

    return(
        <View style={styles.container}>
            <Text style={styles.titleText}>Personal Records</Text>
            {exercisePRsList.map((exercisePR) => {
                return (
                <View>
                    <ExerciseSummaryCard key="{exerciseName}" exerciseName={exercisePR.exerciseName} exerciseStats={exercisePR.exerciseStats} />
                </View>
                );
            })}

        </View>
        )

}

export default DisplayExercisePRs;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
      titleText: {
        textAlign: 'center',
        fontSize: 15,
        paddingTop: 10
    },
});
