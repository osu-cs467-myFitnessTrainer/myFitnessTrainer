import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import React, { useEffect, useState, forceUpdate } from 'react';
import { auth } from '../../firebaseConfig';
import StartWorkoutButton from "../components/StartWorkoutButton";
import CreateNewPlanButton from '../components/CreateNewPlanButton';
import { getDocumentId, getUsernameWithUserId, userHasActiveWorkoutPlan, userhasWorkoutPlan, getUserActivePlan } from '../../databaseFunctions';
import { ScrollView } from 'react-native-gesture-handler';
import { ProgressBar } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';

const DashboardScreen = () => {
    const isFocused = useIsFocused();
    console.log("isFocused=", isFocused)
    const [userIsNew, setUserIsNew] = useState(true);
    const [hasactiveWorkoutPlan, setHasActiveWorkoutPlan] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [username, setUsername] = useState('user');
    const [userActiveWorkoutPlan, setUserActiveWorkoutPlan] = useState(null);

    // We'll fetch each time user enters Dashboard Screen
    useEffect(() => {
        if (isFocused){
            console.log("in useEffect")
            const fetchWorkoutPlan = async () => {
                const userId = await getDocumentId("users", "email", auth.currentUser.email);
                const userHasCreatedPlan = await userhasWorkoutPlan(userId);
                setUserIsNew(!userHasCreatedPlan);
                if (!userHasCreatedPlan) {
                    // only display username to a new user
                    const userName = await getUsernameWithUserId(userId);
                    setUsername(userName);
                } else {
                    // only check and get active plan if we know they are not new
                    const userActivePlan = await getUserActivePlan(userId);
                    if (userActivePlan !== undefined){
                        setHasActiveWorkoutPlan(true);
                        setUserActiveWorkoutPlan(userActivePlan);
                    }
                }        
                setIsLoading(false);
            }
            fetchWorkoutPlan().catch(error => console.log(error));
        }
    }, [isFocused]);

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
                {/* <Text style={styles.createNewPlanInSettingsText}>You can create a new workout plan in Settings{"\n"}</Text> */}
                <Text>Goal: Improve {userActiveWorkoutPlan["fitness_goal"]}</Text>
                
                <Text>Your workout plan is {(100 * userActiveWorkoutPlan["days_completed"]) / userActiveWorkoutPlan["duration"]}% completed!</Text>
                <View style={styles.progressBar}>
                    <ProgressBar progress={userActiveWorkoutPlan["days_completed"] / userActiveWorkoutPlan["duration"]} color={styles.progressBarColor} />
                </View>
            </View>
        ):
        // if they don't have an active workout plan 
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
    },
    progressBar: {
        height: 1,
        width:"90%",
    },
    progressBarColor: "blue",
});