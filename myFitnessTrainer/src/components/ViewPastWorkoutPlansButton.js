import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const ViewPastWorkoutPlansButton = () => {
    const navigation = useNavigation();

    const handleViewPastWorkoutPlans = () => {
        navigation.navigate("View Past Workout Plans");
    };

    return (
        <TouchableOpacity style={styles.button} onPress={handleViewPastWorkoutPlans}>
            <Text style={styles.buttonText}>View Past Workout Plans</Text>
        </TouchableOpacity>
    );
};

export default ViewPastWorkoutPlansButton;

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
