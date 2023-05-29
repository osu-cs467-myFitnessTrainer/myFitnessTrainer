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
    let i = 0;
    for (const [exerciseName, exerciseStats] of Object.entries(exercisePRs)) {
        let exercisePR = {
            "id": i,
            "exerciseName": exerciseName,
            "exerciseStats": {
                "reps": exerciseStats["reps"],
                "sets": exerciseStats["sets"],
                "weight": exerciseStats["weight"],
                "incline": exerciseStats["incline"],
                "resistance": exerciseStats["resistance"],
                "speed": exerciseStats["speed"],
                "count": exerciseStats["count"],
            }
        }
        exercisePRsList.push(exercisePR);
        i = i+1;
    }

    return(
        <View style={styles.container}>
            <Text style={styles.titleText}>Personal Records</Text>
            {exercisePRsList.map((exercisePR) => {
                return (
                <View key={exercisePR.id}>
                    <ExerciseSummaryCard exerciseName={exercisePR.exerciseName} exerciseStats={exercisePR.exerciseStats} />
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
