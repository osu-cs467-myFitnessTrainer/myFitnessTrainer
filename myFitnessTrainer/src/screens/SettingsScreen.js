import { StyleSheet, View } from "react-native";
import CreateNewPlanButton from "../components/CreateNewPlanButton";

const SettingsScreen = () => {
    return <CreateNewPlanButton />;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default SettingsScreen;
