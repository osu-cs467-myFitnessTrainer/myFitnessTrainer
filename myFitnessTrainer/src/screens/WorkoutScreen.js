import { useState } from 'react';
import { StyleSheet, View, Dimensions, Text } from "react-native";
import Carousel from 'react-native-reanimated-carousel';
import Dots from 'react-native-dots-pagination';
import EndWorkoutButton from "../components/EndWorkoutButton";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';

const width = Dimensions.get('window').width;

// FOR TESTING, WILL USE THE DAILY EXERCISES FROM DB
const testExercise = {
    default_exercise_stat: null,
    description: "this is the description",
    equipment: "test equipment",
    fitness_goal: "strength",
    fitness_level: "beginner",
    muscle_group: "lower body",
    name: "test exercise name",
    video: {
        female: "www.google.com",
        male: "www.google.com"
    }
};
// FOR TESTING, USE THE DAILY EXERCISES
const testExercisesDay0 = [testExercise,testExercise,testExercise,testExercise];

// adds additional card at end
const exerciseDeck = testExercisesDay0.concat([{name: "Finished Card"}]);

const WorkoutScreen = () => {
    const workoutLength = testExercisesDay0.length;
    const [exerciseIndex, setExerciseIndex] = useState(0);
    const [progress, setProgress] = useState(1/workoutLength);
    const height = Dimensions.get('window').height;

    const progressFooter = (
        <View style={styles.bottomProgressContainer}>
            <View style={styles.progressBarContainer}>
                <Progress.Bar
                    progress={progress}
                    pas
                    width={width * .8}
                    height={20}
                    color='#4682B4'
                />
            </View>
            <Text style={styles.progressText}>{exerciseIndex} of {workoutLength} exercises completed</Text>
        </View>
    );

    const renderCarouselItem = ({index}) => {
        const displayFinishCard = index === workoutLength;

        const FinishedCardContents = (
            <View style={styles.finishedCardContainer}>
                <Text style={styles.congratsText}>CONGRATS!</Text> 
                <Text style={styles.finishedWorkoutText}>You have completed today's exercises</Text>
                <EndWorkoutButton />
                <Text style={styles.viewWorkoutSummaryText}>Select 'Finish Workout' to view your workout summary.</Text>
            </View>
        );

        const content = displayFinishCard ? FinishedCardContents :
        (
            // TO DO: BUILD OUT THIS VIEW! (based on prototype)
            // probably separate out into own compnent which gets the needed exercise
            <View>
                <Text style={styles.exerciseNameText}>EXERCISE: {exerciseDeck[index].name.toUpperCase()}</Text>
            </View>
        );

        return (
            <View style={styles.cardViewContainer}>
                {content}
                <View style={styles.dots}>
                    <Dots 
                        length={workoutLength+1}
                        active={index}
                    />
                </View>
            </View>
        )
    }


    return (
        <View style={styles.container}>
            <GestureHandlerRootView>
            <Carousel 
                loop={false}
                width={width * 0.9}
                height={height * 0.80}
                autoPlay={false}
                // FOR TESTING, REMOVE AND PUT EXERCISE
                data={exerciseDeck}
                scrollAnimationDuration={500}
                onSnapToItem={(index) => {
                    console.log('current index', index), 
                    setExerciseIndex(index), 
                    setProgress((index) / workoutLength)
                    }
                }
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
    cardViewContainer : {
        flex: 1, 
        justifyContent: 'center',
        padding: 5,
        marginRight: 5,
        marginLeft: 5,
        marginTop: 15,
        marginBottom: 15,
        backgroundColor: "white",
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5
    },
    dots: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    progressBarContainer: {
        backgroundColor: "white",
        alignItems: 'center',
        width: width *0.8,
        alignSelf:'center',
        borderRadius: 20,
        marginTop: 5
    },
    bottomProgressContainer: {
        alignItems: 'center',
        width: Dimensions.get("window").width,
        height: 20,
        backgroundColor: "#C0C0C0",
        paddingBottom: 20,
        marginTop: 10,
        flex: 1,
        justifyContent: 'flex-end'
    },
    finishedCardContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    progressText: {
        fontSize: 18,
        marginTop: 5
    },
    exerciseNameText: {
        fontSize: 20,
        textAlign: 'center'
    },
    congratsText: {
        fontSize: 45,
        fontWeight: 'bold',
    },
    finishedWorkoutText: {
        fontSize: 15,
        textAlign: 'center'
    },
    viewWorkoutSummaryText: {
        textAlign: 'center',
        paddingTop: 10,
        fontStyle: 'italic',
        width: "75%"
    }
});

export default WorkoutScreen;
