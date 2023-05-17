import { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import GoToDashboardButton from "../components/GoToDashboardButton";
import {
    getAllDocuments,
    getDocumentId,
    getUserActivePlan,
} from "../../databaseFunctions";
import { auth } from "../../firebaseConfig";

const WorkoutSummaryScreen = () => {
    const [workoutSessionStats, setWorkoutSessionStats] = useState([]);

    useEffect(() => {
        getWorkoutStatsSessionFromDB().then((result) => {
            setWorkoutSessionStats(result);
        });
    }, []);

    const getWorkoutStatsSessionFromDB = async () => {
        const userId = await getDocumentId(
            "users",
            "email",
            auth.currentUser.email
        );

        const allExerciseStats = await getAllDocuments("exercise_history");

        // filter by user AND stats of the active plan
        const userActivePlan = await getUserActivePlan(userId);

        // get the most recent workout session date of user exercise stats
        const allUserStats = Object.keys(allExerciseStats).filter(
            (statId) =>
                allExerciseStats[statId]["user_id"] === userId &&
                allExerciseStats[statId]["workout_plan_id"] ===
                    userActivePlan["id"]
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
        // console.log(mostRecentWorkoutStatsIds);

        const mostRecentWorkoutStats = {};
        mostRecentWorkoutStatsIds.forEach((statId) => {
            mostRecentWorkoutStats[statId] = allExerciseStats[statId];
        });

        return mostRecentWorkoutStats;
    };

    // getWorkoutStatsSessionFromDB();
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
