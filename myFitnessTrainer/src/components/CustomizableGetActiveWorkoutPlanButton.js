import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { db, auth } from "../../firebaseConfig";
import { getDocumentId  } from "../../databaseFunctions";
import { collection, query, where, getDocs } from "firebase/firestore";

const CustomizableGetActiveWorkoutPlanButton = (props) => {  
    const navigation = useNavigation();
    const [workoutsPerDay, setWorkoutsPerDay] = useState([]);
    const handleCustomizableGetActiveWorkoutPlanButton = async () => {
        console.log("in CustomizableGetActiveWorkoutPlanButton.js");
        console.log("props=", props);
        const userId = await getDocumentId(
            "users",
            "email",
            auth.currentUser.email
        );
        let hasActiveWorkoutPlan = false;
        let workoutPlanId = null;
        let dailyExercises = null;
        let daysCompleted = "";
        let duration = "";
        let fitnessGoal = "";
        let fitnessLevel = "";
        let startDate = "";

        // https://cloud.google.com/firestore/docs/query-data/queries
        const workoutPlanRef = collection(db, "workout_plans");
        const q = query(workoutPlanRef, where("user_id", "==", userId), where("active", "==", true));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots

            // TODO: currently, user can have more than one active plan. Ex: user_id == UsC5EJWesjtMogefkvX4
            // See TODO in GenerateNewPlanAlgoButton.js for more information
            // For now, the variables will just get written with the latest active workout_plan that gets queried
            hasActiveWorkoutPlan = true;
            workoutPlanId = doc.id;
            duration = doc.data()["duration"];
            fitnessGoal = doc.data()["fitness_goal"];
            fitnessLevel = doc.data()["fitness_level"];
            startDate = doc.data()["start_date"];
            daysCompleted = doc.data()["days_completed"];
            dailyExercises = doc.data()["daily_exercises"];
            // TODO: in GenerateNewPlanAlgoButton, add modification to the postObject? Then we can display the modification for the workout plan on the ViewWorkoutPlanScreen.

            for (const day_num in dailyExercises) {
                let exercises_for_the_day = []
                for (const exercise_num in dailyExercises[day_num]){
                    exercises_for_the_day.push(dailyExercises[day_num][exercise_num]["name"]);
                }
                workoutsPerDay.push({"id":parseInt(day_num)+1, "data":exercises_for_the_day })
                // workoutsPerDay[parseInt(day_num)+1] = exercises_for_the_day
            }
            setWorkoutsPerDay(workoutsPerDay);
        });

        navigation.navigate(props.routeTo, {
            hasActiveWorkoutPlan: hasActiveWorkoutPlan,
            workoutPlanId: workoutPlanId,
            duration: duration,
            fitnessGoal: fitnessGoal,
            fitnessLevel: fitnessLevel,
            startDate: startDate,
            daysCompleted: daysCompleted,
            workoutsPerDay: workoutsPerDay
          });
    };

    return (
        <TouchableOpacity style={styles[props.buttonStyle]} onPress={handleCustomizableGetActiveWorkoutPlanButton}>
            <Text style={styles[props.buttonTextStyle]}>{props.textInButton}</Text>
        </TouchableOpacity>
    );
};

export default CustomizableGetActiveWorkoutPlanButton;

const styles = StyleSheet.create({
    viewButton: {
        backgroundColor: "#4682B4",
        width: "75%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 40,
    },
    viewButtonText: {
        color: "white",
        fontWeight: 800,
        fontSize: 16,
    },
    deleteButton: {
        backgroundColor: '#8B0000',
        width: '75%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 800,
        fontSize: 16
    },
});
