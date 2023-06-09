import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
    getDocumentId,
    getUserActivePlan,
    updateDocument,
} from "../../databaseFunctions";
import { auth } from "../../firebaseConfig";

const EndWorkoutButton = ({ daysCompleted }) => {
    const navigation = useNavigation();

    const endWorkout = async () => {
        // update user workout_plan days_completed
        const userId = await getDocumentId(
            "users",
            "email",
            auth.currentUser.email
        );

        const workoutPlan = await getUserActivePlan(userId);
        const workoutPlanId = workoutPlan["id"];
        workoutPlan["days_completed"] += 1;

        await updateDocument("workout_plans", workoutPlanId, {
            days_completed: daysCompleted + 1,
        });

        navigation.reset({
            index: 0,
            routes: [
                {
                    name: "Workout Summary",
                    params: { workoutPlanId: workoutPlanId, userId: userId },
                },
            ],
        });
    };

    return (
        <TouchableOpacity style={styles.button} onPress={endWorkout}>
            <Text style={styles.buttonText}>Finish Workout</Text>
        </TouchableOpacity>
    );
};

export default EndWorkoutButton;

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
