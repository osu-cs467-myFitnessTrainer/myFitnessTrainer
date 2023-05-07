import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const ExitWorkoutButton = () => {
    const navigation = useNavigation();

    const handleLeaveWorkout = () => {
        // Display a warning before user moves away from screen
        Alert.alert(
            "Exit today's workout?",
            "You have started a workout. If you exit before finishing, workout information may not be saved.",
            [
                { text: "Continue Workout", style: 'cancel', isPreferred: true, onPress: ()=> {}},
                {
                    text: 'Exit Workout',
                    style: 'destructive',
                    // User confirmed exit
                    onPress: () => navigation.navigate("Dashboard"),
                },
            ]
        );
    };

    return (
    <View>
        <TouchableOpacity onPress={handleLeaveWorkout}>
            <Text style={styles.exitText}>Exit</Text>
        </TouchableOpacity>
    </View>
    )
}

export default ExitWorkoutButton;

const styles = StyleSheet.create({
    exitText: {
        color: "#b20000",
        fontWeight: 'bold'
    }
});