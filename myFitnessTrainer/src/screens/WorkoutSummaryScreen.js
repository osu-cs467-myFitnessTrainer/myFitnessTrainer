import { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import GoToDashboardButton from "../components/GoToDashboardButton";
import { getAllDocuments } from "../../databaseFunctions";

const WorkoutSummaryScreen = ({ route }) => {
    const [workoutSessionStats, setWorkoutSessionStats] = useState([]);

    // reference to workout plan id that may or may not have finished its duration
    const activeWorkoutPlanId = route.params.workoutPlanId;
    const userId = route.params.userId;

    useEffect(() => {
        getWorkoutStatsSessionFromDB().then((result) => {
            setWorkoutSessionStats(result);
        });
    }, []);

    const getWorkoutStatsSessionFromDB = async () => {
        const allExerciseStats = await getAllDocuments("exercise_history");

        // get the most recent workout session date of user active exercise stats
        const allUserStats = Object.keys(allExerciseStats).filter(
            (statId) =>
                allExerciseStats[statId]["user_id"] === userId &&
                allExerciseStats[statId]["workout_plan_id"] ===
                    activeWorkoutPlanId
        );

        const allUserStatsWorkoutDays = allUserStats.map(
            (statId) => allExerciseStats[statId]["workout_day"]
        );

        let mostRecentWorkoutDay;

        allUserStatsWorkoutDays.forEach((workoutDay) => {
            if (mostRecentWorkoutDay === undefined) {
                mostRecentWorkoutDay = workoutDay;
            } else {
                mostRecentWorkoutDay = Math.max(
                    mostRecentWorkoutDay,
                    workoutDay
                );
            }
        });

        const mostRecentWorkoutStatsIds = allUserStats.filter((statId) => {
            return (
                allExerciseStats[statId]["workout_day"] === mostRecentWorkoutDay
            );
        });

        const mostRecentWorkoutStats = {};
        mostRecentWorkoutStatsIds.forEach((statId) => {
            mostRecentWorkoutStats[statId] = allExerciseStats[statId];
        });

        return mostRecentWorkoutStats;
    };

    return (
        <View style={styles.container}>
            <Text>{JSON.stringify(workoutSessionStats)}</Text>
            <GoToDashboardButton />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default WorkoutSummaryScreen;
