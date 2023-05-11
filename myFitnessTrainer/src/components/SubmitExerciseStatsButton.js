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
