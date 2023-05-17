import { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Dimensions, Text, ActivityIndicator } from "react-native";
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
import { auth } from "../../firebaseConfig";
import ExerciseDisplay from "../components/ExerciseDisplay";

const width = Dimensions.get("window").width;

const WorkoutScreen = ({ route }) => {
    // route.params contains the daily exercise set. 'params' is defined when navigating to 'WorkoutScreen' page from the 'StartWorkoutButton'
    const { dailyExerciseSet, daysCompleted, workoutPlanId } = route.params;

    // adds additional card at end
    const exerciseDeck = dailyExerciseSet.concat([{ name: "Finished Card" }]);

    const [isLoading, setIsLoading] = useState(true);
    const workoutLength = dailyExerciseSet.length;
    const [currentExerciseStats, setCurrentExerciseStats] = useState({
        incline: null,
        reps: null,
        resistence: null,
        sets: null,
        speed: null,
        time_in_sec: 300,
        weight: null
    });
    const [exerciseIndex, setExerciseIndex] = useState(0);
    const [progress, setProgress] = useState(0 / workoutLength);
    const height = Dimensions.get("window").height;

    const cardIndexRef = useRef(null);

    // when enter a workout, retrieve exercise_stats for the exercises
    useEffect(() => {
        getAllDocuments("exercise_stats").then((retrievedDocuments) => {
            for (let index = 0; index < workoutLength; index++) {
                const exerciseStatRef = dailyExerciseSet[index]["default_exercise_stat_id"];
                const targetStatId = exerciseStatRef["path"].split("/")[1];
                const filteredStats = Object.keys(retrievedDocuments).filter(
                (statId) => statId === targetStatId
                );
                // add default_exercise_stat to the deck
                exerciseDeck[index]["default_exercise_stat"] = retrievedDocuments[filteredStats];
            }
            setIsLoading(false);
        });
    }, []);

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

    const submitStatsToDB = async (index) => {
        const exercise = dailyExerciseSet[exerciseIndex];
        const exerciseId = await getDocumentId(
            "exercises",
            "name",
            exercise["name"]
        );

        const userId = await getDocumentId(
            "users",
            "email",
            auth.currentUser.email
        );

        const postObjectDate = new Date();
        const postObject = {
            completed: true,
            workout_day: daysCompleted,
            date: postObjectDate.toLocaleDateString("en-us"),
            workout_plan_id: workoutPlanId,
            exercise_id: exerciseId,
            user_id: userId,
            exercise_stats: currentExerciseStats,
        };
        postDocument("exercise_history", postObject);
        advanceToNextCard(index);
    };

    const advanceToNextCard = (index) => {
        cardIndexRef.current?.scrollTo({
            count: 1,
            animated: true,
        });
        setExerciseIndex(index + 1);
        setProgress(index / workoutLength);
    };
    const skipExercise = (index) => {
        advanceToNextCard(index);
    };
    const renderCarouselItem = ({ index }) => {

        if (isLoading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size='large' color="#4682B4"/>
                </View>
            )
        }
        const displayFinishCard = index === workoutLength;

        const FinishedCardContents = (
            <View style={styles.finishedCardContainer}>
                <Text style={styles.congratsText}>CONGRATS!</Text>
                <Text style={styles.finishedWorkoutText}>
                    You have completed today&apos;s exercises
                </Text>
                <EndWorkoutButton daysCompleted={daysCompleted} />
                <Text style={styles.viewWorkoutSummaryText}>
                    Select &apos;Finish Workout&apos; to view your workout
                    summary.
                </Text>
            </View>
        );

        const content = displayFinishCard ? (
            FinishedCardContents
        ) : (
            <ExerciseDisplay
                exercise={exerciseDeck[index]}
                index={index}
                handleOnSkip={() => skipExercise(index)}
                handleOnSubmit={() => submitStatsToDB(index)}
            />
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
                    ref={cardIndexRef}
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
