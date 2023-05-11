import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { auth } from '../../firebaseConfig';
import StartWorkoutButton from "../components/StartWorkoutButton";
import CreateNewPlanButton from '../components/CreateNewPlanButton';


const DashboardScreen = () => {
    // TODO: WILL SHOW CREATE NEW PLAN OR START WORKOUT BUTTON DEPENDING ON IF THEY HAVE ACTIVE PLAN

    // TODO: FETCH WORKOUT PLAN FROM DB TO PASS DAILY EXERCISES TO 'StartWorkoutButton' COMPONENT. USING MOCK DATA FOR NOW
    const getWorkoutPlan = () => {
        const workoutPlan = {
            active: true,
            days_completed: 0,
            duration: 30,
            fitness_goal: "cardio",
            start_date: 1683307220331,
            daily_exercises: {
                0: [
                    {
                        default_exercise_stat: null,
                        description: "this is the description 1",
                        equipment: "test equipment 1",
                        fitness_goal: "strength",
                        fitness_level: "beginner",
                        muscle_group: "lower body",
                        name: "test exercise name",
                        video: {
                            female: "www.google.com",
                            male: "www.google.com",
                        },
                    },
                    {
                        default_exercise_stat: null,
                        description: "this is the description 2",
                        equipment: "test equipment 2",
                        fitness_goal: "strength",
                        fitness_level: "beginner",
                        muscle_group: "lower body",
                        name: "test exercise name",
                        video: {
                            female: "www.google.com",
                            male: "www.google.com",
                        },
                    },
                ],
            },
        };
        return workoutPlan;
    };

    // get the daily exercise set from the daily exercises. The key targeted is "days_completed" in order to get the correct exercise set
    const getDailyExercises = () => {
        const testWorkoutPlan = getWorkoutPlan();
        const dailyExercises = testWorkoutPlan["daily_exercises"];
        const todaysWorkout = dailyExercises[testWorkoutPlan["days_completed"]];
        return todaysWorkout;
    };

    return (
        <View style={styles.container}>
            <Text>Email: {auth.currentUser?.email}</Text>
            <Text>This screen is the Dashboard! Woot!</Text>
            <CreateNewPlanButton />
            <StartWorkoutButton dailyExercises={getDailyExercises()} />
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