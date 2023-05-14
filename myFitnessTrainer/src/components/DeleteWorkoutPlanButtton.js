import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

// https://firebase.google.com/docs/firestore/query-data/queries#compound_and_queries

const DeleteWorkoutPlanButton = () => {
    const navigation = useNavigation();

    const handleDeleteWorkoutPlan = () => {
        navigation.navigate("Delete Workout Plan");
    };

    return (
        <TouchableOpacity style={styles.button} onPress={handleDeleteWorkoutPlan}>
            <Text style={styles.buttonText}>Delete Workout Plan</Text>
        </TouchableOpacity>
    );
};

export default DeleteWorkoutPlanButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#8B0000',
        width: '75%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40
    },
    buttonText: {
        color: 'white',
        fontWeight: 800,
        fontSize: 16
    },
})