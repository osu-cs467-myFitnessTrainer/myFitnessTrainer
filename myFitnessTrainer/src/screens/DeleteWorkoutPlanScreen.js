import React from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert} from "react-native";
import CreateNewPlanButton from "../components/CreateNewPlanButton";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";


const DeleteWorkoutPlanScreen = ({route}) => {
    const navigation = useNavigation();

    const deleteWorkoutPlanInDBAndGoToDashboard = async () => {
        workoutPlanId = route.params.workoutPlanId;
        // console.log("workoutPlanId to delete=", workoutPlanId);
        await deleteDoc(doc(db, "workout_plans", workoutPlanId));
        // TODO: delete exercise_history where workoutPlanId is referenced
        navigation.navigate("Dashboard");
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
                    onPress: deleteWorkoutPlanInDBAndGoToDashboard,
                },
            ]
        );
    };


    // console.log("route.params.hasActiveWorkoutPlan=", route.params.hasActiveWorkoutPlan);
    if (!route.params.hasActiveWorkoutPlan){
        return(
            <ScrollView>
            <View style={styles.container}>
                <Text>You currently have no active workout plans.</Text>
                <CreateNewPlanButton/>
            </View>
            </ScrollView>
        )   
    } 

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text>TODO: stuff about the current active plan here</Text>
                <TouchableOpacity style={styles.button} onPress={handleConfirmDeleteWorkoutPlan}>
                    <Text style={styles.buttonText}>Delete Workout Plan</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingBottom: 40
    },
    button: {
        backgroundColor: '#8B0000',
        width: '75%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40
    },
    buttonText: {
        color: 'white',
        fontWeight: 800,
        fontSize: 16
    },
});

export default DeleteWorkoutPlanScreen;