import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { getDocument, getDocumentId } from "../../databaseFunctions";
import { auth } from "../../firebaseConfig";

const StartWorkoutButton = () => {
    const navigation = useNavigation();

    const startWorkout = async () => {
        // get user id
        const userId = await getDocumentId(
            "users",
            "email",
            auth.currentUser.email
        );

        // match userid to the correct workout plan
        const workOutPlan = await getDocument(
            "workout_plans",
            "user_id",
            userId
        );
        // console.log(workOutPlan["daily_exercises"]["0"]);
        const daysCompleted = workOutPlan["days_completed"];
        const dailyExerciseSet = workOutPlan["daily_exercises"][daysCompleted];
        dailyExerciseSet.forEach(
            (exerciseSet) =>
                delete exerciseSet.default_exercise_stat_id.firestore
        );
        // console.log(dailyExerciseSet);
        navigation.navigate("Workout", dailyExerciseSet);
    };

    return (
        <TouchableOpacity style={styles.button} onPress={startWorkout}>
            <Text style={styles.buttonText}>Start Today&apos;s Workout</Text>
        </TouchableOpacity>
    );
};

export default StartWorkoutButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#4682B4",
        width: "75%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 40,
    },
    buttonText: {
        color: "white",
        fontWeight: 800,
        fontSize: 16,
    },
});
