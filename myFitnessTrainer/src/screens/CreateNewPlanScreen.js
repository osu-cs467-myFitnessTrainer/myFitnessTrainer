import { StyleSheet, View, Text, Platform } from "react-native";
import { Picker } from '@react-native-picker/picker';
import NumericInput from 'react-native-numeric-input';
import { useState } from "react";
import GenerateNewPlanAlgoButton from "../components/GenerateNewPlanAlgoButton";

const fitnessGoals = ['strength', 'cardio', 'flexibility'];
const fitnessLevels = ['beginner', 'intermediate', 'advanced'];
const modifications = [null, 'upper body only', 'lower body only'];

const CreateNewPlanScreen = () => {
    const [fitnessGoal, setFitnessGoal] = useState(fitnessGoals[0]);
    const [fitnessLevel, setFitnessLevel] = useState(fitnessLevels[0]);
    const [duration, setDuration] = useState(10);
    const [exercisesPerDay, setExercisesPerDay] = useState(4);
    const [modification, setModification] = useState(modifications[0]);

    const fitnessGoalPicker = (
        <Picker
            selectedValue={fitnessGoal}
            onValueChange={goal => setFitnessGoal(goal)}
            style={styles.picker}
            itemStyle={styles.iosItemStyle}
        >
            {
                fitnessGoals.map((goal, index) => (
                    <Picker.Item key={index} label={goal} value={goal}/>
                ))
            }
        </Picker>
    );

    const fitnessLevelPicker = (
        <Picker
            selectedValue={fitnessLevel}
            onValueChange={level => setFitnessLevel(level)}
            style={styles.picker}
            itemStyle={styles.iosItemStyle}
        >
            {
                fitnessLevels.map((level, index) => (
                    <Picker.Item key={index} label={level} value={level}/>
                ))
            }
        </Picker>
    );

    const modificationPicker = (
        <Picker
            selectedValue={modification}
            onValueChange={mod => setModification(mod)}
            style={styles.picker}
            itemStyle={styles.iosItemStyle}
        >
            {
                modifications.map((mod, index) => (
                    <Picker.Item key={index} label={mod == null ? 'none' : mod} value={mod}/>
                ))
            }
        </Picker>
    );
    
    const durationInput = (
        <NumericInput 
            value={duration}
            onChange={value => setDuration(value)}
            minValue={1}
            maxValue={999}
            totalWidth={300}
            totalHeight={50}
            style={{paddingBottom: 10}}
            step={1}
        />
    );

    const exercisesPerDayInput = (
        <NumericInput 
            value={exercisesPerDay}
            onChange={value => setExercisesPerDay(value)}
            minValue={1}
            maxValue={15}
            totalWidth={300}
            totalHeight={50}
            style={{paddingBottom: 10}}
            
        />
    );

    return (
        <View style={styles.container}>
            <Text style={styles.IntroText}>Customize your options to create a new workout plan</Text>
            <View style={styles.centeredInputContainer}>
                <View style={{flexDirection:"row"}}>
                    <Text style={styles.optionHeaderText}>Workout Plan Duration </Text>
                    <Text style={{paddingTop: 10}}>(in days)</Text>
                </View>
                
                {durationInput}
                <Text style={styles.optionHeaderText}>Exercises Per Day</Text>
                {exercisesPerDayInput}
            </View>
            <Text style={styles.optionHeaderText}>Fitness Goal</Text>
            {fitnessGoalPicker}
            <Text style={styles.optionHeaderText}>Fitness Level</Text>
            {fitnessLevelPicker}
            <Text style={styles.optionHeaderText}>Modifications</Text>
            {modificationPicker}
            <View style={styles.buttonContainer}>
                <GenerateNewPlanAlgoButton
                    goal={fitnessGoal}
                    level={fitnessLevel}
                    duration={duration}
                    exercisesPerDay={exercisesPerDay}
                    modification={modification}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    IntroText: {
        fontSize: 15,
        textAlign: "center",
        marginBottom: 5
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center'
    },
    optionHeaderText: {
        fontSize: 18, 
        fontWeight: "bold",
        paddingTop: 8, 
        paddingBottom: 10
    },
    picker: {
        backgroundColor: Platform.OS == "android" ? "white" : ""
    },
    iosItemStyle : {
        height: 110
    },
    centeredInputContainer: {
        alignItems: "center",
        justifyContent: "center"
    },
    durationInput: {
        backgroundColor: "white",
        width: 250,
        textAlign: "center",
        fontSize: 18,
        padding: 10,
        marginTop: 10
    }
});

export default CreateNewPlanScreen;
