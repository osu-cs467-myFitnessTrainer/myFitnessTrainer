import { StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SettingsButton = () => {
    const navigation = useNavigation();

    const handleNaviagateToSettings = () => {
        navigation.navigate("Settings");
    };

    return (
        <Button
            style={styles.button}
            title="Settings"
            onPress={handleNaviagateToSettings}
        ></Button>
    );
};

export default SettingsButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#4682B4",
        width: "30%",
        height: "30%",
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: "white",
    },
});
