import { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import GoToDashboardButton from "../components/GoToDashboardButton";
import { getAllDocuments, getDocumentId } from "../../databaseFunctions";
import { auth } from "../../firebaseConfig";

const WorkoutSummaryScreen = () => {
    const [workoutSessionStats, setWorkoutSessionStats] = useState([]);

    useEffect(() => {
        getWorkoutStatsSessionFromDB().then((result) => {
            setWorkoutSessionStats(result);
            console.log(workoutSessionStats);
        });
    }, []);

    const getWorkoutStatsSessionFromDB = async () => {
        const userId = await getDocumentId(
            "users",
            "email",
            auth.currentUser.email
        );

        const allExerciseStats = await getAllDocuments("exercise_history");

        // filter by user AND
        // get the most recent workout session date of user exercise stats
        const allUserStats = Object.keys(allExerciseStats).filter(
            (statId) =>
                allExerciseStats[statId]["workoutPlan_user_Id"] === userId
        );

        const allUserStatsDates = allUserStats.map(
            (statId) => allExerciseStats[statId]["date"]
        );

        let mostRecentDate;
        allUserStatsDates.forEach((statDate) => {
            if (mostRecentDate === undefined) {
                mostRecentDate = new Date(statDate);
            } else {
                mostRecentDate = Math.max(
                    new Date(mostRecentDate),
                    new Date(statDate)
                );
            }
        });
        const mostRecentWorkoutStatsId = allUserStats.filter(
            (statId) => allExerciseStats[statId]["date"] === mostRecentDate
        );

        const mostRecentWorkoutStats =
            allExerciseStats[mostRecentWorkoutStatsId];

        return mostRecentWorkoutStats;
    };

    getWorkoutStatsSessionFromDB();
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
