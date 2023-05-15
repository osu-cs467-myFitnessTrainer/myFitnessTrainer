import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { db, auth } from "../../firebaseConfig";
import { getDocumentId  } from "../../databaseFunctions";
import { collection, query, where, getDocs } from "firebase/firestore";
import CustomizableGetActiveWorkoutPlanButton from "./CustomizableGetActiveWorkoutPlanButton";

// const ViewWorkoutPlanButton = () => {  
//     const navigation = useNavigation();
//     const [workoutsPerDay, setWorkoutsPerDay] = useState({});
//     const handleViewWorkoutPlanButton = async () => {

//         const userId = await getDocumentId(
//             "users",
//             "email",
//             auth.currentUser.email
//         );
//         let dailyExercises = null;
//         let daysCompleted = "";
//         let duration = "";
//         let fitnessGoal = "";
//         let fitnessLevel = "";
//         let startDate = "";

//         // https://cloud.google.com/firestore/docs/query-data/queries
//         const workoutPlanRef = collection(db, "workout_plans");
//         const q = query(workoutPlanRef, where("user_id", "==", userId), where("active", "==", true));
//         const querySnapshot = await getDocs(q);
//         querySnapshot.forEach((doc) => {
//             // doc.data() is never undefined for query doc snapshots

//             // TODO: currently, user can have more than one active plan. Ex: user_id == UsC5EJWesjtMogefkvX4
//             // See TODO in GenerateNewPlanAlgoButton.js for more information
//             // For now, the variables will just get written with the latest active workout_plan that gets queried

//             duration = doc.data()["duration"];
//             fitnessGoal = doc.data()["fitness_goal"];
//             fitnessLevel = doc.data()["fitness_level"];
//             startDate = doc.data()["start_date"];
//             daysCompleted = doc.data()["days_completed"];
//             dailyExercises = doc.data()["daily_exercises"];
//             // TODO: in GenerateNewPlanAlgoButton, add modification to the postObject? Then we can display the modification for the workout plan on the ViewWorkoutPlanScreen.

//             for (const day_num in dailyExercises) {
//                 let exercises_for_the_day = []
//                 for (const exercise_num in dailyExercises[day_num]){
//                     exercises_for_the_day.push(dailyExercises[day_num][exercise_num]["name"]);
//                 }
//                 workoutsPerDay[parseInt(day_num)+1] = exercises_for_the_day
//             }
//             setWorkoutsPerDay(workoutsPerDay);
//         });


//         // console.log("GetActiveWorkoutPlanAlgo() returned:", GetActiveWorkoutPlanAlgo())


//         navigation.navigate("View Workout Plan", {
//             duration: duration,
//             fitnessGoal: fitnessGoal,
//             fitnessLevel: fitnessLevel,
//             startDate: startDate,
//             daysCompleted: daysCompleted,
//             workoutsPerDay: workoutsPerDay
//           });
//     };

//     return (
//         <TouchableOpacity style={styles.button} onPress={handleViewWorkoutPlanButton}>
//             <Text style={styles.buttonText}>View Workout Plan</Text>
//         </TouchableOpacity>
//     );
// };

const ViewWorkoutPlanButton = () => {  
    return (
        <View>
          <CustomizableGetActiveWorkoutPlanButton routeTo="View Workout Plan" textInButton="View Workout Plan" buttonStyle="viewButton" buttonTextStyle="viewButtonText" />
        </View>
    );
};
  

export default ViewWorkoutPlanButton;

// const styles = StyleSheet.create({
//     button: {
//         backgroundColor: "#4682B4",
//         width: "75%",
//         padding: 15,
//         borderRadius: 10,
//         alignItems: "center",
//         marginTop: 40,
//     },
//     buttonText: {
//         color: "white",
//         fontWeight: 800,
//         fontSize: 16,
//     },
// });
