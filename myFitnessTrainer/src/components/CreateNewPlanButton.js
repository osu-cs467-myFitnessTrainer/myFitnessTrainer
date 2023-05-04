import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const CreateNewPlanButton = () => {
    const navigation = useNavigation();

    const handleCreateNewPlan = () => {
        navigation.navigate("Create Workout Plan");
    };

    return (
        <TouchableOpacity style={styles.button} onPress={handleCreateNewPlan}>
            <Text style={styles.buttonText}>Create New Workout Plan</Text>
        </TouchableOpacity>
    );
};

export default CreateNewPlanButton;

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
