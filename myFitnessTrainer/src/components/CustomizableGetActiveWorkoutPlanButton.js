import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../firebaseConfig";
import { getDocumentId, getUserActivePlan  } from "../../databaseFunctions";

const CustomizableGetActiveWorkoutPlanButton = (props) => {  
    const navigation = useNavigation();
    const [workoutsPerDay, setWorkoutsPerDay] = useState([]);
    const handleCustomizableGetActiveWorkoutPlanButton = async () => {

        let hasActiveWorkoutPlan = false;
        let workoutPlanId = null;
        let dailyExercises = null;
        let daysCompleted = "";
        let duration = "";
        let fitnessGoal = "";
        let fitnessLevel = "";
        let startDate = "";
        let modification = ""

        const userId = await getDocumentId(
            "users",
            "email",
            auth.currentUser.email
        );
        let activeWorkoutPlan = await getUserActivePlan(userId)

        if (activeWorkoutPlan !== undefined){
            hasActiveWorkoutPlan = true;
            workoutPlanId = activeWorkoutPlan["id"];
            duration = activeWorkoutPlan["duration"];
            fitnessGoal = activeWorkoutPlan["fitness_goal"];
            fitnessLevel = activeWorkoutPlan["fitness_level"];
            startDate = activeWorkoutPlan["start_date"];
            daysCompleted = activeWorkoutPlan["days_completed"];
            dailyExercises = activeWorkoutPlan["daily_exercises"];  
            modification = activeWorkoutPlan["modification"];        
            
            for (const day_num in dailyExercises) {
                let exercises_for_the_day = []
                for (const exercise_num in dailyExercises[day_num]){
                    exercises_for_the_day.push(dailyExercises[day_num][exercise_num]["name"]);
                }
                workoutsPerDay.push({"id":parseInt(day_num)+1, "data":exercises_for_the_day })
            }
            setWorkoutsPerDay(workoutsPerDay);
        }

        navigation.navigate(props.routeTo, {
            hasActiveWorkoutPlan: hasActiveWorkoutPlan,
            workoutPlanId: workoutPlanId,
            duration: duration,
            fitnessGoal: fitnessGoal,
            fitnessLevel: fitnessLevel,
            startDate: startDate,
            daysCompleted: daysCompleted,
            workoutsPerDay: workoutsPerDay,
            modification: modification
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
