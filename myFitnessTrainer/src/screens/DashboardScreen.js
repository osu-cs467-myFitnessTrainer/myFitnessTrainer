import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth, db, storage } from '../../firebaseConfig';
import StartWorkoutButton from "../components/StartWorkoutButton";
import CreateNewPlanButton from '../components/CreateNewPlanButton';
import { getDocumentId, getUsernameWithUserId, userhasWorkoutPlan, getUserActivePlan } from '../../databaseFunctions';
import { ScrollView } from 'react-native-gesture-handler';
import Avatar from '../components/Avatar';
import {doc, getDoc} from "firebase/firestore";
import { ref, getDownloadURL } from 'firebase/storage';
import WorkoutPlanProgress from '../components/WorkoutPlanProgress';

const avatarPixelSize = 100;

const DashboardScreen = () => {
    const [userIsNew, setUserIsNew] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [username, setUsername] = useState('user');
    const [userActiveWorkoutPlan, setUserActiveWorkoutPlan] = useState(null);
    const [avatarURL, setAvatarURL] = useState(null);

    // We'll fetch each time user enters Dashboard Screen
    useEffect(() => {
        const fetchWorkoutPlanAndAvatar = async () => {
            const userId = await getDocumentId("users", "email", auth.currentUser.email);

            // get user's avatar file name, then get URL
            const docRef = doc(db, "users", userId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const currentAvatarImageInDBRef = ref(storage, docSnap.data()["avatar_file_name"]);
                getDownloadURL(currentAvatarImageInDBRef)
                .then((url) => {
                    setAvatarURL(url)
                });
            }

            const userHasCreatedPlan = await userhasWorkoutPlan(userId);
            setUserIsNew(!userHasCreatedPlan);
            if (!userHasCreatedPlan) {
                // only display username to a new user
                const userName = await getUsernameWithUserId(userId);
                setUsername(userName);
            } else {
                // only  get active plan if we know they are not new
                const userActivePlan = await getUserActivePlan(userId);
                if (userActivePlan !== undefined){
                    setUserActiveWorkoutPlan(userActivePlan);
                }
            }        
            setIsLoading(false);
        }
        fetchWorkoutPlanAndAvatar().catch(error => console.log(error));
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
                <Avatar imgSource={avatarURL} pixelSize={avatarPixelSize} />
                <Text style={styles.welcomeMessage}>Welcome to myFitnessTrainer, {username}!</Text>
                <Text style={styles.createNewWorkoutText}>Create a new Workout Plan to get started</Text>
                <CreateNewPlanButton />
            </View>
        )
    }
    else { // user is not new
        let button = null;
        
        // user has active workout plan and is finished
        if (userActiveWorkoutPlan !== null && (userActiveWorkoutPlan["days_completed"] === userActiveWorkoutPlan["duration"])){
            button = (
                <View style={styles.buttonContainer}>
                    <Text style={styles.completedWorkoutPlanText}>Congrats!</Text>
                    <WorkoutPlanProgress fitness_goal={userActiveWorkoutPlan["fitness_goal"]} duration={userActiveWorkoutPlan["duration"]} days_completed={userActiveWorkoutPlan["days_completed"]}/>
                    <CreateNewPlanButton />
                </View>
            );
        }

        // user has active workout plan and it is not finished
        else if (userActiveWorkoutPlan !== null){
            button = (
                <View style={styles.buttonContainer}>
                    <StartWorkoutButton />
                    <WorkoutPlanProgress fitness_goal={userActiveWorkoutPlan["fitness_goal"]} duration={userActiveWorkoutPlan["duration"]} days_completed={userActiveWorkoutPlan["days_completed"]}/>
                </View>
            )
        }

        // user has no active plan (finished or unfinished) due to the active plan being deleted in settings
        else {
            button = (
                <View style={styles.buttonContainer}>
                    <Text style={styles.createNewWorkoutText}>No active workout plan found.</Text>
                    <CreateNewPlanButton />
                </View>
            )
        }

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
                <Avatar imgSource={avatarURL} pixelSize={avatarPixelSize} />
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
});