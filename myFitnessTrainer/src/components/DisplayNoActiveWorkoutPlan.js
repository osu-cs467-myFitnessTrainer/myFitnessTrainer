import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import CreateNewPlanButton from "./CreateNewPlanButton";

const DisplayNoActiveWorkoutPlan = () => {
    return(
        <View style={styles.container}>
            <Text>You currently have no active workout plans.</Text>
            <CreateNewPlanButton/>
        </View>
    )
  };

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


export default DisplayNoActiveWorkoutPlan;