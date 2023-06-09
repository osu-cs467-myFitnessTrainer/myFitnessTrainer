import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const SubmitExerciseStatsButton = ({ handleOnSubmit }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={handleOnSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
    );
};

export default SubmitExerciseStatsButton;

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
