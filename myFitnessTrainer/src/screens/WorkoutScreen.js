import { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import Dots from "react-native-dots-pagination";
import EndWorkoutButton from "../components/EndWorkoutButton";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Progress from "react-native-progress";
import {
    getAllDocuments,
    postDocument,
    getDocumentId,
} from "../../databaseFunctions";
import SubmitExerciseStatsButton from "../components/SubmitExerciseStatsButton";
import { auth } from "../../firebaseConfig";

const width = Dimensions.get("window").width;

const WorkoutScreen = ({ route }) => {
    // route.params contains the daily exercise set. 'params' is defined when navigating to 'WorkoutScreen' page from the 'StartWorkoutButton'
    const dailyExerciseSet = route.params;

    // adds additional card at end
    const exerciseDeck = dailyExerciseSet.concat([{ name: "Finished Card" }]);

    const workoutLength = dailyExerciseSet.length;
    const [currentExerciseStats, setCurrentExerciseStats] = useState("");
    const [exerciseIndex, setExerciseIndex] = useState(0);
    const [progress, setProgress] = useState(0 / workoutLength);
    const height = Dimensions.get("window").height;

    // when exerciseIndex state changes, then we will fetch the new default exercise stats from DB
    // currentExerciseStats state will reflect the stats of the current exrercise shown on the card
    useEffect(() => {
        // the last card is not a valid exercise
        if (exerciseIndex < workoutLength - 1) {
            getAllDocuments("exercise_stats").then((retrievedDocuments) => {
                const exerciseStatRef =
                    dailyExerciseSet[exerciseIndex]["default_exercise_stat_id"];
                const targetStatId = exerciseStatRef["path"].split("/")[1];

                const filteredStats = Object.keys(retrievedDocuments).filter(
                    (statId) => statId === targetStatId
                );
                setCurrentExerciseStats(retrievedDocuments[filteredStats]);
            });
        }
    }, [exerciseIndex]);

    const progressFooter = (
        <View style={styles.bottomProgressContainer}>
            <View style={styles.progressBarContainer}>
                <Progress.Bar
                    progress={progress}
                    pas
                    width={width * 0.8}
                    height={20}
                    color="#4682B4"
                />
            </View>
            <Text style={styles.progressText}>
                {exerciseIndex} of {workoutLength} exercises completed
            </Text>
        </View>
    );

    const submitStatsToDB = async () => {
        const exercise = dailyExerciseSet[exerciseIndex];
        const exerciseId = await getDocumentId(
            "exercise_library",
            "name",
            exercise["name"]
        );

        const userId = await getDocumentId(
            "users",
            "email",
            auth.currentUser.email
        );
        const postObject = {
            completed: null,
            date: Date.now(),
            duration: null,
            exercise_ID: exerciseId === undefined ? null : exerciseId,
            exercises_fitness_goal: exercise["fitness_goal"],
            exercises_level: exercise["fitness_level"],
            workoutPlan_workout_modification: exercise["muscle_group"],
            workoutPlan_user_Id: userId,
            workoutPlan_user_avatar_id: null,
            exercise_stats: currentExerciseStats,
        };
        postDocument("exercise_history", postObject);
    };

    const renderCarouselItem = ({ index }) => {
        const displayFinishCard = index === workoutLength;

        const FinishedCardContents = (
            <View style={styles.finishedCardContainer}>
                <Text style={styles.congratsText}>CONGRATS!</Text>
                <Text style={styles.finishedWorkoutText}>
                    You have completed today&apos;s exercises
                </Text>
                <EndWorkoutButton />
                <Text style={styles.viewWorkoutSummaryText}>
                    Select &apos;Finish Workout&apos; to view your workout
                    summary.
                </Text>
            </View>
        );

        const content = displayFinishCard ? (
            FinishedCardContents
        ) : (
            // TO DO: BUILD OUT THIS VIEW! (based on prototype)
            // probably separate out into own compnent which gets the needed exercise
            <View>
                <Text style={styles.exerciseNameText}>
                    EXERCISE: {exerciseDeck[index].name.toUpperCase()}
                </Text>
                <Text style={styles.exerciseNameText}>
                    DESCRIPTION: {exerciseDeck[index].description}
                </Text>
                <Text style={styles.exerciseNameText}>
                    LEARN MORE: {exerciseDeck[index].video["female"]}
                </Text>
                <Text style={styles.exerciseNameText}>
                    LEARN MORE: {exerciseDeck[index].video["male"]}
                </Text>

                <Text style={styles.exerciseNameText}>DEFAULT STATS</Text>
                {
                    // TODO: FOR TESTING EXERCISE STATS RETRIEVAL, CAN REMOVE AFTER UI IS IMPLEMENTED
                    Object.keys(currentExerciseStats).map((key) => {
                        const value = currentExerciseStats[key];
                        if (value !== null) {
                            return (
                                <Text style={styles.exerciseNameText} key={key}>
                                    {key}: {value}
                                </Text>
                            );
                        }
                    })
                }
                <SubmitExerciseStatsButton handleOnSubmit={submitStatsToDB} />
            </View>
        );

        return (
            <View style={styles.cardViewContainer}>
                {content}
                <View style={styles.dots}>
                    <Dots length={workoutLength + 1} active={index} />
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <GestureHandlerRootView>
                <Carousel
                    loop={false}
                    width={width * 0.9}
                    height={height * 0.8}
                    autoPlay={false}
                    data={exerciseDeck}
                    scrollAnimationDuration={500}
                    onSnapToItem={(index) => {
                        console.log("current index", index),
                            setExerciseIndex(index),
                            setProgress(index / workoutLength);
                    }}
                    renderItem={renderCarouselItem}
                />
            </GestureHandlerRootView>
            {progressFooter}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    cardViewContainer: {
        flex: 1,
        justifyContent: "center",
        padding: 5,
        marginRight: 5,
        marginLeft: 5,
        marginTop: 15,
        marginBottom: 15,
        backgroundColor: "white",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    dots: {
        flex: 1,
        justifyContent: "flex-end",
    },
    progressBarContainer: {
        backgroundColor: "white",
        alignItems: "center",
        width: width * 0.8,
        alignSelf: "center",
        borderRadius: 20,
        marginTop: 5,
    },
    bottomProgressContainer: {
        alignItems: "center",
        width: Dimensions.get("window").width,
        height: 20,
        backgroundColor: "#C0C0C0",
        paddingBottom: 20,
        marginTop: 10,
        flex: 1,
        justifyContent: "flex-end",
    },
    finishedCardContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    progressText: {
        fontSize: 18,
        marginTop: 5,
    },
    exerciseNameText: {
        fontSize: 20,
        textAlign: "center",
    },
    congratsText: {
        fontSize: 45,
        fontWeight: "bold",
    },
    finishedWorkoutText: {
        fontSize: 15,
        textAlign: "center",
    },
    viewWorkoutSummaryText: {
        textAlign: "center",
        paddingTop: 10,
        fontStyle: "italic",
        width: "75%",
    },
});

export default WorkoutScreen;
