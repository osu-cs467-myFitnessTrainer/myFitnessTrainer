import React from "react";
import { SectionList, StyleSheet, View, Text} from "react-native";
import CreateNewPlanButton from "../components/CreateNewPlanButton";
import DisplayActiveWorkoutPlan from "../components/DisplayActiveWorkoutPlan";
import DisplayNoActiveWorkoutPlan from "../components/DisplayNoActiveWorkoutPlan";

const ViewWorkoutPlanScreen = ({route}) => {
    const { hasActiveWorkoutPlan, duration, fitnessGoal, fitnessLevel, startDate, daysCompleted, workoutsPerDay } = route.params;
    console.log("hasActiveWorkoutPlan=", hasActiveWorkoutPlan)

    if (!hasActiveWorkoutPlan){
        // return(
        //     <View style={styles.container}>
        //         <Text>You currently have no active workout plans.</Text>
        //         <CreateNewPlanButton/>
        //     </View>
        // )
        return <DisplayNoActiveWorkoutPlan />;

    }
    return (
        <View style={styles.container}>
            <DisplayActiveWorkoutPlan duration={duration} fitnessLevel={fitnessLevel} fitnessGoal={fitnessGoal} startDate={startDate} daysCompleted={daysCompleted} workoutsPerDay={workoutsPerDay} />
        </View>
    )
        // <View style={styles.container}>
        //     <Text>Duration: {duration} days</Text>
        //     <Text>Fitness Goal: {fitnessGoal}</Text>
        //     <Text>Fitness Level: {fitnessLevel}</Text>
        //     <Text>Start Date: {formattedStartDate}</Text>
        //     <Text>Days Completed: {daysCompleted}</Text>
        //     <Text>{"\n"}Exercises:</Text>
        //     <SectionList
        //         sections={workoutsPerDay}
        //         renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
        //         renderSectionHeader={({section}) => (
        //             <Text style={styles.sectionHeader}>Day {section.id}</Text>
        //         )}
        //         keyExtractor={(item, index) => `basicListEntry-${index}-${item}`}
        //     />
        // </View>
}
    

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingBottom: 40
    },
});

export default ViewWorkoutPlanScreen;
