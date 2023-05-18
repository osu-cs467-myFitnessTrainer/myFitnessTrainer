import { Linking, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import SkipExerciseButton from "../components/SkipExerciseButton";
import SubmitExerciseStatsButton from "../components/SubmitExerciseStatsButton";
import StartExerciseButton from "../components/StartExerciseButton";
import StopExerciseButton from "../components/StopExerciseButton";
import Stopwatch from '../components/StopWatch';

const ExerciseDisplay = (
    {
        exercise,
        index,
        handleOnSkip,
        handleOnSubmit,
        setCurrentExerciseStats
    }
) => {
    // used for logic on what to display to users:
    // start - show the start and skip buttons
    // progressing - show the timer and pause/stop buttons
    // finished - show the inputs for user and submit button
    // submitted - submitted to the db
    const [currentStage, setCurrentStage] = useState("start");

    // TO DO: RECORD AND SEND STATS TO DB
    // exercise stats
    const [displayRecordExercise, setDisplayRecordExercise] = useState(false);
    const [timeInSeconds, setTimeInSeconds] = useState(0);
    const [reps, setReps] = useState(null);
    const [sets, setSets] = useState(null);
    const [incline, setIncline] = useState(null);
    const [resistence, setResistence] = useState(null);
    const [speed, setSpeed] = useState(null);
    const [weight, setWeight] = useState(null);

    const handleSubmit = () => {
        setCurrentExerciseStats({
            incline: incline,
            reps: reps,
            resistence: resistence,
            sets: sets,
            speed: speed,
            time_in_sec: timeInSeconds,
            weight: weight
        });
        handleOnSubmit();
        setCurrentStage("submitted");
    }

    const recommendedExerciseStats = (
        <View style={styles.innerContainers}>
            <Text>Recommended Exercise Goals to Reach</Text>
            {
                    Object.entries(exercise.default_exercise_stat).map(([key, value]) => {
                        if (value !== null) {
                            return (
                                <Text
                                    key={key.concat("-", index)}
                                >
                                    {key}: {value}
                                </Text>
                            )
                        }
                    })
                }
        </View>
    );

    const exerciseName = (
        <Text style={styles.exerciseNameText}>
            {exercise.name.toUpperCase()}
        </Text>
    );

    const videoLinks = (
        <View style={styles.innerContainers}>
            <Text style={styles.titles}>videos</Text>
            <Text style={styles.linkingText} onPress={()=> Linking.openURL(exercise.video["male"])}>
                Watch Example Video (male)
            </Text>
            <Text style={styles.linkingText} onPress={()=> Linking.openURL(exercise.video["female"])}>
                Watch Example Video (female)
            </Text>
        </View>
    );

    const exerciseDetails = (
        <View>
            <Text>equipment: {exercise.equipment}</Text>
            <Text>muscle group: {exercise.muscle_group}</Text>
        </View>
    );
    
    const exerciseDescription = (
        <View style={styles.innerContainers}>
            <Text style={styles.titles}>description</Text>
            <Text style={styles.exerciseDescriptionText}>
                {exercise.description}
            </Text>
            <Text style={styles.titles}>details</Text>
            {exerciseDetails}
        </View>
    );

    if (currentStage === "start") {
        return (
            <View>
                {exerciseName}
                {exerciseDescription}
                {videoLinks}
                {recommendedExerciseStats}
                <View style={styles.buttonsContainer}>
                    <StartExerciseButton handleOnStart={() => setCurrentStage("progressing")} />
                    <SkipExerciseButton handleOnSkip={handleOnSkip} />
                </View>
            </View>
        );
    }
    if (currentStage === "progressing") {
        return (
            <View style={styles.exerciseDisplayContainer}>
                {exerciseName}
                {exerciseDescription}
                {videoLinks}
                {recommendedExerciseStats}
                <Stopwatch 
                    setTimeInSeconds={setTimeInSeconds} 
                    setDisplayRecordExercise={setDisplayRecordExercise}
                />
                {
                    !displayRecordExercise ? 
                    (
                        <Text style={styles.stopTimerHintText}>Record your exercise time to meet your goals!</Text>
                    ) :
                    (
                        <View style={styles.buttonsContainer}>
                            <StopExerciseButton handleOnStop={()=> {setCurrentStage("finished")}}/>
                        </View>
                    )
                }
                
            </View>
        );
    }
    
    if (currentStage === "finished") {
        // they are at the finished stage, show inputs for their exercise stat
        // TO DO: Show input fields for user to add
        return (
            <View style={styles.exerciseDisplayContainer}>
                {exerciseName}
                {exerciseDescription}
                <View style={styles.buttonsContainer}>
                    <SubmitExerciseStatsButton handleOnSubmit={handleSubmit} />
                </View>
            </View>
        );
    }

    // user has submitted their exercise
    return (
        <View style={styles.exerciseDisplayContainer}>
            {exerciseName}
            {exerciseDescription}
            <Text style={styles.submittedText}>Submitted!</Text>
        </View>  
    );


};

export default ExerciseDisplay;

const styles = StyleSheet.create({
    exerciseNameText: {
        fontSize: 20,
        textAlign: "center",
        fontWeight: 'bold',
        marginTop: 5
    },
    buttonsContainer: {
        justifyContent: "flex-end",
        flexDirection: 'row',
        alignSelf: 'center'
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
        fontSize: 16
    },
    titles: {
        fontStyle: 'italic',
        fontSize: 15,
        paddingTop: 5,
        fontWeight: 'bold'
    },
    linkingText: {
        color: "blue",
        textDecorationLine: 'underline',
        marginBottom: 5
    },
    submittedText: {
        fontSize: 25,
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 15
    },
    stopTimerHintText: {
        textAlign: 'center',
        fontStyle: 'italic'
    }
});