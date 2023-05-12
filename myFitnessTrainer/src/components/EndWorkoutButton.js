import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const EndWorkoutButton = () => {
    // console.log(workoutStats);
    const navigation = useNavigation();

    const endWorkout = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "Workout Summary" }],
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
