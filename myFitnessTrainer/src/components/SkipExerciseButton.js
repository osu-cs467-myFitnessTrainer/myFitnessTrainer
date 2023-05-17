import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const SkipExerciseButton = ({ handleOnSkip }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={handleOnSkip}>
            <Text style={styles.buttonText}>Skip</Text>
        </TouchableOpacity>
    );
};

export default SkipExerciseButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#4682B4",
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
