import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth, db, storage } from '../../firebaseConfig';
import StartWorkoutButton from "../components/StartWorkoutButton";
import CreateNewPlanButton from '../components/CreateNewPlanButton';
import { getDocumentId, getUsernameWithUserId, userhasWorkoutPlan, getUserActivePlan } from '../../databaseFunctions';
import { ScrollView } from 'react-native-gesture-handler';
import Avatar from '../components/Avatar';
import { ref, getDownloadURL } from 'firebase/storage';
import WorkoutPlanProgress from '../components/WorkoutPlanProgress';
import {
    collection,
    getDocs,
    getDoc,
    doc,
    query,
    where,
    and,
} from "firebase/firestore";

const avatarPixelSize = 100;

const DashboardScreen = () => {
    const [userIsNew, setUserIsNew] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [username, setUsername] = useState('user');
    const [userActiveWorkoutPlan, setUserActiveWorkoutPlan] = useState(null);
    const [avatarURL, setAvatarURL] = useState(null);
    const [timeElapsedData, setTimeElapsedData] = useState([]);
    const [exercisePRs, setExercisePRs] = useState({});

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
                
                    // get data for Time Elapsed Per Workout Day graph
                    let days_to_time_in_sec = []
                    for (let day = 0; day < userActivePlan["days_completed"]; day++){
                        let day_to_time_in_sec = {}
                        const q = query(
                            collection(db, "exercise_history"),
                            and(where("workout_plan_id", "==", userActivePlan["id"]), where("workout_day", "==", day))
                        );
                        const querySnapshot = await getDocs(q);
                        let elapsedTimePerDay = 0
                        querySnapshot.forEach((doc) => {
                            elapsedTimePerDay += doc.data()["exercise_stats"]["time_in_sec"]
                        });
                        day_to_time_in_sec["day"] = day+1
                        day_to_time_in_sec["elapsedTimePerDay"] = elapsedTimePerDay
                        days_to_time_in_sec.push(day_to_time_in_sec)
                    }
                    setTimeElapsedData(days_to_time_in_sec);

                    // get data for exercise PRs
                    const q = query(
                        collection(db, "exercise_history"),
                        and(where("workout_plan_id", "==", userActivePlan["id"]), where("completed", "==", true))
                    );
                    const querySnapshot = await getDocs(q);
                    let local_exercise_PRs = {}

                    querySnapshot.forEach((doc) => {
                        // if doc.data()["exercise_id"] in local_exercise_PRs
                        if (doc.data()["exercise_id"] in local_exercise_PRs){
                            if (userActivePlan["fitness_goal"] == "strength"){
                                if (local_exercise_PRs[doc.data()["exercise_id"]]["weight"] < doc.data()["exercise_stats"]["weight"]){
                                    local_exercise_PRs[doc.data()["exercise_id"]]["reps"] = doc.data()["exercise_stats"]["reps"];
                                    local_exercise_PRs[doc.data()["exercise_id"]]["sets"] = doc.data()["exercise_stats"]["sets"];
                                    local_exercise_PRs[doc.data()["exercise_id"]]["weight"] = doc.data()["exercise_stats"]["weight"];
                                }
                            }
                            else if ((userActivePlan["fitness_goal"] == "flexibility")){
                                if (local_exercise_PRs[doc.data()["exercise_id"]]["reps"] < doc.data()["exercise_stats"]["reps"]){
                                    local_exercise_PRs[doc.data()["exercise_id"]]["reps"] = doc.data()["exercise_stats"]["reps"];
                                }
                            }
                            else {  // userActivePlan["fitness_goal"] == "cardio"
                                if (local_exercise_PRs[doc.data()["exercise_id"]]["speed"] !== null) {
                                    if (local_exercise_PRs[doc.data()["exercise_id"]]["speed"] < doc.data()["exercise_stats"]["speed"]){
                                        local_exercise_PRs[doc.data()["exercise_id"]]["speed"] = doc.data()["exercise_stats"]["speed"];
                                    }                                    
                                }
                                else {
                                    if (local_exercise_PRs[doc.data()["exercise_id"]]["time_in_sec"] < doc.data()["exercise_stats"]["time_in_sec"]){
                                        local_exercise_PRs[doc.data()["exercise_id"]]["time_in_sec"] = doc.data()["exercise_stats"]["time_in_sec"];
                                    }
                                }
                            }
                        } 
                        // else, doc.data()["exercise_id"] NOT in local_exercise_PRs add exercise_stats
                        else {
                            local_exercise_PRs[doc.data()["exercise_id"]] = {
                                "reps": doc.data()["exercise_stats"]["reps"],
                                "sets": doc.data()["exercise_stats"]["sets"],
                                "weight": doc.data()["exercise_stats"]["weight"],
                                "incline": doc.data()["exercise_stats"]["incline"],
                                "resistance": doc.data()["exercise_stats"]["resistance"],
                                "speed": doc.data()["exercise_stats"]["speed"],
                                "time_in_sec": doc.data()["exercise_stats"]["time_in_sec"],
                            }
                        }
                    });
                    // replace exercise Id keys with exercise name keys
                    for (const exerciseId in local_exercise_PRs) {
                        const exerciseDocRef = doc(db, "exercises", exerciseId);
                        const exerciseDocSnap = await getDoc(exerciseDocRef);
                        local_exercise_PRs[exerciseDocSnap.data()["name"]] = local_exercise_PRs[exerciseId]
                        delete local_exercise_PRs[exerciseId]
                    }                        
                    setExercisePRs(local_exercise_PRs);
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
                    <WorkoutPlanProgress fitness_goal={userActiveWorkoutPlan["fitness_goal"]} duration={userActiveWorkoutPlan["duration"]} days_completed={userActiveWorkoutPlan["days_completed"]} timeElapsedData={timeElapsedData} exercisePRs={exercisePRs}/>
                    <CreateNewPlanButton />
                </View>
            );
        }

        // user has active workout plan and it is not finished
        else if (userActiveWorkoutPlan !== null){
            button = (
                <View style={styles.buttonContainer}>
                    <StartWorkoutButton />
                    <WorkoutPlanProgress fitness_goal={userActiveWorkoutPlan["fitness_goal"]} duration={userActiveWorkoutPlan["duration"]} days_completed={userActiveWorkoutPlan["days_completed"]} timeElapsedData={timeElapsedData} exercisePRs={exercisePRs}/>
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

        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Avatar imgSource={avatarURL} pixelSize={avatarPixelSize} />
                {button}
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