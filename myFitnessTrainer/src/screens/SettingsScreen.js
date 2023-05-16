import { StyleSheet, View } from 'react-native';
import React from 'react';
import CreateNewPlanButton from "../components/CreateNewPlanButton";
import SignOutButton from '../components/SignOutButton';
import ViewWorkoutPlanButton from '../components/ViewWorkoutPlanButton';
import DeleteWorkoutPlanButton from '../components/DeleteWorkoutPlanButtton';

const SettingsScreen = () => {
    return (
        <View style={styles.container}>
            <ViewWorkoutPlanButton />
            <CreateNewPlanButton />
            <DeleteWorkoutPlanButton />
            <SignOutButton />
        </View>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});