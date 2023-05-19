import { StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';

const SettingsButton = () => {
    const navigation = useNavigation();

    const handleNaviagateToSettings = () => {
        navigation.navigate("Settings");
    };

    return (
        <Ionicons name="settings-outline" size={32} onPress={handleNaviagateToSettings} aria-label="Settings"/>
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
