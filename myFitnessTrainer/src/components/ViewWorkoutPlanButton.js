import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const ViewWorkoutPlanButton = () => {
    const navigation = useNavigation();

    const handleViewWorkoutPlanButton = () => {
        navigation.navigate("View Workout Plan", {
            itemId: 86,
            otherParam: 'anything you want here',
          });
    };

    return (
        <TouchableOpacity style={styles.button} onPress={handleViewWorkoutPlanButton}>
            <Text style={styles.buttonText}>View Workout Plan</Text>
        </TouchableOpacity>
    );
};

export default ViewWorkoutPlanButton;

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
