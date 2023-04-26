import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const GoToDashboardButton = () => {
    const navigation = useNavigation();

    const navigateHome = () => {
        navigation.replace("Dashboard");
    };

    return (
        <TouchableOpacity style={styles.button} onPress={navigateHome}>
            <Text style={styles.buttonText}>Go To Dashboard</Text>
        </TouchableOpacity>
    );
};

export default GoToDashboardButton;

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
