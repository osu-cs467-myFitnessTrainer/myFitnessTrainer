import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { auth } from '../../firebaseConfig';
import StartWorkoutButton from "../components/StartWorkoutButton";
import CreateNewPlanButton from '../components/CreateNewPlanButton';


const DashboardScreen = () => {
    // TODO: WILL SHOW CREATE NEW PLAN OR START WORKOUT BUTTON DEPENDING ON IF THEY HAVE ACTIVE PLAN


    return (
        <View style={styles.container}>
            <Text>Email: {auth.currentUser?.email}</Text>
            <Text>This screen is the Dashboard! Woot!</Text>
            <CreateNewPlanButton />
            <StartWorkoutButton />
        </View>
    );
};

export default DashboardScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});