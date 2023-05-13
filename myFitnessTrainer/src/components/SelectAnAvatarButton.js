import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const SelectAnAvatarButton = () => {
    const navigation = useNavigation();

    const handleSelectAnAvatar = () => {
        // navigation.navigate("Select An Avatar");
        navigation.navigate("Select An Avatar", {
            fromSignUpScreen: false,
          });
    };

    return (
        <TouchableOpacity style={styles.button} onPress={handleSelectAnAvatar}>
            <Text style={styles.buttonText}>Edit Avatar</Text>
        </TouchableOpacity>
    );
};

export default SelectAnAvatarButton;

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
