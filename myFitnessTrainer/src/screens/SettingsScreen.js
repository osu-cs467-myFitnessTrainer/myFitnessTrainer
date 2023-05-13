import { StyleSheet, View } from 'react-native';
import React from 'react';
import CreateNewPlanButton from "../components/CreateNewPlanButton";
import SignOutButton from '../components/SignOutButton';
import SelectAnAvatarButton from '../components/SelectAnAvatarButton';

const SettingsScreen = () => {
    return (
        <View style={styles.container}>
            <SelectAnAvatarButton />
            <CreateNewPlanButton />
            <SignOutButton />
        </View>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});