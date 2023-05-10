import React from "react";
import { StyleSheet, View, Text, Platform,  } from "react-native";

const ViewWorkoutPlanScreen = ({route}) => {
    const { itemId } = route.params;
    const { otherParam } = route.params;

    return (

        <View style={styles.container}>
            <Text>itemId: {JSON.stringify(itemId)}</Text>
            <Text style={styles.IntroText}>view workout plan</Text>
        </View>

    );
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
