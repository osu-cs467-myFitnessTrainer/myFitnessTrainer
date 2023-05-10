import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { db, auth } from "../../firebaseConfig";

import { getDocumentId, getDocument  } from "../../databaseFunctions";
import { collection, query, where, getDocs } from "firebase/firestore";

const ViewWorkoutPlanButton = () => {
    // const [duration, setDuration] = useState(null)
    // const [fitnessGoal, setFitnessGoal] = useState(null);  
    // const [fitnessLevel, setFitnessLevel] = useState(null);    
    // const [startDate, setStartDate] = useState(null);   
    // const [daysCompleted, setDaysCompleted] = useState(null);    
    const navigation = useNavigation();


    const handleViewWorkoutPlanButton = async () => {



        const userId = await getDocumentId(
            "users",
            "email",
            auth.currentUser.email
        );
        let fitnessGoal = "";
        let duration = "";
        let fitnessLevel = "";
        let startDate = "";
        let daysCompleted = "";




        // https://cloud.google.com/firestore/docs/query-data/queries
        const workoutPlanRef = collection(db, "workout_plans");
        const q = query(workoutPlanRef, where("user_id", "==", userId));
        console.log("q=", q);
        const querySnapshot = await getDocs(q);
        console.log("querySnapshot=", querySnapshot)
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            console.log("active = ", doc.data()["active"]);

            // TODO: currently, user can have more than one active plan. Ex: user_id == UsC5EJWesjtMogefkvX4
            // See TODO in GenerateNewPlanAlgoButton.js for more information
            // For now, we'll just grab the first workout plan that is active
            if (doc.data()["active"] == true){
                console.log("duration=", doc.data()["duration"])

                // setDuration(doc.data()["duration"]);
                duration = doc.data()["duration"];
                fitnessGoal = doc.data()["fitness_goal"];
                fitnessLevel = doc.data()["fitness_level"];
                startDate = doc.data()["start_date"];
                daysCompleted = doc.data()["days_completed"];
            }
        });



        navigation.navigate("View Workout Plan", {
            duration: duration,
            fitnessGoal: fitnessGoal,
            fitnessLevel: fitnessLevel,
            startDate: startDate,
            daysCompleted: daysCompleted,
          });
    };

    return (
        <TouchableOpacity style={styles.button} onPress={handleViewWorkoutPlanButton}>
            <Text style={styles.buttonText}>View Workout Plan</Text>
        </TouchableOpacity>
    );
};

export default ViewWorkoutPlanButton;

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
