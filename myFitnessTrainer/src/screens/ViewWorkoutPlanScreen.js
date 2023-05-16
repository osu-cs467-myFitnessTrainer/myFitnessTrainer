import React from "react";
import { StyleSheet, View } from "react-native";
import DisplayActiveWorkoutPlan from "../components/DisplayActiveWorkoutPlan";
import DisplayNoActiveWorkoutPlan from "../components/DisplayNoActiveWorkoutPlan";

const ViewWorkoutPlanScreen = ({route}) => {
    const { hasActiveWorkoutPlan, duration, fitnessGoal, fitnessLevel, startDate, daysCompleted, workoutsPerDay } = route.params;
    console.log("hasActiveWorkoutPlan=", hasActiveWorkoutPlan)

    if (!hasActiveWorkoutPlan){
        return <DisplayNoActiveWorkoutPlan />;

    }
    return (
        <View style={styles.container}>
            <DisplayActiveWorkoutPlan duration={duration} fitnessLevel={fitnessLevel} fitnessGoal={fitnessGoal} startDate={startDate} daysCompleted={daysCompleted} workoutsPerDay={workoutsPerDay} />
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
