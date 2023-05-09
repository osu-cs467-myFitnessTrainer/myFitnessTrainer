import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebaseConfig';
import StartWorkoutButton from "../components/StartWorkoutButton";
import CreateNewPlanButton from '../components/CreateNewPlanButton';
import { getDocumentId, getUsernameWithUserId, userHasActiveWorkoutPlan, userhasWorkoutPlan } from '../../databaseFunctions';
import { ScrollView } from 'react-native-gesture-handler';

const DashboardScreen = () => {
    const [userIsNew, setUserIsNew] = useState(true);
    const [hasactiveWorkoutPlan, setHasActiveWorkoutPlan] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [username, setUsername] = useState('user');

    // We'll fetch each time user enters Dashboard Screen
    useEffect(() => {
        const fetchWorkoutPlan = async () => {
            const userId = await getDocumentId("users", "email", auth.currentUser.email);
            const userHasCreatedPlan = await userhasWorkoutPlan(userId);
            setUserIsNew(!userHasCreatedPlan);
            if (!userHasCreatedPlan) {
                // only display username to a new user
                const userName = await getUsernameWithUserId(userId);
                setUsername(userName);
            } else {
                // only check if they have active plan if we know they are not new
                const hasActivePlan = await userHasActiveWorkoutPlan(userId);
                setHasActiveWorkoutPlan(hasActivePlan);
            }        
            setIsLoading(false);
        }
        fetchWorkoutPlan().catch(error => console.log(error));
    }, []);

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' color="#4682B4"/>
            </View>
        )
    }
    else if (userIsNew) {
        return (
            <View style={styles.newUserContainer}>
                <Text style={styles.welcomeMessage}>Welcome to myFitnessTrainer, {username}!</Text>
                <Text style={styles.createNewWorkoutText}>Create a new Workout Plan to get started</Text>
                <CreateNewPlanButton />
            </View>
        )
    }
    else {
        const button = hasactiveWorkoutPlan ? (
            <View style={styles.buttonContainer}>
                <StartWorkoutButton />
                <Text style={styles.createNewPlanInSettingsText}>You can create a new workout plan in Settings</Text>
            </View>
        ): 
        (
        <View style={styles.buttonContainer}>
            <Text style={styles.completedWorkoutPlanText}>You have completed your Workout Plan - Congrats!</Text>
            <CreateNewPlanButton />
        </View>
        );

        // TO DO: IMPLEMENT METRICS FROM USER EXERCISE HISTORY
        const metricsContent = (
            <View>
                <View style={styles.metricsContainer}>
                    <Text style={styles.metricsPlaceholderText}>Metrics Placeholder</Text>
                </View>
                <View style={styles.metricsContainer}>
                    <Text style={styles.metricsPlaceholderText}>Metrics Placeholder</Text>
                </View>
                <View style={styles.metricsContainer}>
                    <Text style={styles.metricsPlaceholderText}>Metrics Placeholder</Text>
                </View>
                <View style={styles.metricsContainer}>
                    <Text style={styles.metricsPlaceholderText}>Metrics Placeholder</Text>
                </View>
            </View>
        );

        return (
            <ScrollView contentContainerStyle={styles.container}>
                {button}
                {metricsContent}
            </ScrollView>
        );
    }
};

export default DashboardScreen;

const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    helloMessage: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10
    },
    createNewPlanInSettingsText: {
        width: "70%",
        textAlign: 'center',
        fontStyle: 'italic'
    },
    buttonContainer: {
        alignItems: 'center'
    },
    metricsPlaceholderText: {
        fontSize: 18
    },
    metricsContainer: {
        marginTop: 25,
        backgroundColor: "gray",
        alignSelf: 'center',
        width: "90%",
        height: 200
    },
    welcomeMessage: {
        margin: 10,
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold'
    },
    newUserContainer: {
        padding: 15,
        alignItems: 'center'
    },
    createNewWorkoutText: {
        paddingTop: 15,
        textAlign: 'center',
        fontSize: 18
    },
    completedWorkoutPlanText: {
        textAlign: 'center',
        fontSize: 18,
        fontStyle: 'italic'
    }
});