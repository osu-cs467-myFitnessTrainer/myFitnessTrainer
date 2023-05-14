import React from "react";
import { StyleSheet, View, Text, ScrollView} from "react-native";
import CreateNewPlanButton from "../components/CreateNewPlanButton";

// TODO: in generatenewplanalgo, create deleted field or just delete document



const DeleteWorkoutPlanScreen = ({route}) => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text>delete workout screen</Text>
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

export default DeleteWorkoutPlanScreen;