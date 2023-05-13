import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../firebaseConfig"
import { getDocumentId, getD, getDocument
 } from "../../databaseFunctions";

const SelectAnAvatarButton = () => {
    const navigation = useNavigation();

    const handleSelectAnAvatar = async () => {
        const userDocument = await getDocument(
        "users",
        "email",
        auth.currentUser.email
        );

        navigation.navigate("Select An Avatar", {
            fromSignUpScreen: false,
            avatarFileName: userDocument.avatar_file_name
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
