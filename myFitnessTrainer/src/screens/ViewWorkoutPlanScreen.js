import React from "react";
import { StyleSheet, View } from "react-native";
import DisplayActiveWorkoutPlan from "../components/DisplayActiveWorkoutPlan";
import DisplayNoActiveWorkoutPlan from "../components/DisplayNoActiveWorkoutPlan";

const ViewWorkoutPlanScreen = ({route}) => {
    const { hasActiveWorkoutPlan, duration, fitnessGoal, fitnessLevel, startDate, daysCompleted, workoutsPerDay, modification } = route.params;

    if (!hasActiveWorkoutPlan){
        return <DisplayNoActiveWorkoutPlan />;

    }
    return (
        <View style={styles.container}>
            <DisplayActiveWorkoutPlan duration={duration} fitnessLevel={fitnessLevel} fitnessGoal={fitnessGoal} startDate={startDate} daysCompleted={daysCompleted} workoutsPerDay={workoutsPerDay} modification={modification}/>
        </View>
    )
}
    

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingBottom: 40
    },
});

export default ViewWorkoutPlanScreen;
