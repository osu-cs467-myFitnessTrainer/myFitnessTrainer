import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
    collection,
    getDocs,
    query,
    where,
    and,
    addDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { auth } from "../../firebaseConfig";

/*
    Pass in the following props as the below types:
    - goal: Array<String>
    - level: String
    - duration: Int
    - modifications: Array<String>
*/

const GenerateNewPlanAlgoButton = ({ goal, level, duration }) => {
    // Test props for debugging
    goal = goal ?? ["strength"];
    level = level ?? ["beginner"];
    duration = duration ?? 5;
    // modifications = modifications ?? ["legs"];

    const navigation = useNavigation();

    /* 
        1. query all exercises with criteria goal, level, and modifications
        2. create plan by selecting number of exercises == duration, random based from query 
        3. add this plan to workoutplans collection
    */
    const handleCreateNewPlanAlgo = async () => {
        const retrievedExercises = await getExercises(goal, level);
        const workoutPlan = createPlan(retrievedExercises, duration);
        const userId = await getUserId(auth.currentUser.email);
        await postToWorkoutPlans(
            workoutPlan,
            duration,
            goal,
            level,
            userId,
            db
        );
        navigation.replace("Dashboard");
    };

    return (
        <TouchableOpacity
            style={styles.button}
            onPress={handleCreateNewPlanAlgo}
        >
            <Text style={styles.buttonText}>Generate Fitness Plan</Text>
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

// HELPER FUNCTIONS

/*
    performs query to db for exercises collection based on goal and level survey result and returns an array of exercises
*/
const getExercises = async (goal, level) => {
    const q = query(collection(db, "exercises"), filterQuery(goal, level));
    const querySnapshot = await getDocs(q);
    const exercises = [];
    querySnapshot.forEach((doc) => {
        exercises.push(doc.data());
    });
    return exercises;
};

const createPlan = (exercises, duration) => {
    const workoutPlan = [];

    for (let i = 0; i < exercises.length && i < duration; i++) {
        let randomIdx = Math.floor(Math.random() * exercises.length);
        workoutPlan.push(exercises[randomIdx]);
    }
    return workoutPlan;
};

// TODO: Need to add ability to filter with modifications
const filterQuery = (goal, level) => {
    switch (level) {
        case "beginner":
            return and(
                where("fitness_goal", "array-contains-any", goal),
                where("fitness_level", "array-contains-any", ["beginner"])
            );
        case "intermediate":
            return and(
                where("fitness_goal", "array-contains-any", goal),
                where("fitness_level", "array-contains-any", [
                    "beginner",
                    "intermediate",
                ])
            );
        case "advanced":
            return and(
                where("fitness_goal", "array-contains-any", goal),
                where("fitness_level", "array-contains-any", [
                    "beginner",
                    "intermediate",
                    "advanced",
                ])
            );
        default:
            break;
    }
};

const postToWorkoutPlans = async (
    dailyExercises,
    duration,
    goal,
    level,
    userId,
    db
) => {
    const postObject = {
        active: "",
        duration_in_days: duration,
        fitness_goal: goal,
        fitness_level: level,
        workout_modification_id: "",
        user_id: userId,
        daily_exercises: dailyExercises,
    };

    const postRef = await addDoc(collection(db, "workout_plans"), postObject);
    return postRef;
};


const getUserId = async (userEmail) => {
    let userId;
    const q = query(collection(db, "users"), where("email", "==", userEmail));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        userId = doc.id;
    });
    return userId;
};
