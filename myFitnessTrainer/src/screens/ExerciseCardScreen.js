import { StyleSheet, View } from "react-native";

import EndWorkoutButton from "../components/EndWorkoutButton";

const ExerciseCardScreen = () => {
    return (
        <View style={styles.container}>
            <EndWorkoutButton />
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

export default ExerciseCardScreen;
