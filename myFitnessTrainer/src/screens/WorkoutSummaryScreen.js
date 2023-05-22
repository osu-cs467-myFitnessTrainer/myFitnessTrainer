import { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import GoToDashboardButton from "../components/GoToDashboardButton";
import { getAllDocuments, getExercise } from "../../databaseFunctions";
import ExerciseSummaryCard from "../components/ExerciseSummaryCard";

const WorkoutSummaryScreen = ({ route }) => {
    const [workoutSessionStats, setWorkoutSessionStats] = useState([]);
    const [totalTimeElapsed, setTotalTimeElapsed] = useState(0);

    // reference to workout plan id that may or may not have finished its duration
    const activeWorkoutPlanId = route.params.workoutPlanId;
    const userId = route.params.userId;

    useEffect(() => {
        getWorkoutStatsSessionFromDB().then((result) => {
            setWorkoutSessionStats(result);
            setTotalTimeElapsed(calulateTotalTimeElapsed(result));
        });
    }, []);

    const calulateTotalTimeElapsed = (workoutSessionStats) => {
        let totalTime = 0;
        Object.keys(workoutSessionStats).forEach((statId) => {
            totalTime +=
                workoutSessionStats[statId]["exercise_stats"]["time_in_sec"];
        });
        return totalTime;
    };

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
            <Text style={styles.exercisesCompletedText}>
                Exercises Completed
            </Text>
            <Text style={styles.timeElapsedText}>
                Total Time Elapsed: {totalTimeElapsed} seconds
            </Text>
            <View style={styles.summaryCardContainer}>
                <ScrollView>
                    {
                        /* <Text>{JSON.stringify(workoutSessionStats)}</Text> */

                        Object.keys(workoutSessionStats).map((statId) => {
                            return (
                                <ExerciseSummaryCard
                                    exerciseName={
                                        workoutSessionStats[statId][
                                            "exercise_name"
                                        ]
                                    }
                                    exerciseStats={
                                        workoutSessionStats[statId][
                                            "exercise_stats"
                                        ]
                                    }
                                    key={statId}
                                />
                            );
                        })
                    }
                </ScrollView>
            </View>
            <GoToDashboardButton style={styles.buttonContainer} />
        </View>
    );
};

const styles = StyleSheet.create({
    timeElapsedText: {
        fontSize: 15,
        marginBottom: 10,
    },
    exercisesCompletedText: {
        marginTop: 30,
        marginBottom: 10,
        fontSize: 20,
        fontWeight: "bold",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    summaryCardContainer: {
        height: 400,
        alignItems: "center",
        width: "80%",
    },
    buttonContainer: {
        marginBottom: 15,
    },
});

export default WorkoutSummaryScreen;
