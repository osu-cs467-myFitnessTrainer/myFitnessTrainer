import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const StartExerciseButton = ({ handleOnStart }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={handleOnStart}>
            <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
    );
};

export default StartExerciseButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: "green",
        width: "25%",
        height: 50,
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        margin: 20
    },
    buttonText: {
        color: "white",
        fontWeight: 800,
        fontSize: 16,
    },
});
