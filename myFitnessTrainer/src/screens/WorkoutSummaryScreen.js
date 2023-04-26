import { StyleSheet, View, Text } from "react-native";
import GoToDashboardButton from "../components/GoToDashboardButton";

const WorkoutSummaryScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Workout Summary</Text>
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
