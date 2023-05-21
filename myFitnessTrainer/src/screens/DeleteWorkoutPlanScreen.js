import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../firebaseConfig";
import { doc, deleteDoc, collection, query, where, getDocs  } from "firebase/firestore";
import DisplayActiveWorkoutPlan from "../components/DisplayActiveWorkoutPlan";
import DisplayNoActiveWorkoutPlan from "../components/DisplayNoActiveWorkoutPlan";

const DeleteWorkoutPlanScreen = ({route}) => {
    const [exerciseHistoriesWithWorkoutPlanId, setExerciseHistoriesWithWorkoutPlanId] = useState([]);
    const { hasActiveWorkoutPlan, workoutPlanId, duration, fitnessGoal, fitnessLevel, startDate, daysCompleted, workoutsPerDay, modification } = route.params;
    const navigation = useNavigation();

    const deleteWorkoutPlanInDBAndGoToConfirmationScreen = async () => {
        const exerciseHistoryRef = collection(db, "exercise_history");
        const q = query(exerciseHistoryRef, where("workout_plan_id", "==", workoutPlanId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            exerciseHistoriesWithWorkoutPlanId.push(doc.id)
            setExerciseHistoriesWithWorkoutPlanId(exerciseHistoriesWithWorkoutPlanId);
        });
        
        // delete each exercise_history with associated workout_plan_id
        for (const exerciseHistoryId of exerciseHistoriesWithWorkoutPlanId) {
            await deleteDoc(doc(db, "exercise_history", exerciseHistoryId));
        }
        // delete the active workout_plan
        await deleteDoc(doc(db, "workout_plans", workoutPlanId));
        
        navigation.navigate("Delete Workout Plan Confirmation");
    }

    const handleConfirmDeleteWorkoutPlan = () => {
        Alert.alert(
            "Are you sure you want to delete this workout plan?",
            "This action cannot be undone.",
            [
                { text: "Cancel", style: 'cancel', isPreferred: true, onPress: ()=> {}},
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: deleteWorkoutPlanInDBAndGoToConfirmationScreen,
                },
            ]
        );
    };


    if (!hasActiveWorkoutPlan){
        return <DisplayNoActiveWorkoutPlan />;
    } 
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handleConfirmDeleteWorkoutPlan}>
                <Text style={styles.buttonText}>Delete Workout Plan</Text>
            </TouchableOpacity>
            <DisplayActiveWorkoutPlan duration={duration} fitnessLevel={fitnessLevel} fitnessGoal={fitnessGoal} startDate={startDate} daysCompleted={daysCompleted} workoutsPerDay={workoutsPerDay} modification={modification}/>

        </View>
    )
}
    

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingBottom: 40,
        gap: 20
    },
    button: {
        backgroundColor: '#8B0000',
        width: '75%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 800,
        fontSize: 16
    },
});

export default DeleteWorkoutPlanScreen;