import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { db, auth } from "../../firebaseConfig";
import { getDocumentId  } from "../../databaseFunctions";
import { collection, query, where, getDocs } from "firebase/firestore";
import CustomizableGetActiveWorkoutPlanButton from "./CustomizableGetActiveWorkoutPlanButton";

// https://firebase.google.com/docs/firestore/query-data/queries#compound_and_queries

// const DeleteWorkoutPlanButton = () => {
//     const navigation = useNavigation();

//     const handleDeleteWorkoutPlan = async () => {
//         // get curr, active plan
//         const userId = await getDocumentId(
//             "users",
//             "email",
//             auth.currentUser.email
//         );
//         const workoutPlanRef = collection(db, "workout_plans");
//         const q = query(workoutPlanRef, where("user_id", "==", userId), where("active", "==", true));
//         const querySnapshot = await getDocs(q);
//         let hasActiveWorkoutPlan = false;
//         let workoutPlanId = null;
//         querySnapshot.forEach((doc) => {
//             workoutPlanId = doc.id;
//             hasActiveWorkoutPlan = doc.data()["active"];
//             // TODO: send metrics about existing current active plan 
//         });
//         // console.log("hasActiveWorkoutPlan=", hasActiveWorkoutPlan);
//         navigation.navigate("Delete Workout Plan", {
//             hasActiveWorkoutPlan: hasActiveWorkoutPlan,
//             workoutPlanId: workoutPlanId
//           });
//     };

//     return (
//         <TouchableOpacity style={styles.button} onPress={handleDeleteWorkoutPlan}>
//             <Text style={styles.buttonText}>Delete Workout Plan</Text>
//         </TouchableOpacity>
//     );
// };

const DeleteWorkoutPlanButton = () => {
    return (
        <View>
          <CustomizableGetActiveWorkoutPlanButton routeTo="Delete Workout Plan" textInButton="Delete Workout Plan" buttonStyle="deleteButton" buttonTextStyle="deleteButtonText" />
        </View>
    );
};

export default DeleteWorkoutPlanButton;

// const styles = StyleSheet.create({
//     deleteButton: {
//         backgroundColor: '#8B0000',
//         width: '75%',
//         padding: 15,
//         borderRadius: 10,
//         alignItems: 'center',
//         marginTop: 40
//     },
//     deleteButtonText: {
//         color: 'white',
//         fontWeight: 800,
//         fontSize: 16
//     },
// })