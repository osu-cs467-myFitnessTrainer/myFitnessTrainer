import { StyleSheet, View, Text } from "react-native";
import GenerateNewPlanAlgoButton from "../components/GenerateNewPlanAlgoButton";

const CreateNewPlanScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Create New Plan Screen placeholder</Text>
            <GenerateNewPlanAlgoButton />
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

export default CreateNewPlanScreen;
