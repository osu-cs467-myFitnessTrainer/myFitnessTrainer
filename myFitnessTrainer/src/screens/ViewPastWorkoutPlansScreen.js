import React from "react";
import { StyleSheet, View, Text, ScrollView} from "react-native";
import CreateNewPlanButton from "../components/CreateNewPlanButton";

const ViewPastWorkoutPlansScreen = ({route}) => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text>past workouts screen</Text>
            </View>
        </ScrollView>
    );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingBottom: 40
    }
});

export default ViewPastWorkoutPlansScreen;