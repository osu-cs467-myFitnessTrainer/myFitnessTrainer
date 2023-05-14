import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { getAllDocuments, getDocumentId } from "../../databaseFunctions";
import { auth } from "../../firebaseConfig";

const StartWorkoutButton = () => {
    const navigation = useNavigation();

    const startWorkout = async () => {
        const userId = await getDocumentId(
            "users",
            "email",
            auth.currentUser.email
        );

        const allWorkoutPlans = await getAllDocuments("workout_plans");
        const workoutPlanIds = Object.keys(allWorkoutPlans).filter(
            (workoutPlan) => allWorkoutPlans[workoutPlan]["user_id"] === userId
        );

        const activeWorkoutPlanId = workoutPlanIds.filter(
            (workoutPlanId) => allWorkoutPlans[workoutPlanId]["active"] === true
        );

        const workoutPlan = allWorkoutPlans[activeWorkoutPlanId];

        const daysCompleted = workoutPlan["days_completed"];
        const dailyExerciseSet = workoutPlan["daily_exercises"][daysCompleted];
        dailyExerciseSet.forEach(
            (exerciseSet) =>
                delete exerciseSet.default_exercise_stat_id.firestore
        );

        navigation.navigate("Workout", {
            dailyExerciseSet: dailyExerciseSet,
            daysCompleted: daysCompleted,
            workoutPlanId: activeWorkoutPlanId,
        });
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
