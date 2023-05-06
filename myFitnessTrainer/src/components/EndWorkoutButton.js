import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const EndWorkoutButton = () => {
    const navigation = useNavigation();

    const startWorkout = () => {
        navigation.navigate("Workout Summary");
    };

    return (
        <TouchableOpacity style={styles.button} onPress={startWorkout}>
            <Text style={styles.buttonText}>View Workout Summary</Text>
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
