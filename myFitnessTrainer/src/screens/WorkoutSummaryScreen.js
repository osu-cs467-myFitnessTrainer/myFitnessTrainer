import { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import GoToDashboardButton from "../components/GoToDashboardButton";
import { getAllDocuments, getExercise } from "../../databaseFunctions";
import ExerciseSummaryCard from "../components/ExerciseSummaryCard";

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
        for (let i = 0; i < mostRecentWorkoutStatsIds.length; i++) {
            const statId = mostRecentWorkoutStatsIds[i];
            mostRecentWorkoutStats[statId] = allExerciseStats[statId];
            const exerciseId = mostRecentWorkoutStats[statId]["exercise_id"];
            const retrievedExercise = await getExercise(exerciseId);
            mostRecentWorkoutStats[statId]["exercise_name"] =
                retrievedExercise["name"];
        }

        return mostRecentWorkoutStats;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.congratsText}>
                Congrats!! You finished your workout!
            </Text>
            <Text style={styles.congratsText}>Exercises Completed</Text>
            {
                /* <Text>{JSON.stringify(workoutSessionStats)}</Text> */

                Object.keys(workoutSessionStats).map((statId) => {
                    return (
                        <ExerciseSummaryCard
                            exerciseName={
                                workoutSessionStats[statId]["exercise_name"]
                            }
                            exerciseStats={
                                workoutSessionStats[statId]["exercise_stats"]
                            }
                            key={statId}
                        />
                    );
                })
            }
            <GoToDashboardButton />
        </View>
    );
};

const styles = StyleSheet.create({
    congratsText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default WorkoutSummaryScreen;
