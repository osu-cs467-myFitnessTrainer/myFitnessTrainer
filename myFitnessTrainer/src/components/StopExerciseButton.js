import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const StopExerciseButton = ({ handleOnStop }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={handleOnStop}>
            <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
    );
};

export default StopExerciseButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#8B0000",
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
