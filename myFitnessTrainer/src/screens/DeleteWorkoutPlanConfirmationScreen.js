import React from "react";
import { StyleSheet, View, Text} from "react-native";
import GoToDashboardButton from "../components/GoToDashboardButton";

const DeleteWorkoutPlanConfirmationScreen = () => {
    return (
        <View style={styles.container}>
            <Text>The workout plan was successfully deleted.</Text>
            <GoToDashboardButton activePlanWasDeleted="true" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 15
    },
});

export default DeleteWorkoutPlanConfirmationScreen;