import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs, query, where, and } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { auth } from "../../firebaseConfig";
import { getDocumentId, postDocument } from "../../databaseFunctions";

/*
    Pass in the following props as the below types:
    - goal: Array<String>
    - level: String
    - duration: Int
    - modifications: Array<String>
*/
const GenerateNewPlanAlgoButton = ({
    goal,
    level,
    duration,
    exercisesPerDay,
}) => {
    // Test props for debugging
    goal = goal ?? "strength";
    level = level ?? "beginner";
    duration = duration ?? 5;
    exercisesPerDay = exercisesPerDay ?? 4;
    // modifications = modifications ?? ["legs"];

    const navigation = useNavigation();

    /*
    performs query to db for exercises collection based on goal and level survey result and returns an array of exercises
    */
    const getExercises = async (goal, level) => {
        const q = query(
            collection(db, "exercises"),
            filterExerciseQuery(goal, level)
        );
        const querySnapshot = await getDocs(q);
        const exercises = [];
        querySnapshot.forEach((doc) => {
            exercises.push(doc.data());
        });
        return exercises;
    };

    const createPlan = (exercises, duration, exercisesPerDay) => {
        const dailyExercises = {};

        for (let i = 0; i < duration; i++) {
            // An array of exercise set for the with arr.length = exercisesPerDay
            const dailyExerciseSet = [];
            for (let j = 0; j < exercisesPerDay; j++) {
                let randomIdx = Math.floor(Math.random() * exercises.length);
                dailyExerciseSet.push(exercises[randomIdx]);
            }
            dailyExercises[i] = dailyExerciseSet;
        }

        return dailyExercises;
    };

    // TODO: Need to add ability to filter with modifications
    const filterExerciseQuery = (goal, level) => {
        switch (level) {
            case "beginner":
                return and(
                    where("fitness_goal", "==", goal),
                    where("fitness_level", "==", "beginner")
                );
            case "intermediate":
                return and(
                    where("fitness_goal", "==", goal),
                    where("fitness_level", "==", "intermediate")
                );
            case "advanced":
                return and(
                    where("fitness_goal", "==", goal),
                    where("fitness_level", "==", "advanced")
                );
            default:
                break;
        }
    };
    /* 
        1. query all exercises with criteria goal, level, and modifications
        2. create plan by selecting number of exercises == duration, random based from query 
        3. add this plan to dailyExercisess collection
    */
    const handleCreateNewPlanAlgo = async () => {
        const retrievedExercises = await getExercises(goal, level);
        const dailyExercises = createPlan(
            retrievedExercises,
            duration,
            exercisesPerDay
        );
        const userId = await getDocumentId(
            "users",
            "email",
            auth.currentUser.email
        );

        const postObject = {
            active: true,
            daily_exercises: dailyExercises,
            duration: duration,
            fitness_goal: goal,
            fitness_level: level,
            user_id: userId,
            start_date: Date.now(),
            days_completed: 0,
        };
        await postDocument("workout_plans", postObject);

        navigation.replace("Dashboard");
    };

    return (
        <TouchableOpacity
            style={styles.button}
            onPress={handleCreateNewPlanAlgo}
        >
            <Text style={styles.buttonText}>Create Workout Plan</Text>
        </TouchableOpacity>
    );
};

export default GenerateNewPlanAlgoButton;

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




