import React from "react";
import { StyleSheet, View, Text, Platform, ScrollView} from "react-native";
import CreateNewPlanButton from "../components/CreateNewPlanButton";

const ViewWorkoutPlanScreen = ({route}) => {
    const { duration, fitnessGoal, fitnessLevel, startDate, daysCompleted, workoutsPerDay } = route.params;
    const formattedStartDate = new Date(startDate).toDateString();

    console.log("fitnessGoal=", fitnessGoal);


    let formattedExercisesPerDay = []
    for (const dayNum in workoutsPerDay){
        console.log("dayNum=", dayNum);


        formattedExercisesPerDay.push(<Text>Day {dayNum}{"\n"}</Text>);
        for (const exerciseNum in workoutsPerDay[dayNum]){
            console.log("workoutsPerDay[dayNum][exerciseNum]=", workoutsPerDay[dayNum][exerciseNum]);
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
    },
    IntroText: {
        fontSize: 15,
        textAlign: "center",
        marginBottom: 5
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center'
    },
    optionHeaderText: {
        fontSize: 18, 
        fontWeight: "bold",
        paddingTop: 8, 
        paddingBottom: 10
    },
    picker: {
        backgroundColor: Platform.OS == "android" ? "white" : ""
    },
    iosItemStyle : {
        height: 110
    },
    centeredInputContainer: {
        alignItems: "center",
        justifyContent: "center"
    },
    durationInput: {
        backgroundColor: "white",
        width: 250,
        textAlign: "center",
        fontSize: 18,
        padding: 10,
        marginTop: 10
    }
});

export default ViewWorkoutPlanScreen;
