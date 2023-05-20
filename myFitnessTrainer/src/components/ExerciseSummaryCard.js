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
            if (
                exerciseStats[statLabel] !== null &&
                statLabel !== "time_in_sec"
            ) {
                displayStatsText = displayStatsText.concat(
                    `${displayStatsLabelKey[statLabel]}: ${
                        exerciseStats[statLabel]
                    }${addMetric(statLabel)} `
                );
            }
            return displayStatsText;
        });
        return displayStatsText;
    };

    const recommendedExerciseStats = (
        <View style={styles.innerContainers}>
            <Text style={styles.exerciseNameText}>
                {exerciseName} {displayStats(exerciseStats)}
            </Text>
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
    exerciseGoalTextContainer: {
        flexDirection: "row",
    },
    exerciseGoalText: {
        paddingRight: 10,
    },
});
