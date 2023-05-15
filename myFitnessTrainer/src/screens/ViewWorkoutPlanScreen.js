import React from "react";
import { SectionList, StyleSheet, View, Text} from "react-native";
import CreateNewPlanButton from "../components/CreateNewPlanButton";

const ViewWorkoutPlanScreen = ({route}) => {
    console.log("route.params=", route.params)
    const { hasActiveWorkoutPlan, workoutPlanId, duration, fitnessGoal, fitnessLevel, startDate, daysCompleted, workoutsPerDay } = route.params;
    const formattedStartDate = new Date(startDate).toDateString();

    if (!hasActiveWorkoutPlan){
        return(
            <View style={styles.container}>
                <Text>No active workout plan; create one! {duration}</Text>
                <CreateNewPlanButton/>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Text>Duration: {duration} days</Text>
            <Text>Fitness Goal: {fitnessGoal}</Text>
            <Text>Fitness Level: {fitnessLevel}</Text>
            <Text>Start Date: {formattedStartDate}</Text>
            <Text>Days Completed: {daysCompleted}</Text>
            <Text>{"\n"}Exercises:</Text>
            <SectionList
                sections={workoutsPerDay}
                renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
                renderSectionHeader={({section}) => (
                    <Text style={styles.sectionHeader}>Day {section.id}</Text>
                )}
                keyExtractor={(item, index) => `basicListEntry-${index}-${item}`}
            />
        </View>
    );
}
    

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingBottom: 40
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
      },
      item: {
        padding: 10,
        height: 44,
      },
});

export default ViewWorkoutPlanScreen;
