import { StyleSheet, Text, View } from "react-native";

const ExerciseSummaryCard = ({ exerciseName, exerciseStats }) => {
    const addMetric = (key) => {
        if (key === "weight") {
            return "(lbs)";
        }
        if (key === "speed") {
            return "(mph)";
        }
        if (key === "incline") {
            return "(%)";
        }
        if (key === "time_in_sec") {
            return "s";
        }
        return "";
    };

    const displayStats = (exerciseStats) => {
        const displayStatsLabelKey = {
            sets: "sets",
            time_in_sec: "time",
            reps: "reps",
            weight: "weight",
            resistance: "resistance",
            speed: "speed",
            incline: "incline",
        };
        let displayStatsText = "";
        Object.keys(exerciseStats).forEach((statLabel) => {
            console.log(exerciseStats[statLabel]);
            if (exerciseStats[statLabel] !== null) {
                displayStatsText = displayStatsText.concat(
                    `${displayStatsLabelKey[statLabel]}: ${
                        exerciseStats[statLabel]
                    }${addMetric(statLabel)} `
                );
            }
            return displayStatsText;
        });
        console.log(displayStatsText);
        return displayStatsText;
    };

    const recommendedExerciseStats = (
        <View style={styles.innerContainers}>
            <Text style={styles.exerciseNameText}>{exerciseName}</Text>
            <Text>{displayStats(exerciseStats)}</Text>
        </View>
    );

    return (
        <View style={styles.exerciseDisplayContainer}>
            {recommendedExerciseStats}
        </View>
    );
};

export default ExerciseSummaryCard;

const styles = StyleSheet.create({
    exerciseNameText: {
        fontSize: 15,
        textAlign: "left",
        fontWeight: "bold",
    },
    buttonsContainer: {
        justifyContent: "flex-end",
        flexDirection: "row",
        alignSelf: "center",
    },
    innerContainers: {
        backgroundColor: "#ECECEC",
        margin: 10,
        padding: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    exerciseDescriptionText: {
        fontSize: 16,
    },
    titles: {
        fontStyle: "italic",
        fontSize: 15,
        paddingTop: 5,
        fontWeight: "bold",
    },
    linkingText: {
        color: "blue",
        textDecorationLine: "underline",
        marginBottom: 5,
    },
    submittedText: {
        fontSize: 25,
        fontStyle: "italic",
        textAlign: "center",
        marginTop: 15,
    },
    stopTimerHintText: {
        textAlign: "center",
        fontStyle: "italic",
    },
    exerciseGoalTextContainer: {
        flexDirection: "row",
    },
    exerciseGoalText: {
        paddingRight: 10,
    },
    input: {
        backgroundColor: "white",
        margin: 5,
        borderRadius: 5,
        width: "50%",
        fontSize: 20,
    },
    recordExerciseStatsText: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
    },
    formContainer: {
        alignItems: "center",
    },
});
