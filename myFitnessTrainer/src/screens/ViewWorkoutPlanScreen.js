import React from "react";
import { StyleSheet, View, Text, Platform, ScrollView} from "react-native";
import CreateNewPlanButton from "../components/CreateNewPlanButton";

const ViewWorkoutPlanScreen = ({route}) => {
    const { duration, fitnessGoal, fitnessLevel, startDate, daysCompleted, workoutsPerDay } = route.params;
    const formattedStartDate = new Date(startDate).toDateString();
    let formattedExercisesPerDay = []
    for (const dayNum in workoutsPerDay){
        formattedExercisesPerDay.push(<Text>Day {dayNum}{"\n"}</Text>);
        for (const exerciseNum in workoutsPerDay[dayNum]){
            formattedExercisesPerDay.push(<Text>{workoutsPerDay[dayNum][exerciseNum]}{"\n"}</Text>);
        }
        formattedExercisesPerDay.push(<Text>{"\n"}</Text>)
    }

    // if fitnessGoal is not empty, then there is an active plan
    if (fitnessGoal !== ""){
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text>Duration: {duration} days</Text>
                    <Text>Fitness Goal: {fitnessGoal}</Text>
                    <Text>Fitness Level: {fitnessLevel}</Text>
                    <Text>Start Date: {formattedStartDate}</Text>
                    <Text>Days Completed: {daysCompleted}</Text>
                    <Text>{"\n"}Exercises:</Text>
                    <Text>{formattedExercisesPerDay}</Text>
                </View>
            </ScrollView>
        );
    } 
    else {
        return(
            <ScrollView>
            <View style={styles.container}>
                <Text>No active workout plan; create one! {duration}</Text>
                <CreateNewPlanButton/>
            </View>
            </ScrollView>
        )

    }

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingBottom: 40
    }
});

export default ViewWorkoutPlanScreen;
